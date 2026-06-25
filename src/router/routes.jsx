import { lazy, Suspense } from 'react';

import Layout from '../components/layout/Layout';

const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Home = lazy(() => import('../pages/Home'));
const ITSupport = lazy(() => import('../pages/ITSupport'));
const Legal = lazy(() => import('../pages/Legal'));
const LocalLanding = lazy(() => import('../pages/LocalLanding'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Privacy = lazy(() => import('../pages/Privacy'));
const References = lazy(() => import('../pages/References'));
const Services = lazy(() => import('../pages/Services'));
const Software = lazy(() => import('../pages/Software'));
const ThankYou = lazy(() => import('../pages/ThankYou'));
const Training = lazy(() => import('../pages/Training'));
const WebCreation = lazy(() => import('../pages/WebCreation'));

function withPage(Component, props) {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
}

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: withPage(Home) },
      { path: 'services', element: withPage(Services) },
      { path: 'creation-sites-web', element: withPage(WebCreation) },
      { path: 'logiciels-sur-mesure', element: withPage(Software) },
      { path: 'support-it-securite', element: withPage(ITSupport) },
      { path: 'formation', element: withPage(Training) },
      { path: 'creation-site-internet-le-havre', element: withPage(LocalLanding, { slug: 'creation-site-internet-le-havre' }) },
      { path: 'support-informatique-le-havre', element: withPage(LocalLanding, { slug: 'support-informatique-le-havre' }) },
      { path: 'logiciel-sur-mesure-normandie', element: withPage(LocalLanding, { slug: 'logiciel-sur-mesure-normandie' }) },
      { path: 'formation-bureautique-le-havre', element: withPage(LocalLanding, { slug: 'formation-bureautique-le-havre' }) },
      { path: 'references', element: withPage(References) },
      { path: 'a-propos', element: withPage(About) },
      { path: 'contact', element: withPage(Contact) },
      { path: 'mentions-legales', element: withPage(Legal) },
      { path: 'politique-confidentialite', element: withPage(Privacy) },
      { path: 'merci', element: withPage(ThankYou) },
      { path: '*', element: withPage(NotFound) }
    ]
  }
];
