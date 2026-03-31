import Layout from '../components/layout/Layout';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import ITSupport from '../pages/ITSupport';
import Legal from '../pages/Legal';
import NotFound from '../pages/NotFound';
import Privacy from '../pages/Privacy';
import References from '../pages/References';
import Services from '../pages/Services';
import Software from '../pages/Software';
import ThankYou from '../pages/ThankYou';
import Training from '../pages/Training';
import WebCreation from '../pages/WebCreation';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'creation-sites-web', element: <WebCreation /> },
      { path: 'logiciels-sur-mesure', element: <Software /> },
      { path: 'support-it-securite', element: <ITSupport /> },
      { path: 'formation', element: <Training /> },
      { path: 'references', element: <References /> },
      { path: 'a-propos', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'mentions-legales', element: <Legal /> },
      { path: 'politique-confidentialite', element: <Privacy /> },
      { path: 'merci', element: <ThankYou /> },
      { path: '*', element: <NotFound /> }
    ]
  }
];
