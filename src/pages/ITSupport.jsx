import ServiceTemplate from '../components/services/ServiceTemplate';
import { getServiceBySlug } from '../data/services';

export default function ITSupport() {
  return <ServiceTemplate service={getServiceBySlug('support-it-securite')} />;
}
