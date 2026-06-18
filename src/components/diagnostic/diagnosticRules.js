import { services } from '../../data/services';

export const DIAGNOSTIC_STORAGE_KEY = 'logicweb-diagnostic-result';

export const serviceProjectTypes = {
  'creation-sites-web': 'Création de site web',
  'logiciels-sur-mesure': 'Logiciel / outil métier',
  'support-it-securite': 'Support IT & sécurité',
  formation: 'Formation'
};

export const diagnosticQuestions = [
  {
    id: 'problem',
    eyebrow: 'Signal 01',
    title: 'Quel est votre blocage principal aujourd’hui ?',
    description: 'Choisissez le problème le plus visible. Le diagnostic affinera ensuite la trajectoire.',
    options: [
      {
        id: 'outdatedWebsite',
        label: 'Mon site ne donne pas confiance',
        detail: 'Image datée, message flou, peu de demandes qualifiées.',
        scores: { 'creation-sites-web': 4 },
        signals: ['Image de marque à clarifier', 'Parcours de contact à renforcer'],
        chain: ['Site peu crédible', 'Confiance fragile', 'Demandes perdues']
      },
      {
        id: 'manualTasks',
        label: 'Je perds du temps avec Excel',
        detail: 'Fichiers dispersés, ressaisie, suivi trop manuel.',
        scores: { 'logiciels-sur-mesure': 4 },
        signals: ['Flux métier à structurer', 'Automatisations possibles'],
        chain: ['Données dispersées', 'Double saisie', 'Temps opérationnel perdu']
      },
      {
        id: 'itIssues',
        label: 'Mon informatique me ralentit',
        detail: 'Incidents, sauvegardes floues, réseau ou postes instables.',
        scores: { 'support-it-securite': 4 },
        signals: ['Fiabilité IT prioritaire', 'Risque opérationnel à réduire'],
        chain: ['Incidents récurrents', 'Stress technique', 'Continuité fragile']
      },
      {
        id: 'visibility',
        label: 'Je manque de visibilité locale',
        detail: 'Présence faible sur les recherches et les demandes locales.',
        scores: { 'creation-sites-web': 3, formation: 1 },
        signals: ['SEO local à consolider', 'Offre à rendre plus lisible'],
        chain: ['Offre peu trouvée', 'Trafic local faible', 'Opportunités invisibles']
      },
      {
        id: 'trainingNeed',
        label: 'Mon équipe a besoin d’être formée',
        detail: 'Outils sous-utilisés, autonomie numérique à développer.',
        scores: { formation: 4, 'support-it-securite': 1 },
        signals: ['Montée en autonomie utile', 'Pratiques internes à harmoniser'],
        chain: ['Usages irréguliers', 'Autonomie limitée', 'Support interne saturé']
      }
    ]
  },
  {
    id: 'business',
    eyebrow: 'Signal 02',
    title: 'Quel type de structure décrivez-vous le mieux ?',
    description: 'Le contexte influence le niveau de cadrage, d’autonomie et de maintenance à prévoir.',
    options: [
      {
        id: 'artisan',
        label: 'Artisan ou indépendant',
        detail: 'Besoin d’une présence claire et d’un contact simple.',
        scores: { 'creation-sites-web': 2 },
        signals: ['Parcours devis à simplifier']
      },
      {
        id: 'pme',
        label: 'TPE / PME',
        detail: 'Plusieurs sujets numériques à coordonner sans complexité inutile.',
        scores: { 'logiciels-sur-mesure': 1, 'support-it-securite': 1, 'creation-sites-web': 1 },
        signals: ['Priorisation progressive recommandée']
      },
      {
        id: 'commerce',
        label: 'Commerce de proximité',
        detail: 'Visibilité locale, confiance et demandes concrètes.',
        scores: { 'creation-sites-web': 2, 'logiciels-sur-mesure': 1 },
        signals: ['Visibilité locale et conversion à relier']
      },
      {
        id: 'association',
        label: 'Association',
        detail: 'Communication, organisation interne et outils accessibles.',
        scores: { 'creation-sites-web': 1, formation: 1 },
        signals: ['Clarté éditoriale et autonomie à équilibrer']
      },
      {
        id: 'services',
        label: 'Entreprise de services',
        detail: 'Crédibilité, suivi client, dossiers et prise de contact.',
        scores: { 'creation-sites-web': 1, 'logiciels-sur-mesure': 2 },
        signals: ['Relation client et suivi à structurer']
      },
      {
        id: 'office',
        label: 'Cabinet professionnel',
        detail: 'Image sérieuse, informations sensibles, fiabilité quotidienne.',
        scores: { 'support-it-securite': 2, 'creation-sites-web': 1 },
        signals: ['Confiance et sécurité à traiter ensemble']
      }
    ]
  },
  {
    id: 'urgency',
    eyebrow: 'Signal 03',
    title: 'Qu’est-ce qui doit avancer en premier ?',
    description: 'Cette priorité oriente le service principal et l’appui éventuel.',
    options: [
      {
        id: 'leads',
        label: 'Obtenir plus de demandes',
        detail: 'Mieux convertir les visiteurs et prospects locaux.',
        scores: { 'creation-sites-web': 4 },
        signals: ['Conversion et SEO local à prioriser']
      },
      {
        id: 'time',
        label: 'Gagner du temps',
        detail: 'Réduire la charge manuelle et les tâches répétitives.',
        scores: { 'logiciels-sur-mesure': 4, formation: 1 },
        signals: ['Automatisation ou outil métier probable']
      },
      {
        id: 'security',
        label: 'Sécuriser les systèmes',
        detail: 'Stabiliser les postes, sauvegardes, accès et réseau.',
        scores: { 'support-it-securite': 4 },
        signals: ['Audit IT rapide conseillé']
      },
      {
        id: 'image',
        label: 'Moderniser l’image',
        detail: 'Rendre l’entreprise plus premium et plus crédible.',
        scores: { 'creation-sites-web': 3 },
        signals: ['Refonte éditoriale et visuelle probable']
      },
      {
        id: 'simplify',
        label: 'Simplifier le travail interne',
        detail: 'Clarifier les flux, dossiers, validations et données.',
        scores: { 'logiciels-sur-mesure': 3, 'support-it-securite': 1 },
        signals: ['Workflow interne à cartographier']
      }
    ]
  },
  {
    id: 'maturity',
    eyebrow: 'Signal 04',
    title: 'Où en est votre setup numérique ?',
    description: 'Le point de départ détermine si l’on doit créer, reprendre, fiabiliser ou former.',
    options: [
      {
        id: 'noSite',
        label: 'Pas encore de vraie présence',
        detail: 'Peu ou pas de site, informations difficiles à trouver.',
        scores: { 'creation-sites-web': 3 },
        signals: ['Socle de présence à créer']
      },
      {
        id: 'oldSite',
        label: 'Site ancien ou peu clair',
        detail: 'Le site existe, mais ne reflète plus le niveau actuel.',
        scores: { 'creation-sites-web': 3 },
        signals: ['Refonte premium pertinente']
      },
      {
        id: 'excel',
        label: 'Excel et outils manuels',
        detail: 'Le fonctionnement repose sur fichiers, emails et copier-coller.',
        scores: { 'logiciels-sur-mesure': 3 },
        signals: ['Centralisation et automatisation à étudier']
      },
      {
        id: 'partial',
        label: 'Partiellement digitalisé',
        detail: 'Quelques outils existent mais ne communiquent pas bien.',
        scores: { 'logiciels-sur-mesure': 2, 'support-it-securite': 1 },
        signals: ['Architecture légère à remettre en ordre']
      },
      {
        id: 'messyAdvanced',
        label: 'Avancé mais trop complexe',
        detail: 'Beaucoup d’outils, peu de lisibilité, adoption irrégulière.',
        scores: { formation: 2, 'support-it-securite': 1, 'logiciels-sur-mesure': 1 },
        signals: ['Simplification et adoption à prioriser']
      }
    ]
  },
  {
    id: 'result',
    eyebrow: 'Signal 05',
    title: 'Quel résultat voulez-vous ressentir dans 3 mois ?',
    description: 'Le diagnostic se termine sur le résultat opérationnel attendu.',
    options: [
      {
        id: 'requests',
        label: 'Plus de demandes entrantes',
        detail: 'Un parcours plus clair pour déclencher le contact.',
        scores: { 'creation-sites-web': 4 },
        signals: ['Parcours de conversion à construire']
      },
      {
        id: 'workflow',
        label: 'Un workflow plus propre',
        detail: 'Moins de ressaisie, plus de visibilité sur l’activité.',
        scores: { 'logiciels-sur-mesure': 4 },
        signals: ['Outil métier simple recommandé']
      },
      {
        id: 'seo',
        label: 'Un meilleur SEO local',
        detail: 'Être plus lisible sur Le Havre, Sainte-Adresse et la Normandie.',
        scores: { 'creation-sites-web': 3 },
        signals: ['Structure SEO locale à prévoir']
      },
      {
        id: 'credibility',
        label: 'Une crédibilité plus forte',
        detail: 'Une présence qui inspire confiance dès la première visite.',
        scores: { 'creation-sites-web': 3, 'support-it-securite': 1 },
        signals: ['Image et confiance à renforcer']
      },
      {
        id: 'lessStress',
        label: 'Moins de stress technique',
        detail: 'Un environnement plus stable, plus clair et plus sécurisé.',
        scores: { 'support-it-securite': 4 },
        signals: ['Support IT et sécurité à cadrer']
      },
      {
        id: 'autonomy',
        label: 'Une équipe plus autonome',
        detail: 'Des usages mieux maîtrisés et moins de blocages quotidiens.',
        scores: { formation: 4 },
        signals: ['Formation ciblée recommandée']
      }
    ]
  }
];

