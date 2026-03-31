import ServiceTemplate from '../components/services/ServiceTemplate';
import { getServiceBySlug } from '../data/services';

export default function Training() {
  return <ServiceTemplate service={getServiceBySlug('formation')} />;
}
