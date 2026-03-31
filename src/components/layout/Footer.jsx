import { NavLink } from 'react-router-dom';

import BrandLogo from '../brand/BrandLogo';
import { company, footerLinks, footerServices } from '../../data/siteContent';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <BrandLogo size="footer" className="footer-brand-link" />
          <p>
            {company.description} Partenaire local pour le web, les outils sur mesure, le support IT et la
            formation.
          </p>
        </div>

        <div>
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/references">References</NavLink>
            </li>
            <li>
              <NavLink to="/a-propos">A propos</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4>Services</h4>
          <ul className="footer-links">
            {footerServices.map((service) => (
              <li key={service.path}>
                <NavLink to={service.path}>{service.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <a href="tel:+33235446681">{company.phone}</a>
            </li>
            <li>
              <span className="footer-location">{company.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 {company.name}. Tous droits reserves.</span>
        <div className="footer-bottom-links">
          {footerLinks.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
