import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function buildClassName({ variant, color, className, magnetic }) {
  return [
    variant === 'secondary' ? 'btn-secondary' : 'btn-primary',
    color === 'olive' && variant !== 'secondary' ? 'btn-primary--olive' : '',
    magnetic ? 'btn-magnetic' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');
}

export default function Button({
  children,
  to,
  href,
  type = 'button',
  variant = 'primary',
  color,
  className = '',
  magnetic = true,
  onClick,
  ...props
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const elementRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (event) => {
    if (prefersReducedMotion || !magnetic || !elementRef.current) {
      return;
    }

    const threshold = 60;
    const buttonPull = 6;
    const innerPull = 4;
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.max(rect.width, rect.height) / 2 + threshold;

    if (distance >= maxDistance) {
      return;
    }

    const strength = 1 - distance / maxDistance;
    const moveX = deltaX * strength * (buttonPull / (maxDistance * 0.5));
    const moveY = deltaY * strength * (buttonPull / (maxDistance * 0.5));

    elementRef.current.style.transform = `translate(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px)`;

    if (innerRef.current) {
      const innerX = deltaX * strength * (innerPull / (maxDistance * 0.5));
      const innerY = deltaY * strength * (innerPull / (maxDistance * 0.5));
      innerRef.current.style.transform = `translate(${innerX.toFixed(2)}px, ${innerY.toFixed(2)}px)`;
    }
  };

  const resetTransforms = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = '';
    }

    if (innerRef.current) {
      innerRef.current.style.transform = '';
    }
  };

  const handleClick = (event) => {
    if (!prefersReducedMotion && magnetic && elementRef.current) {
      const button = elementRef.current;

      button.classList.remove('pulse-click');
      void button.offsetWidth;
      button.classList.add('pulse-click');

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const ripple = document.createElement('span');

      ripple.className = 'ripple-circle';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;

      button.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    }

    onClick?.(event);
  };

  const commonProps = {
    ...props,
    className: buildClassName({ variant, color, className, magnetic }),
    onMouseMove: handleMouseMove,
    onMouseLeave: resetTransforms,
    onClick: handleClick,
    ref: elementRef
  };

  const content = <span className="btn-magnetic-inner" ref={innerRef}>{children}</span>;

  if (to) {
    return (
      <Link to={to} {...commonProps}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} {...commonProps}>
      {content}
    </button>
  );
}
