<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => 'Méthode non autorisée.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function sanitize_text(string $value, int $maxLength = 1000): string
{
    $value = preg_replace('/\s+/u', ' ', trim($value)) ?? '';
    return mb_substr($value, 0, $maxLength);
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$rawBody = file_get_contents('php://input') ?: '';
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$payload = [];

if (str_contains($contentType, 'application/json')) {
    $payload = json_decode($rawBody, true) ?: [];
} else {
    $payload = $_POST ?: [];

    if (!$payload && $rawBody !== '') {
        parse_str($rawBody, $payload);
    }
}

$clean = [
    'name' => sanitize_text((string) ($payload['name'] ?? ''), 120),
    'company' => sanitize_text((string) ($payload['company'] ?? ''), 160),
    'email' => mb_strtolower(sanitize_text((string) ($payload['email'] ?? ''), 160)),
    'phone' => sanitize_text((string) ($payload['phone'] ?? ''), 40),
    'projectType' => sanitize_text((string) ($payload['projectType'] ?? ($payload['project_type'] ?? '')), 120),
    'budget' => sanitize_text((string) ($payload['budget'] ?? ''), 80),
    'timeline' => sanitize_text((string) ($payload['timeline'] ?? ''), 80),
    'preferredContact' => sanitize_text((string) ($payload['preferredContact'] ?? ($payload['preferred_contact'] ?? '')), 80),
    'message' => sanitize_text((string) ($payload['message'] ?? ''), 4000),
    'diagnosticResult' => sanitize_text((string) ($payload['diagnosticResult'] ?? ($payload['diagnostic_result'] ?? '')), 6000),
    'website' => sanitize_text((string) ($payload['website'] ?? ($payload['_honey'] ?? '')), 120),
    'formStartedAt' => (int) ($payload['formStartedAt'] ?? 0),
    'consent' => filter_var($payload['consent'] ?? false, FILTER_VALIDATE_BOOLEAN)
];

$errors = [];

if ($clean['name'] === '') {
    $errors['name'] = 'Merci de renseigner votre nom.';
}

if ($clean['email'] === '' || !filter_var($clean['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Merci de renseigner une adresse email valide.';
}

if ($clean['message'] === '' || mb_strlen($clean['message']) < 20) {
    $errors['message'] = 'Merci de préciser votre besoin en quelques phrases.';
}

if (!$clean['consent']) {
    $errors['consent'] = 'Merci de confirmer le consentement de contact.';
}

if ($clean['website'] !== '') {
    $errors['website'] = 'Le message a été bloqué.';
}

if ($clean['formStartedAt'] <= 0 || (time() * 1000) - $clean['formStartedAt'] < 3000) {
    $errors['form'] = 'L’envoi a été bloqué. Merci de réessayer dans quelques secondes.';
}

if ($errors !== []) {
    respond(422, [
        'ok' => false,
        'message' => 'Le formulaire contient des erreurs.',
        'errors' => $errors
    ]);
}

$storageRoot = __DIR__ . '/../storage';
$submissionDir = $storageRoot . '/contact-submissions';
$rateLimitDir = $storageRoot . '/rate-limits';

if (!is_dir($submissionDir) && !mkdir($submissionDir, 0775, true) && !is_dir($submissionDir)) {
    respond(500, [
        'ok' => false,
        'message' => 'Impossible de préparer le stockage des demandes.'
    ]);
}

if (!is_dir($rateLimitDir) && !mkdir($rateLimitDir, 0775, true) && !is_dir($rateLimitDir)) {
    respond(500, [
        'ok' => false,
        'message' => 'Impossible de préparer la protection anti-spam.'
    ]);
}

$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$ip = explode(',', $ip)[0];
$ip = preg_replace('/[^a-zA-Z0-9_.:-]/', '_', $ip) ?: 'unknown';
$rateLimitFile = $rateLimitDir . '/' . $ip . '.json';
$now = time();

if (is_file($rateLimitFile)) {
    $previous = json_decode((string) file_get_contents($rateLimitFile), true);

    if (isset($previous['ts']) && ($now - (int) $previous['ts']) < 60) {
        respond(429, [
            'ok' => false,
            'message' => 'Une demande vient déjà d’être envoyée. Merci de patienter une minute.'
        ]);
    }
}

file_put_contents($rateLimitFile, json_encode(['ts' => $now], JSON_UNESCAPED_UNICODE));

$submission = [
    'submittedAt' => gmdate('c'),
    'ip' => $ip,
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    'source' => 'php',
    'name' => $clean['name'],
    'company' => $clean['company'],
    'email' => $clean['email'],
    'phone' => $clean['phone'],
    'projectType' => $clean['projectType'],
    'budget' => $clean['budget'],
    'timeline' => $clean['timeline'],
    'preferredContact' => $clean['preferredContact'],
    'message' => $clean['message'],
    'diagnosticResult' => $clean['diagnosticResult'],
    'consent' => $clean['consent']
];

$fileName = str_replace([':', '.'], '-', gmdate('c')) . '-' . bin2hex(random_bytes(4)) . '.json';
$targetFile = $submissionDir . '/' . $fileName;

if (file_put_contents($targetFile, json_encode($submission, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) === false) {
    respond(500, [
        'ok' => false,
        'message' => 'Impossible d’enregistrer votre demande pour le moment.'
    ]);
}

respond(200, [
    'ok' => true,
    'message' => 'Votre message a bien été envoyé.'
]);
