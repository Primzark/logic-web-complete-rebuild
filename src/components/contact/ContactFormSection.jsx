import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { company, contactDetails, contactProjectOptions } from '../../data/siteContent';
import Button from '../ui/Button';

const validatedFields = ['name', 'email', 'message'];
const contactStorageKey = 'logicweb-last-contact';

function validateField(name, value) {
  const cleanValue = value.trim();

  if (name === 'name' && !cleanValue) {
    return 'Indiquez votre nom complet pour que nous sachions qui recontacter.';
  }

  if (name === 'email') {
    if (!cleanValue) {
      return 'Indiquez une adresse email pour recevoir notre réponse.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue)) {
      return 'Entrez une adresse email valide, par exemple vous@entreprise.fr.';
    }
  }

  if (name === 'message') {
    if (!cleanValue) {
      return 'Décrivez votre besoin en quelques phrases pour que nous puissions vous répondre utilement.';
    }

    if (cleanValue.length < 20) {
      return 'Ajoutez au moins 20 caractères pour préciser votre contexte.';
    }
  }

  return '';
}

function validate(values) {
  const errors = {};

  validatedFields.forEach((field) => {
    const error = validateField(field, values[field] || '');

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

export default function ContactFormSection() {
  const statusRef = useRef(null);
  const [values, setValues] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    _honey: ''
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const nextUrl = typeof window !== 'undefined' ? `${window.location.origin}/merci` : '/merci';

  useEffect(() => {
    if (status.state === 'error') {
      window.requestAnimationFrame(() => {
        statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        statusRef.current?.focus({ preventScroll: true });
      });
    }
  }, [status.state, status.message]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value
    }));

    if (!validatedFields.includes(name) || (!touched[name] && !submitted)) {
      return;
    }

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      const fieldError = validateField(name, value);

      if (fieldError) {
        nextErrors[name] = fieldError;
      } else {
        delete nextErrors[name];
      }

      if (status.state === 'error' && Object.keys(nextErrors).length === 0) {
        setStatus({ state: 'idle', message: '' });
      }

      return nextErrors;
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (!validatedFields.includes(name)) {
      return;
    }

    setTouched((current) => ({
      ...current,
      [name]: true
    }));

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      const fieldError = validateField(name, value);

      if (fieldError) {
        nextErrors[name] = fieldError;
      } else {
        delete nextErrors[name];
      }

      return nextErrors;
    });
  };

  const handleSubmit = (event) => {
    setSubmitted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setStatus({
        state: 'error',
        message: 'Corrigez les champs indiqués, puis envoyez votre demande.'
      });
      return;
    }

    try {
      window.sessionStorage.setItem(
        contactStorageKey,
        JSON.stringify({
          name: values.name.trim(),
          projectType: values.projectType
        })
      );
    } catch {
      // Session storage is a progressive enhancement for the thank-you page.
    }

    setStatus({
      state: 'loading',
      message: 'Envoi en cours. Vous allez être redirigé vers la page de confirmation.'
    });
  };

  const getFieldError = (field) => (errors[field] && (touched[field] || submitted) ? errors[field] : '');

  const buildDescription = (...ids) => ids.filter(Boolean).join(' ') || undefined;

  const nameError = getFieldError('name');
  const emailError = getFieldError('email');
  const messageError = getFieldError('message');
  const completedRequired = [
    !validateField('name', values.name),
    !validateField('email', values.email),
    !validateField('message', values.message)
  ].filter(Boolean).length;
  const completionPercent = Math.round((completedRequired / validatedFields.length) * 100);
  const errorSummaryItems = [
    { label: 'Nom complet', target: 'contact-name', message: nameError },
    { label: 'Email', target: 'contact-email', message: emailError },
    { label: 'Message', target: 'contact-message', message: messageError }
  ].filter((item) => item.message);

  return (
    <div className="contact-grid page-shell page-shell--simple">
      <form
        action="https://formsubmit.co/nicolaslivapro@gmail.com"
        className="contact-form"
        id="contactForm"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <input type="hidden" name="_subject" value="Nouvelle demande depuis le site Logic Web" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={nextUrl} />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-name">
              Nom complet <span className="label-required">(obligatoire)</span>
            </label>
            <input
              id="contact-name"
              name="name"
              className={nameError ? 'field-invalid-pulse' : undefined}
              type="text"
              placeholder="Ex. Nicolas Martin"
              autoComplete="name"
              value={values.name}
              aria-describedby={buildDescription('contact-name-hint', nameError && 'contact-name-error')}
              aria-invalid={nameError ? 'true' : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span className="field-hint" id="contact-name-hint">
              Prénom et nom de la personne à recontacter.
            </span>
            {nameError ? (
              <span className="field-error" id="contact-name-error" aria-live="polite">
                {nameError}
              </span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="contact-company">Entreprise</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              placeholder="Ex. Atelier Martin"
              autoComplete="organization"
              value={values.company}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-email">
              Email <span className="label-required">(obligatoire)</span>
            </label>
            <input
              id="contact-email"
              name="email"
              className={emailError ? 'field-invalid-pulse' : undefined}
              type="email"
              placeholder="vous@entreprise.fr"
              autoComplete="email"
              value={values.email}
              aria-describedby={buildDescription('contact-email-hint', emailError && 'contact-email-error')}
              aria-invalid={emailError ? 'true' : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span className="field-hint" id="contact-email-hint">
              Nous répondrons uniquement à cette adresse.
            </span>
            {emailError ? (
              <span className="field-error" id="contact-email-error" aria-live="polite">
                {emailError}
              </span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone">Téléphone</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Ex. 02 35 00 00 00"
              autoComplete="tel"
              value={values.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group hidden-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Site web</label>
          <input
            id="contact-website"
            name="_honey"
            type="text"
            tabIndex="-1"
            autoComplete="off"
            value={values._honey}
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
          <label htmlFor="contact-message">
            Votre message <span className="label-required">(obligatoire)</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            className={messageError ? 'field-invalid-pulse' : undefined}
            placeholder="Expliquez votre besoin, votre contexte et la suite attendue..."
            value={values.message}
            aria-describedby={buildDescription('contact-message-hint', messageError && 'contact-message-error')}
            aria-invalid={messageError ? 'true' : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="field-hint" id="contact-message-hint">
            Quelques phrases suffisent : contexte, objectif, délai ou contrainte utile.
          </span>
          {messageError ? (
            <span className="field-error" id="contact-message-error" aria-live="polite">
              {messageError}
            </span>
          ) : null}
        </div>

        <div className="form-progress" aria-live="polite">
          <div className="form-progress-top">
            <span>{completedRequired}/3 informations obligatoires complétées</span>
            <strong>{completionPercent}%</strong>
          </div>
          <div className="form-progress-track" aria-hidden="true">
            <span style={{ width: `${completionPercent}%` }} />
          </div>
        </div>

        {status.message ? (
          <div
            ref={statusRef}
            className={`form-status form-status--${status.state}`}
            role={status.state === 'error' ? 'alert' : 'status'}
            aria-live={status.state === 'error' ? 'assertive' : 'polite'}
            tabIndex={status.state === 'error' ? -1 : undefined}
          >
            <p>{status.message}</p>
            {status.state === 'error' && errorSummaryItems.length > 0 ? (
              <ul className="form-error-list">
                {errorSummaryItems.map((item) => (
                  <li key={item.target}>
                    <a href={`#${item.target}`}>
                      {item.label} : {item.message}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
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

        <p className={`contact-fallback ${status.state === 'loading' ? 'is-visible' : ''}`}>
          Si l’envoi échoue, écrivez directement à{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>

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
