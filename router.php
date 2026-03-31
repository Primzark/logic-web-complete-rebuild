<?php

declare(strict_types=1);

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$requestPath = parse_url($requestUri, PHP_URL_PATH) ?: '/';
$rootDir = __DIR__;
$distDir = $rootDir . '/dist';
$apiFile = $rootDir . $requestPath;

if (str_starts_with($requestPath, '/api/') && is_file($apiFile)) {
    return false;
}

$distFile = realpath($distDir . $requestPath);
$distRoot = realpath($distDir);

if (
    $distRoot !== false &&
    $distFile !== false &&
    str_starts_with($distFile, $distRoot) &&
    is_file($distFile)
) {
    $mimeType = mime_content_type($distFile) ?: 'application/octet-stream';
    header('Content-Type: ' . $mimeType);
    readfile($distFile);
    return true;
}

$indexFile = $distDir . '/index.html';

if (!is_file($indexFile)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Le build Vite est introuvable. Lancez d'abord : npm run build\n";
    return true;
}

header('Content-Type: text/html; charset=utf-8');
readfile($indexFile);
return true;
