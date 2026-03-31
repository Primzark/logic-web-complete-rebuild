import ServiceTemplate from '../components/services/ServiceTemplate';
import { getServiceBySlug } from '../data/services';

export default function WebCreation() {
  return <ServiceTemplate service={getServiceBySlug('creation-sites-web')} />;
}
