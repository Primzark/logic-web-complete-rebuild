import { brandMedia } from './media';

export const services = [
  {
    slug: 'creation-sites-web',
    path: '/creation-sites-web',
    icon: '🌐',
    title: 'Création de sites web',
    shortTitle: 'Création de sites web',
    intentLabel: 'J’ai besoin d’un site',
    fitSummary: 'Idéal pour clarifier votre offre, rassurer vos prospects et générer des demandes locales.',
    excerpt:
      'Sites vitrines, catalogues et e-commerce conçus pour clarifier votre offre, rassurer vos prospects et soutenir votre référencement local.',
    heroTitle: 'Un site web qui travaille vraiment pour votre entreprise',
    heroDescription:
      'Logic Web conçoit des sites sobres, rapides et administrables pour les artisans, TPE, professions libérales et PME du Havre et de Normandie.',
    heroImage: brandMedia.pageHeroes.web,
    overview: {
      title: 'Pour qui ?',
      paragraphs: [
        'Pour les entreprises qui veulent une présence en ligne claire, crédible et facile à faire évoluer, sans se retrouver enfermées dans un outil rigide.',
        'Nous intervenons aussi bien sur une création complète que sur une refonte, une remise à plat du contenu ou un cadrage plus propre de votre parcours de contact.'
      ]
    },
    featuresTitle: 'Ce que nous livrons',
    features: [
      {
        title: 'Site vitrine premium',
        description:
          'Un site sobre, responsive et structuré autour de vos messages clés, avec une hiérarchie claire et une image plus haut de gamme.'
      },
      {
        title: 'Site catalogue',
        description:
          'Des pages de services, produits ou réalisations faciles à parcourir, avec un contenu organisé pour la prise de contact.'
      },
      {
        title: 'E-commerce ou click and collect',
        description:
          'Une base simple à faire évoluer si votre activité a besoin de vendre, réserver ou encaisser en ligne.'
      },
      {
        title: 'Back-office administrable',
        description:
          'Une structure prévue pour faire vivre le site, publier de nouvelles pages ou mettre à jour vos contenus sans friction.'
      },
      {
        title: 'SEO local',
        description:
          'Des contenus, balises et parcours internes pensés pour le Havre, la Seine-Maritime et les recherches de proximité.'
      },
      {
        title: 'Maintenance et évolutions',
        description:
          'Le site ne s’arrête pas à la mise en ligne. Logic Web peut rester présent pour les ajustements, mises à jour et évolutions.'
      }
    ],
    highlight: {
      title: 'Ce que vous gagnez',
      paragraphs: [
        'Un site plus clair pour vos visiteurs, plus simple à maintenir pour votre équipe, et mieux structuré pour vos prochaines actions commerciales.',
        'Le projet reste dimensionné à votre besoin réel : pas de surcouche technique inutile, pas d’expérience gadget qui alourdit l’ensemble.'
      ]
    },
    legacyCoverageTitle: 'Périmètre détaillé issu de l’offre historique',
    legacyCoverageIntro:
      'Le site historique détaillait un accompagnement très complet autour de la création et de la refonte de sites Internet. Les points ci-dessous ont été conservés pour restituer tout le périmètre de Logic Web.',
    legacyCoverageGroups: [
      {
        title: 'Gestion de projet',
        items: [
          'Cahier des charges et analyse des besoins',
          'Plan du site et arborescence',
          'Étude du positionnement et analyse de la concurrence',
          'Aide à la rédaction des contenus'
        ]
      },
      {
        title: 'Identité visuelle',
        items: [
          'Étude de la charte graphique existante',
          'Création de la charte graphique',
          'Proposition et création de logo',
          'Déclinaisons de maquette pour valider la bonne direction'
        ]
      },
      {
        title: 'Types de sites',
        items: [
          'Site vitrine, e-commerce, intranet et site institutionnel',
          'Site événementiel ou immobilier selon le contexte',
          'Site statique ou dynamique selon le niveau d’autonomie souhaité'
        ]
      },
      {
        title: 'Hébergement & exploitation',
        items: [
          'Achat du nom de domaine',
          'Création d’adresses mail professionnelles',
          'Sauvegarde des données',
          'Serveur professionnel à bande passante garantie'
        ]
      },
      {
        title: 'Référencement & diffusion',
        items: [
          'Recherche de mots-clés pertinents',
          'Positionnement, veille concurrentielle et outils de mesure d’audience',
          'Netlinking, réseaux sociaux, buzz marketing et liens commerciaux',
          'Newsletter et emailing'
        ]
      }
    ],
    faq: [
      {
        question: 'Combien de temps faut-il pour mettre un site en ligne ?',
        answer:
          'La plupart des projets se cadrent entre 3 et 8 semaines selon le nombre de pages, le besoin en contenu et les validations internes.'
      },
      {
        question: 'Pouvez-vous reprendre un site existant ?',
        answer:
          'Oui. Une refonte peut conserver le contenu utile, repartir sur une structure plus saine et remettre à niveau le design, la navigation et le SEO.'
      },
      {
        question: 'Le site sera-t-il facile à faire évoluer ?',
        answer:
          'Oui. La structure du site est pensée pour faire évoluer les pages, les contenus et les sections sans repartir de zéro à chaque modification.'
      },
      {
        question: 'La maintenance est-elle incluse ?',
        answer:
          'La maintenance peut être prévue dès le départ selon le niveau d’accompagnement souhaité : mises à jour, petites corrections, nouveaux blocs et suivi.'
      }
    ],
    cta: 'Discutons de votre site'
  },
  {
    slug: 'logiciels-sur-mesure',
    path: '/logiciels-sur-mesure',
    icon: '⚙️',
    title: 'Logiciels sur mesure',
    shortTitle: 'Logiciels & outils métier',
    intentLabel: 'J’ai un outil interne',
    fitSummary: 'Adapté quand les fichiers dispersés, la ressaisie ou les suivis manuels freinent l’équipe.',
    excerpt:
      'Applications web, interfaces internes et automatisations conçues pour remplacer les fichiers dispersés et fluidifier vos opérations.',
    heroTitle: 'Des outils conçus pour votre manière de travailler',
    heroDescription:
      'Quand Excel, les copier-coller et les outils standard deviennent un frein, Logic Web construit une solution plus simple, plus fiable et plus lisible.',
    heroImage: brandMedia.pageHeroes.software,
    overview: {
      title: 'Les problèmes que nous traitons',
      paragraphs: [
        'Tableaux devenus ingouvernables, double saisie, manque de visibilité sur l’activité, suivi de dossiers dispersé ou besoin de centraliser l’information.',
        'Le bon outil n’est pas nécessairement le plus complexe. L’objectif est de concevoir une base vraiment utile à l’équipe et compatible avec votre rythme.'
      ]
    },
    featuresTitle: 'Ce que nous pouvons mettre en place',
    features: [
      {
        title: 'Interfaces de saisie',
        description:
          'Des écrans simples pour enregistrer des dossiers, des commandes, des interventions ou tout autre flux métier.'
      },
      {
        title: 'Tableaux de bord',
        description:
          'Une vue claire sur l’avancement, les volumes, les retards, les indicateurs ou les opérations en cours.'
      },
      {
        title: 'Automatisations',
        description:
          'Génération de documents, consolidation de données, notifications ou réduction des tâches répétitives.'
      },
      {
        title: 'Outils collaboratifs internes',
        description:
          'Une base partagée par plusieurs personnes pour travailler sur une même information sans fichiers concurrents.'
      },
      {
        title: 'Portails web métier',
        description:
          'Une application accessible via navigateur pour vos équipes, vos partenaires ou vos clients selon le besoin.'
      },
      {
        title: 'Maintenance logicielle',
        description:
          'Corrections, évolutions, adaptations à vos nouvelles contraintes et accompagnement dans la durée.'
      }
    ],
    highlight: {
      title: 'Approche projet',
      paragraphs: [
        'Le cadrage est essentiel : comprendre les flux, les blocages et les points de décision avant d’écrire une seule ligne de code.',
        'La solution est ensuite dimensionnée pour vous faire gagner du temps, pas pour vous imposer un nouvel outil lourd à adopter.'
      ]
    },
    legacyCoverageTitle: 'Capacités historiques en logiciel sur mesure',
    legacyCoverageIntro:
      'L’offre historique de Logic Web présentait déjà un positionnement très complet : analyse, développement, hébergement des composants, maintenance et formation. Elle mentionnait aussi un historique de plus de 50 applications réalisées.',
    legacyCoverageGroups: [
      {
        title: 'Analyse & cadrage',
        items: [
          'Analyse des besoins et audit-conseil',
          'Solutions adaptées à l’environnement réseau ou monoposte',
          'Modélisation et cadrage projet',
          'Étude des technologies matérielles et logicielles les mieux appropriées'
        ]
      },
      {
        title: 'Types d’applications',
        items: [
          'Gestion : planning, facturation, réservations, statistiques, immobilier, stocks',
          'Communication : emailing et prospection',
          'Échanges d’informations entre plusieurs systèmes',
          'Applications mobiles selon le contexte'
        ]
      },
      {
        title: 'Architecture & hébergement',
        items: [
          'Bases de données avec sauvegardes externes',
          'Couche logique et couche interface utilisateur',
          'Hébergement des composants logiciels sur serveurs professionnels',
          'Compatibilité avec l’existant et trajectoire évolutive'
        ]
      },
      {
        title: 'Maintenance & transfert',
        items: [
          'Mises à jour mineures et majeures',
          'Assistance technique par téléphone ou mail',
          'Formation au logiciel',
          'Supports techniques PDF, HTML ou papier'
        ]
      }
    ],
    faq: [
      {
        question: 'Faut-il repartir de zéro ?',
        answer:
          'Pas nécessairement. Le cadrage sert justement à identifier ce qui peut être conservé, restructuré ou automatisé progressivement.'
      },
      {
        question: 'Peut-on connecter l’outil à l’existant ?',
        answer:
          'Selon vos outils actuels, oui. L’objectif est de limiter la ressaisie et de ne pas casser ce qui fonctionne déjà.'
      },
      {
        question: 'Est-ce réservé aux grandes structures ?',
        answer:
          'Non. Le besoin est souvent encore plus fort pour les TPE et PME qui veulent gagner du temps sans embaucher un service informatique entier.'
      }
    ],
    cta: 'Parlons de votre outil métier'
  },
  {
    slug: 'support-it-securite',
    path: '/support-it-securite',
    icon: '🔒',
    title: 'Support IT & sécurité',
    shortTitle: 'Support IT & sécurité',
    intentLabel: 'J’ai un problème IT',
    fitSummary: 'Utile pour fiabiliser les postes, le réseau, les sauvegardes et les accès sensibles.',
    excerpt:
      'Maintenance, réseau, sauvegarde et sécurisation pour rendre votre environnement numérique plus fiable au quotidien.',
    heroTitle: 'Une infrastructure plus fiable pour travailler sereinement',
    heroDescription:
      'Logic Web intervient sur le support, la maintenance, les réseaux et la protection des données pour les petites structures qui ont besoin d’un partenaire accessible.',
    heroImage: brandMedia.pageHeroes.it,
    overview: {
      title: 'Périmètre d’intervention',
      paragraphs: [
        'Support utilisateur, maintenance de postes, organisation des sauvegardes, renforcement des accès, audit du parc et conseil sur l’infrastructure.',
        'L’offre couvre les réseaux, la maintenance et la protection des données dans une lecture simple, lisible et adaptée aux petites structures.'
      ]
    },
    featuresTitle: 'Les sujets pris en charge',
    features: [
      {
        title: 'Support & maintenance',
        description:
          'Dépannage, assistance, suivi des incidents et accompagnement pour éviter que les petits blocages ne deviennent des arrêts d’activité.'
      },
      {
        title: 'Réseau & connectivité',
        description:
          'Configuration, fiabilisation et diagnostic des réseaux locaux, Wi-Fi, accès distants et besoins de partage.'
      },
      {
        title: 'Sauvegarde & restauration',
        description:
          'Mise en place d’une logique de sauvegarde plus robuste pour réduire le risque de perte de données.'
      },
      {
        title: 'Protection des données',
        description:
          'Bonnes pratiques, durcissement simple, gestion des accès et sensibilisation aux risques du quotidien.'
      },
      {
        title: 'Audit & conseil',
        description:
          'État des lieux pragmatique de votre environnement pour prioriser les points vraiment critiques.'
      },
      {
        title: 'Suivi dans le temps',
        description:
          'Une relation de proximité avec un interlocuteur unique, plutôt qu’une simple intervention ponctuelle.'
      }
    ],
    highlight: {
      title: 'Logique d’accompagnement',
      paragraphs: [
        'L’objectif est de fiabiliser l’existant par étapes, avec des actions compréhensibles et priorisées selon le niveau de risque.',
        'Le bon support IT n’est pas seulement réactif : il doit aussi réduire la récurrence des incidents et clarifier les décisions à prendre.'
      ]
    },
    legacyCoverageTitle: 'Réseau, maintenance et protection : le détail du périmètre',
    legacyCoverageIntro:
      'Le site historique détaillait séparément le réseau, la maintenance et la protection des données, avec des petits réseaux pouvant aller jusqu’à 15 ordinateurs en architecture client-serveur. Cette version les regroupe dans une offre de support IT unique, tout en conservant le détail des compétences mentionnées à l’origine.',
    legacyCoverageGroups: [
      {
        title: 'Réseau local',
        items: [
          'Réseau câblé, Wi-Fi ou Bluetooth',
          'Routeurs, modems et partage d’accès',
          'Stratégie de sécurité, firewall et chiffrement',
          'Imprimantes réseau, partage de fichiers et postes clients'
        ]
      },
      {
        title: 'Réseau étendu',
        items: [
          'Accès Internet partagé et sécurisé',
          'Accès distant et télétravail',
          'VPN entre sites et utilisateurs nomades',
          'Serveur de messagerie'
        ]
      },
      {
        title: 'Dépannage & assistance',
        items: [
          'Interventions sur matériel et logiciels',
          'Configuration Windows, Office, messagerie et accès Internet',
          'Récupération de données effacées ou de bases corrompues',
          'Éradication de virus et spywares'
        ]
      },
      {
        title: 'Protection & sauvegarde',
        items: [
          'Sauvegarde interne, NAS, mirroring et restauration',
          'Sauvegarde distante via Internet, avec la solution historique BakNet',
          'Cryptage AES et protection des données sensibles',
          'Antivirus et anti-spywares professionnels'
        ]
      }
    ],
    faq: [
      {
        question: 'Intervenez-vous uniquement au Havre ?',
        answer:
          'La proximité reste un point fort au Havre et dans l’agglomération, mais une partie du support et du conseil peut aussi se faire à distance.'
      },
      {
        question: 'Pouvez-vous reprendre une infrastructure déjà en place ?',
        answer:
          'Oui. Le plus courant est justement de repartir d’un environnement existant, d’en faire l’état des lieux puis de corriger les points sensibles.'
      },
      {
        question: 'Travaillez-vous aussi sur la sauvegarde et la sécurité ?',
        answer:
          'Oui. Ces sujets font partie du périmètre historique de Logic Web et restent centraux dans la nouvelle présentation de l’offre.'
      }
    ],
    cta: 'Demander un diagnostic'
  },
  {
    slug: 'formation',
    path: '/formation',
    icon: '📚',
    title: 'Formation professionnelle',
    shortTitle: 'Formation',
    intentLabel: 'Je veux former mon équipe',
    fitSummary: 'Pensé pour rendre les équipes plus autonomes sur leurs outils et leurs usages numériques.',
    excerpt:
      'Formations bureautiques, numériques et métier adaptées au niveau des équipes et aux situations concrètes du quotidien.',
    heroTitle: 'Des formations pratiques, utiles dès la première session',
    heroDescription:
      'Logic Web accompagne les équipes sur les outils bureautiques, les usages numériques et la prise en main d’outils plus spécifiques.',
    heroImage: brandMedia.pageHeroes.training,
    overview: {
      title: 'À qui s’adressent les formations ?',
      paragraphs: [
        'Aux indépendants, collaborateurs, petites équipes et structures qui veulent monter en autonomie sans suivre des contenus trop génériques.',
        'Excel, Access, VBA et les usages bureautiques avancés restent au cœur de l’offre, avec une approche plus actuelle des besoins numériques des équipes.'
      ]
    },
    featuresTitle: 'Formats et thèmes',
    features: [
      {
        title: 'Bureautique',
        description:
          'Word, Excel, PowerPoint et prise en main progressive selon votre niveau de départ et vos usages réels.'
      },
      {
        title: 'Access, VBA, automatisation',
        description:
          'Pour les structures qui ont besoin d’aller plus loin sur la logique de base de données ou d’automatisation.'
      },
      {
        title: 'Usages numériques',
        description:
          'Messagerie, partage de fichiers, organisation de l’information, collaboration et bonnes pratiques au quotidien.'
      },
      {
        title: 'Prise en main d’outils métier',
        description:
          'Formation sur l’outil livré ou sur votre environnement numérique pour faciliter l’adoption.'
      },
      {
        title: 'Sessions sur site ou à distance',
        description:
          'Organisation souple selon vos contraintes, votre planning et le nombre de participants.'
      },
      {
        title: 'Programme adapté',
        description:
          'Pas de support standard plaqué sur votre contexte : le niveau et le contenu sont ajustés à votre besoin.'
      }
    ],
    highlight: {
      title: 'Ce qui change',
      paragraphs: [
        'L’objectif est de faire gagner en autonomie rapidement, avec des exercices proches de vos cas concrets et une pédagogie accessible.',
        'La formation est pensée comme un prolongement du projet ou du support, pas comme une couche séparée de votre réalité terrain.'
      ]
    },
    legacyCoverageTitle: 'Ancrage historique de l’offre formation',
    legacyCoverageIntro:
      'L’ancien site présentait Logic Web comme centre de formation agréé, avec des formations individuelles ou groupées construites à partir d’exercices pratiques et pédagogiques.',
    legacyCoverageGroups: [
      {
        title: 'Formats',
        items: [
          'Formations individuelles ou groupées',
          'Évaluation préalable du niveau',
          'Programme pédagogique et technique ajusté au besoin',
          'Sessions sur site selon le contexte'
        ]
      },
      {
        title: 'Thèmes historiques',
        items: [
          'Utilisation d’Internet et bureautique',
          'Environnement Windows',
          'Microsoft Access et VBA',
          'Microsoft Excel et VBA',
          'VB.NET'
        ]
      },
      {
        title: 'Pédagogie & niveaux',
        items: [
          'Niveau débutant',
          'Niveau chevronné ou confirmé',
          'Exercices pratiques',
          'Stages adaptés au projet professionnel'
        ]
      }
    ],
    faq: [
      {
        question: 'Proposez-vous des formations individuelles ?',
        answer:
          'Oui. Les formats peuvent être individuels ou collectifs, en fonction du niveau et de la disponibilité des participants.'
      },
      {
        question: 'Pouvez-vous adapter le contenu à notre activité ?',
        answer:
          'Oui. Les programmes sont ajustés à vos outils, vos documents et vos priorités opérationnelles.'
      },
      {
        question: 'La formation peut-elle accompagner un nouveau site ou logiciel ?',
        answer:
          'Oui. C’est même l’un des cas les plus utiles : la formation facilite l’adoption et rend l’équipe plus autonome dès le démarrage.'
      }
    ],
    cta: 'Construire un programme'
  }
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export const servicePaths = services.map((service) => service.path);
