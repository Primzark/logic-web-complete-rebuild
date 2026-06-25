import { services } from './services';
import { brandMedia } from './media';
import { localLandingPages } from './localLandingPages';

export const company = {
  name: 'Logic Web',
  legalName: 'LOGIC WEB',
  description:
    'Solutions digitales & IT pour les entreprises du Havre et de Normandie.',
  email: 'contact@logic-web.net',
  phone: '02 35 44 66 81',
  location: 'Le Havre & Normandie',
  areaServed: ['Le Havre', 'Sainte-Adresse', 'Seine-Maritime', 'Normandie'],
  address: {
    streetAddress: '16 rue Vacquerie',
    postalCode: '76310',
    addressLocality: 'Sainte-Adresse',
    addressRegion: 'Normandie',
    addressCountry: 'FR'
  },
  registry: {
    form: 'SASU',
    siren: '829 190 727',
    siret: '829 190 727 00014',
    rcs: 'Le Havre B 829 190 727',
    vat: 'FR15 829190727',
    capital: '1 000 EUR',
    director: 'Alexis Liva',
    founded: '2017'
  }
};

export const primaryNavigation = [
  { label: 'Accueil', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Références', path: '/references' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Demander un devis', path: '/contact', cta: true }
];

export const trustItems = [
  'Entreprise locale au Havre',
  'Sites web & outils sur mesure',
  'Support IT & sécurité',
  'Formation professionnelle',
  'Interlocuteur unique',
  'Centre de formation agréé',
  'Réseau, maintenance & sauvegarde'
];

export const heroStats = [
  { value: 4, suffix: '', label: 'Expertises clés' },
  { value: 1, suffix: '', label: 'Interlocuteur unique' },
  { value: 2017, suffix: '', label: 'Structure immatriculée', type: 'year' }
];

export const homeProblems = [
  {
    number: '01',
    title: 'Votre site ne reflète plus votre niveau d’exigence',
    text:
      'Une image datée, un discours flou ou un parcours de contact mal construit peuvent faire perdre de la crédibilité avant même le premier échange.'
  },
  {
    number: '02',
    title: 'Vos outils internes deviennent un frein',
    text:
      'Tableaux dispersés, double saisie, informations difficiles à retrouver : la charge opérationnelle augmente sans vraie valeur ajoutée.'
  },
  {
    number: '03',
    title: 'Votre environnement IT manque de fiabilité',
    text:
      'Incidents récurrents, sauvegardes peu claires, réseau instable ou parc hétérogène : le quotidien devient plus fragile et plus coûteux.'
  },
  {
    number: '04',
    title: 'Vos équipes ont besoin de plus d’autonomie numérique',
    text:
      'Les outils sont là, mais ils sont sous-utilisés. Une formation ciblée permet d’améliorer les usages sans alourdir les processus.'
  }
];

export const processSteps = [
  {
    title: 'Écoute & cadrage',
    text: 'Comprendre votre activité, vos contraintes, vos priorités et le niveau réel d’urgence.'
  },
  {
    title: 'Recommandation',
    text: 'Structurer une solution adaptée, avec une trajectoire claire, un périmètre lisible et les bons arbitrages.'
  },
  {
    title: 'Production',
    text: 'Concevoir, intégrer et faire avancer le projet avec des points réguliers et des décisions documentées.'
  },
  {
    title: 'Suivi & évolution',
    text: 'Faire vivre le site, l’outil ou l’environnement IT dans la durée, sans rupture après la livraison.'
  }
];

export const referenceCases = [
  {
    title: 'Menuiserie artisanale au Havre',
    tag: 'Site web',
    summary:
      'Refonte d’un site vitrine avec portfolio, parcours devis plus clair et contenu pensé pour le SEO local.',
    services: ['Site vitrine', 'SEO local', 'Responsive'],
    image: brandMedia.referenceCases.siteWeb
  },
  {
    title: 'PME logistique en Seine-Maritime',
    tag: 'Outil métier',
    summary:
      'Interface interne pour suivre les opérations et centraliser des données auparavant gérées dans plusieurs fichiers.',
    services: ['Application web', 'Automatisation', 'Tableau de bord'],
    image: brandMedia.referenceCases.outilMetier
  },
  {
    title: 'Cabinet de conseil régional',
    tag: 'IT & sécurité',
    summary:
      'Audit d’infrastructure, reprise des sauvegardes et fiabilisation des accès pour un environnement plus stable.',
    services: ['Réseau', 'Sauvegarde', 'Sécurité'],
    image: brandMedia.referenceCases.itSecurite
  },
  {
    title: 'Commerce de proximité',
    tag: 'Présence digitale',
    summary:
      'Reconstruction d’une présence web plus premium avec pages service, demandes de contact et contenu administrable.',
    services: ['Refonte', 'Contenu', 'UX'],
    image: brandMedia.referenceCases.presenceDigitale
  },
  {
    title: 'Équipe administrative multi-sites',
    tag: 'Formation',
    summary:
      'Sessions ciblées autour d’Excel, des usages numériques et de l’organisation de l’information pour gagner en autonomie.',
    services: ['Formation', 'Excel', 'Organisation'],
    image: brandMedia.referenceCases.formation
  },
  {
    title: 'Activité de service B2B',
    tag: 'Logiciel',
    summary:
      'Structuration d’un outil sur mesure pour suivre les dossiers, la relation client et la production interne.',
    services: ['Workflow', 'CRM interne', 'Formation'],
    image: brandMedia.referenceCases.logiciel
  }
];