export const roadmapByService = {
  'creation-sites-web': [
    ['Audit rapide', 'Clarifier l’offre, les contenus existants, les points de confiance et les freins de contact.'],
    ['Structure', 'Définir l’arborescence, les pages clés, les messages, le SEO local et les preuves à mettre en avant.'],
    ['Production', 'Concevoir et intégrer un site rapide, responsive, crédible et simple à faire évoluer.'],
    ['Lancement', 'Tester les parcours, finaliser les réglages, mettre en ligne et sécuriser la prise de contact.'],
    ['Évolution', 'Mesurer, enrichir les pages et ajuster les contenus selon les demandes reçues.']
  ],
  'logiciels-sur-mesure': [
    ['Audit rapide', 'Cartographier les fichiers, ressaisies, décisions et irritants qui coûtent du temps.'],
    ['Structure', 'Définir les écrans, données, rôles, automatisations et règles métier réellement utiles.'],
    ['Production', 'Construire un outil simple, testable et aligné sur le quotidien de l’équipe.'],
    ['Lancement', 'Migrer les données utiles, former les utilisateurs et sécuriser la prise en main.'],
    ['Évolution', 'Ajouter les automatismes et indicateurs après les premiers usages réels.']
  ],
  'support-it-securite': [
    ['Audit rapide', 'Identifier les postes, accès, sauvegardes, incidents récurrents et risques prioritaires.'],
    ['Structure', 'Prioriser les actions de fiabilisation selon l’urgence, l’impact et le budget.'],
    ['Production', 'Mettre en place les corrections, sauvegardes, accès et bonnes pratiques nécessaires.'],
    ['Lancement', 'Valider la continuité, documenter les gestes clés et organiser le support.'],
    ['Évolution', 'Suivre les incidents, maintenir les protections et anticiper les prochains besoins.']
  ],
  formation: [
    ['Audit rapide', 'Évaluer les usages, niveaux, blocages et situations concrètes à traiter.'],
    ['Structure', 'Construire un programme court, utile et relié aux documents ou outils de l’équipe.'],
    ['Production', 'Animer des sessions pratiques, progressives et adaptées au rythme des participants.'],
    ['Lancement', 'Mettre en application sur des cas réels et consolider les gestes essentiels.'],
    ['Évolution', 'Prévoir un suivi ou un module avancé selon l’autonomie gagnée.']
  ]
};

