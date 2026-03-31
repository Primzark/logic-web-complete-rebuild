import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { company, contactDetails, contactProjectOptions } from '../../data/siteContent';
import Button from '../ui/Button';

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Merci de renseigner votre nom.';
  }

  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Merci de renseigner une adresse email valide.';
  }

  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = 'Merci de préciser votre besoin en quelques phrases.';
  }

  return errors;
}

export default function ContactFormSection() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    website: '',
    formStartedAt: Date.now()
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const endpoint = useMemo(
    () => import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact.php',
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        state: 'error',
        message: 'Le formulaire contient des erreurs. Merci de vérifier les champs indiqués.'
      });
      return;
    }

    setStatus({
      state: 'loading',
      message: 'Envoi du message en cours...'
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        setErrors(payload.errors || {});
        setStatus({
          state: 'error',
          message: payload.message || 'Une erreur est survenue. Merci de réessayer.'
        });
        return;
      }

      navigate('/merci', {
        state: {
          name: values.name,
          projectType: values.projectType || 'votre projet'
        }
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: 'Impossible d’envoyer le message pour le moment. Merci d’utiliser l’email direct.'
      });
    }
  };

  return (
    <div className="contact-grid page-shell page-shell--simple">
      <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-name">Nom complet</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={values.name}
              onChange={handleChange}
              required
            />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
          </div>

          <div className="form-group">
            <label htmlFor="contact-company">Entreprise</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              placeholder="Nom de votre entreprise"
              value={values.company}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="vous@entreprise.fr"
              value={values.email}
              onChange={handleChange}
              required
            />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone">Téléphone</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Votre numéro"
              value={values.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group hidden-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Site web</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex="-1"
            autoComplete="off"
            value={values.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-project-type">Type de projet</label>
          <select
            id="contact-project-type"
            name="projectType"
            value={values.projectType}
            onChange={handleChange}
          >
            <option value="">Sélectionnez un service</option>
            {contactProjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">Votre message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Décrivez votre besoin, votre contexte et les enjeux du projet..."
            value={values.message}
            onChange={handleChange}
            required
          />
          {errors.message ? <span className="field-error">{errors.message}</span> : null}
        </div>

        {status.message ? (
          <div className={`form-status form-status--${status.state}`}>{status.message}</div>
        ) : null}

        <Button
          type="submit"
          color="olive"
          className="contact-submit"
          magnetic={status.state !== 'loading'}
          disabled={status.state === 'loading'}
        >
          {status.state === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande →'}
        </Button>

        <p className="contact-policy">
          En envoyant ce formulaire, vous acceptez que vos données soient utilisées uniquement pour traiter
          votre demande. Voir la <Link to="/politique-confidentialite">politique de confidentialité</Link>.
        </p>
      </form>

      <div className="contact-info">
        <h3>Coordonnées directes</h3>
        <p>
          Vous préférez un premier échange par email ? Logic Web revient vers vous rapidement avec un cadre
          clair, sans pression commerciale inutile.
        </p>

        {contactDetails.map((detail) => (
          <div className="contact-detail" key={detail.title}>
            <div className="contact-detail-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {detail.title === 'Email' ? (
                  <>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </>
                ) : detail.title === 'Téléphone' ? (
                  <>
                    <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.1 8.91a16 16 0 0 0 8 8l1.27-1.26a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </>
                ) : detail.title === 'Zone d’intervention' ? (
                  <>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </>
                ) : (
                  <>
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                  </>
                )}
              </svg>
            </div>
            <div>
              <h4>{detail.title}</h4>
              <p>
                {detail.href ? (
                  <a href={detail.href} className="contact-inline-link">
                    {detail.body}
                  </a>
                ) : (
                  detail.body
                )}
              </p>
            </div>
          </div>
        ))}

        <div className="what-next">
          <h4>Que se passe-t-il après votre message ?</h4>
          <div className="what-next-steps">
            <div className="what-next-step">
              <span>1</span> Analyse rapide de votre demande sous 24 h ouvrées.
            </div>
            <div className="what-next-step">
              <span>2</span> Retour par email pour organiser le premier échange et clarifier le besoin.
            </div>
            <div className="what-next-step">
              <span>3</span> Proposition d’une suite adaptée : cadrage, recommandation ou devis.
            </div>
          </div>
        </div>

        <p className="contact-inline-note">
          Contact direct : <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </div>
    </div>
  );
}