export const whyChooseUs = [
  {
    title: 'Ancrage local',
    text:
      'Le Havre et son tissu de petites structures exigent de la proximité, de la clarté et des réponses qui restent proportionnées.'
  },
  {
    title: 'Lecture transversale',
    text:
      'Web, logiciel, support IT et formation sont traités comme un ensemble cohérent, pas comme des silos qui s’ignorent.'
  },
  {
    title: 'Pragmatisme',
    text:
      'Les recommandations privilégient l’utilité et la maintenabilité. Pas de stack lourde ou d’effet de mode sans raison.'
  },
  {
    title: 'Relation durable',
    text:
      'Le projet est pensé pour durer, avec un interlocuteur unique capable de faire évoluer l’existant plutôt que de tout refaire.'
  }
];

export const proofPoints = [
  {
    label: 'Réponse attendue',
    value: '24 h ouvrées',
    text: 'Un premier retour clair pour confirmer le besoin, les priorités et la suite la plus utile.'
  },
  {
    label: 'Approche',
    value: 'Audit avant devis',
    text: 'Chaque demande commence par un cadrage court pour éviter les solutions trop lourdes ou mal orientées.'
  },
  {
    label: 'Exploitation',
    value: 'Suivi durable',
    text: 'Le site, l’outil ou l’environnement IT sont pensés pour être maintenus, pas seulement livrés.'
  }
];

export const legacyScope = [
  {
    title: 'Site Internet',
    text:
      'Création, refonte, site vitrine, e-commerce, intranet, site institutionnel, événementiel, immobilier, newsletter et emailing.'
  },
  {
    title: 'Logiciel sur mesure',
    text:
      'Applications métier, bases de données, hébergement des composants, maintenance et formation au logiciel.'
  },
  {
    title: 'Formation',
    text:
      'Centre de formation agréé, sessions individuelles ou groupées, bureautique, Internet, Excel, Access, VBA et VB.NET.'
  },
  {
    title: 'Réseau',
    text:
      'Réseau local, réseau étendu, Wi-Fi, VPN, messagerie, routeurs et maintenance réseau pour petites structures.'
  },
  {
    title: 'Maintenance',
    text:
      'Dépannage matériel et logiciel, assistance téléphonique, télémaintenance, interventions sur site et suivi préventif.'
  },
  {
    title: 'Protection',
    text:
      'Sauvegarde, restauration, cryptage des données, antivirus, anti-spywares et logique de continuité d’activité.'
  }
];

export const aboutValues = [
  {
    title: 'Écoute avant tout',
    text:
      'Chaque mission part de votre activité réelle. Les besoins sont reformulés clairement avant de proposer une solution.'
  },
  {
    title: 'Solutions proportionnées',
    text:
      'Une petite structure n’a pas besoin d’une complexité de grand groupe. La bonne architecture est celle qui tient dans le temps.'
  },
  {
    title: 'Clarté de la relation',
    text:
      'Un périmètre compréhensible, des arbitrages explicites et des points de passage clairs pendant toute la production.'
  },
  {
    title: 'Accompagnement complet',
    text:
      'Le site, l’outil, le support et la formation peuvent être traités dans un continuum pour éviter les ruptures.'
  }
];

export const aboutLegacySections = [
  {
    title: 'Périmètre historique',
    paragraphs: [
      'Le site historique de Logic Web présentait déjà un périmètre large : création de sites Internet, logiciels sur mesure, réseaux, maintenance, protection des données et formation.',
      'La version actuelle conserve cette réalité de terrain, avec une lecture plus claire : le réseau, la maintenance et la protection sont désormais regroupés dans une offre de support IT plus simple à comprendre.'
    ]
  },
  {
    title: 'Accessibilité & standards',
    paragraphs: [
      'L’ancien site mettait déjà en avant une attention réelle à l’accessibilité et au respect des standards du web. Cet engagement reste pertinent aujourd’hui : lisibilité, structure claire et socle technique propre.',
      'L’objectif reste le même : rendre l’information facile à consulter, à indexer et à faire évoluer, sans complexité gratuite.'
    ]
  }
];

export const contactDetails = [
  {
    title: 'Email',
    body: 'contact@logic-web.net',
    href: 'mailto:contact@logic-web.net'
  },
  {
    title: 'Téléphone',
    body: '02 35 44 66 81',
    href: 'tel:+33235446681'
  },
  {
    title: 'Zone d’intervention',
    body: 'Le Havre, Sainte-Adresse, Seine-Maritime et Normandie'
  },
  {
    title: 'Premier échange',
    body: 'Sur site ou à distance selon le projet, avec retour sous 24 h ouvrées'
  }
];

export const contactProjectOptions = [
  'Création de site web',
  'Logiciel / outil métier',
  'Support IT & sécurité',
  'Formation',
  'Autre / cadrage initial'
];

export const footerServices = services.map((service) => ({
  label: service.shortTitle,
  path: service.path
}));

export const footerLocalLinks = localLandingPages.map((page) => ({
  label: page.label,
  path: page.path
}));

export const footerLinks = [
  { label: 'Mentions légales', path: '/mentions-legales' },
  { label: 'Politique de confidentialité', path: '/politique-confidentialite' }
];