export const explanationByService = {
  'creation-sites-web':
    'Votre diagnostic pointe vers une présence plus claire, plus crédible et mieux structurée pour générer des demandes locales.',
  'logiciels-sur-mesure':
    'Votre diagnostic montre un enjeu de temps, de suivi ou de données : un outil métier simple peut remettre de l’ordre dans le quotidien.',
  'support-it-securite':
    'Votre diagnostic révèle un besoin de fiabilité technique, de sauvegarde ou de sécurité pour réduire le stress opérationnel.',
  formation:
    'Votre diagnostic indique surtout un besoin d’autonomie : une formation ciblée peut transformer les usages sans complexifier l’organisation.'
};

function findService(slug) {
  return services.find((service) => service.slug === slug) || services[0];
}

export function getAnswerForQuestion(question, answerId) {
  return question.options.find((option) => option.id === answerId);
}

export function getAnsweredOptions(answers) {
  return diagnosticQuestions
    .map((question) => ({
      question,
      option: getAnswerForQuestion(question, answers[question.id])
    }))
    .filter((item) => item.option);
}

export function computeDiagnostic(answers) {
  const scores = services.reduce((accumulator, service) => {
    accumulator[service.slug] = 0;
    return accumulator;
  }, {});
  const answeredOptions = getAnsweredOptions(answers);
  const signals = [];
  const chain = [];

  answeredOptions.forEach(({ option }) => {
    Object.entries(option.scores || {}).forEach(([slug, score]) => {
      scores[slug] = (scores[slug] || 0) + score;
    });

    signals.push(...(option.signals || []));

    if (chain.length === 0 && option.chain) {
      chain.push(...option.chain);
    }
  });

  const ranked = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([slug, score]) => ({ slug, score, service: findService(slug) }));

  const primary = ranked[0]?.service || services[0];
  const secondary = ranked.find((item) => item.slug !== primary.slug && item.score > 1)?.service || null;
  const uniqueSignals = [...new Set(signals)].slice(0, 5);
  const selectedAnswers = answeredOptions.map(({ question, option }) => ({
    question: question.title,
    answer: option.label
  }));

  return {
    primary,
    secondary,
    scores,
    signals: uniqueSignals.length ? uniqueSignals : ['Besoin à clarifier avec un cadrage court'],
    chain: chain.length
      ? [...chain, `Solution recommandée : ${primary.shortTitle}`]
      : ['Situation à clarifier', 'Priorités à hiérarchiser', `Solution recommandée : ${primary.shortTitle}`],
    explanation: explanationByService[primary.slug] || primary.excerpt,
    roadmap: roadmapByService[primary.slug] || roadmapByService['creation-sites-web'],
    selectedAnswers,
    contactProjectType: serviceProjectTypes[primary.slug] || primary.title
  };
}

