import { services } from './services';
import { brandMedia } from './media';

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
  { label: 'References', path: '/references' },
  { label: 'A propos', path: '/a-propos' },
  { label: 'Demander un devis', path: '/contact', cta: true }
];

export const trustItems = [
  'Entreprise locale au Havre',
  'Sites web & outils sur mesure',
  'Support IT & securite',
  'Formation professionnelle',
  'Interlocuteur unique',
  'Centre de formation agree',
  'Reseau, maintenance & sauvegarde'
];

export const heroStats = [
  { value: 4, suffix: '', label: 'Expertises cles' },
  { value: 1, suffix: '', label: 'Interlocuteur unique' },
  { value: 2017, suffix: '', label: 'Structure immatriculee' }
];

export const homeProblems = [
  {
    number: '01',
    title: 'Votre site ne reflète plus votre niveau d’exigence',
    text:
      'Une image datée, un discours flou ou un parcours de contact mal construit font perdre de la credibilite avant meme le premier echange.'
  },
  {
    number: '02',
    title: 'Vos outils internes deviennent un frein',
    text:
      'Tableaux disperses, double saisie, informations difficiles a retrouver : la charge operationnelle augmente sans vraie valeur ajoutee.'
  },
  {
    number: '03',
    title: 'Votre environnement IT manque de fiabilite',
    text:
      'Incidents recurrents, sauvegardes peu claires, reseau instable ou parc heterogene : le quotidien devient plus fragile et plus couteux.'
  },
  {
    number: '04',
    title: 'Vos equipes ont besoin de plus d’autonomie numerique',
    text:
      'Les outils sont la, mais ils sont sous-utilises. Une formation ciblee permet d’ameliorer les usages sans alourdir les processus.'
  }
];

export const processSteps = [
  {
    title: 'Ecoute & cadrage',
    text: 'Comprendre votre activite, vos contraintes, vos priorites et le niveau reel d’urgence.'
  },
  {
    title: 'Recommandation',
    text: 'Structurer une solution adaptée, avec une trajectoire claire, un perimetre lisible et les bons arbitrages.'
  },
  {
    title: 'Production',
    text: 'Concevoir, integrer et faire avancer le projet avec des points reguliers et des decisions documentees.'
  },
  {
    title: 'Suivi & evolution',
    text: 'Faire vivre le site, l’outil ou l’environnement IT dans la duree, sans rupture apres la livraison.'
  }
];

export const referenceCases = [
  {
    title: 'Menuiserie artisanale au Havre',
    tag: 'Site web',
    summary:
      'Refonte d’un site vitrine avec portfolio, parcours devis plus clair et contenu pense pour le SEO local.',
    services: ['Site vitrine', 'SEO local', 'Responsive'],
    image: brandMedia.referenceCases.siteWeb
  },
  {
    title: 'PME logistique en Seine-Maritime',
    tag: 'Outil metier',
    summary:
      'Interface interne pour suivre les operations et centraliser des donnees auparavant gerees dans plusieurs fichiers.',
    services: ['Application web', 'Automatisation', 'Tableau de bord'],
    image: brandMedia.referenceCases.outilMetier
  },
  {
    title: 'Cabinet de conseil regional',
    tag: 'IT & securite',
    summary:
      'Audit d’infrastructure, reprise des sauvegardes et fiabilisation des acces pour un environnement plus stable.',
    services: ['Reseau', 'Sauvegarde', 'Securite'],
    image: brandMedia.referenceCases.itSecurite
  },
  {
    title: 'Commerce de proximite',
    tag: 'Presence digitale',
    summary:
      'Reconstruction d’une presence web plus premium avec pages service, demandes de contact et contenu administrable.',
    services: ['Refonte', 'Contenu', 'UX'],
    image: brandMedia.referenceCases.presenceDigitale
  },
  {
    title: 'Equipe administrative multi-sites',
    tag: 'Formation',
    summary:
      'Sessions ciblees autour d’Excel, des usages numeriques et de l’organisation de l’information pour gagner en autonomie.',
    services: ['Formation', 'Excel', 'Organisation'],
    image: brandMedia.referenceCases.formation
  },
  {
    title: 'Activite de service B2B',
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
      'Le Havre et son tissu de petites structures exigent de la proximite, de la clarte et des reponses qui restent proportionnees.'
  },
  {
    title: 'Lecture transversale',
    text:
      'Web, logiciel, support IT et formation sont traites comme un ensemble coherent, pas comme des silos qui s’ignorent.'
  },
  {
    title: 'Pragmatisme',
    text:
      'Les recommandations privilegient l’utilite et la maintenabilite. Pas de stack lourde ou d’effet de mode sans raison.'
  },
  {
    title: 'Relation durable',
    text:
      'Le projet est pense pour durer, avec un interlocuteur unique capable de faire evoluer l’existant plutot que de tout refaire.'
  }
];

