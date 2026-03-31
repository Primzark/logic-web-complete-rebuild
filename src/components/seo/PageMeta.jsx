import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_SITE_URL = 'https://www.logic-web.net';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function PageMeta({
  title,
  description,
  canonicalPath,
  image = '/og-logic-web.svg',
  schema
}) {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
    const canonicalUrl = `${siteUrl}${canonicalPath || location.pathname}`;
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl
    });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image'
    });
    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl
    });

    let element = document.getElementById('logic-web-schema');

    if (!schema && element) {
      element.remove();
      return;
    }

    if (schema) {
      if (!element) {
        element = document.createElement('script');
        element.id = 'logic-web-schema';
        element.type = 'application/ld+json';
        document.head.appendChild(element);
      }

      element.textContent = JSON.stringify(schema);
    }
  }, [canonicalPath, description, image, location.pathname, schema, title]);

  return null;
}