export function buildDiagnosticSummary(diagnostic) {
  const secondaryLine = diagnostic.secondary ? `Appui possible : ${diagnostic.secondary.shortTitle}` : 'Appui possible : à définir au cadrage';
  const answerLines = diagnostic.selectedAnswers.map((item) => `- ${item.question} ${item.answer}`);

  return [
    'Diagnostic Digital Logic Web',
    `Service recommandé : ${diagnostic.primary.shortTitle}`,
    secondaryLine,
    `Résumé : ${diagnostic.explanation}`,
    '',
    'Signaux détectés :',
    ...diagnostic.signals.map((signal) => `- ${signal}`),
    '',
    'Réponses :',
    ...answerLines,
    '',
    'Trajectoire recommandée :',
    ...diagnostic.roadmap.map(([title], index) => `${index + 1}. ${title}`)
  ].join('\n');
}

export function persistDiagnostic(diagnostic, contactIntent = 'quote') {
  const payload = {
    primarySlug: diagnostic.primary.slug,
    primaryTitle: diagnostic.primary.shortTitle,
    secondaryTitle: diagnostic.secondary?.shortTitle || '',
    explanation: diagnostic.explanation,
    signals: diagnostic.signals,
    selectedAnswers: diagnostic.selectedAnswers,
    roadmap: diagnostic.roadmap.map(([title]) => title),
    contactProjectType: diagnostic.contactProjectType,
    summary: buildDiagnosticSummary(diagnostic),
    contactIntent
  };

  window.sessionStorage.setItem(DIAGNOSTIC_STORAGE_KEY, JSON.stringify(payload));
  return payload;
}