export const legacyScope = [
  {
    title: 'Site Internet',
    text:
      'Creation, refonte, site vitrine, e-commerce, intranet, site institutionnel, evenementiel, immobilier, newsletter et emailing.'
  },
  {
    title: 'Logiciel sur mesure',
    text:
      'Applications metier, bases de donnees, hebergement des composants, maintenance et formation au logiciel.'
  },
  {
    title: 'Formation',
    text:
      'Centre de formation agree, sessions individuelles ou groupees, bureautique, Internet, Excel, Access, VBA et VB.NET.'
  },
  {
    title: 'Reseau',
    text:
      'Reseau local, reseau etendu, Wi-Fi, VPN, messagerie, routeurs et maintenance reseau pour petites structures.'
  },
  {
    title: 'Maintenance',
    text:
      'Depannage materiel et logiciel, assistance telephonique, telemaintenance, interventions sur site et suivi preventif.'
  },
  {
    title: 'Protection',
    text:
      'Sauvegarde, restauration, cryptage des donnees, antivirus, anti-spywares et logique de continuite d activite.'
  }
];

export const aboutValues = [
  {
    title: 'Ecoute avant tout',
    text:
      'Chaque mission part de votre activite reelle. Les besoins sont reformules clairement avant de proposer une solution.'
  },
  {
    title: 'Solutions proportionnees',
    text:
      'Une petite structure n’a pas besoin d’une complexite de grand groupe. La bonne architecture est celle qui tient dans le temps.'
  },
  {
    title: 'Clarte de la relation',
    text:
      'Un perimetre comprehensible, des arbitrages explicites et des points de passage clairs pendant toute la production.'
  },
  {
    title: 'Accompagnement complet',
    text:
      'Le site, l’outil, le support et la formation peuvent etre traites dans un continuum pour eviter les ruptures.'
  }
];

export const aboutLegacySections = [
  {
    title: 'Perimetre historique',
    paragraphs: [
      'Le site historique de Logic Web presentait deja un perimetre large : creation de sites Internet, logiciels sur mesure, reseaux, maintenance, protection des donnees et formation.',
      'La version actuelle conserve cette realite de terrain, avec une lecture plus claire : le reseau, la maintenance et la protection sont desormais regroupes dans une offre support IT plus simple a comprendre.'
    ]
  },
  {
    title: 'Accessibilite & standards',
    paragraphs: [
      'L ancien site mettait deja en avant une attention reelle a l accessibilite et au respect des standards du web. Cet engagement reste pertinent aujourd hui : lisibilite, structure claire et socle technique propre.',
      'L objectif reste le meme : rendre l information facile a consulter, a indexer et a faire evoluer, sans complexite gratuite.'
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
    title: 'Telephone',
    body: '02 35 44 66 81',
    href: 'tel:+33235446681'
  },
  {
    title: 'Zone d’intervention',
    body: 'Le Havre, Sainte-Adresse, Seine-Maritime et Normandie'
  },
  {
    title: 'Premier echange',
    body: 'Sur site ou a distance selon le projet, avec retour sous 24h ouvrées'
  }
];

export const contactProjectOptions = [
  'Creation de site web',
  'Logiciel / outil metier',
  'Support IT & securite',
  'Formation',
  'Autre / cadrage initial'
];

export const footerServices = services.map((service) => ({
  label: service.shortTitle,
  path: service.path
}));

export const footerLinks = [
  { label: 'Mentions legales', path: '/mentions-legales' },
  { label: 'Politique de confidentialite', path: '/politique-confidentialite' }
];
