import ServiceTemplate from '../components/services/ServiceTemplate';
import { getServiceBySlug } from '../data/services';

export default function Software() {
  return <ServiceTemplate service={getServiceBySlug('logiciels-sur-mesure')} />;
}
