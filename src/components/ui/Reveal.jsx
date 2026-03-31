import { useMemo } from 'react';

import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

export default function Reveal({
  as: Component = 'div',
  className = '',
  delay,
  children,
  ...props
}) {
  const { elementRef, isVisible } = useRevealOnScroll();
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  const classes = useMemo(
    () =>
      ['reveal', delayClass, isVisible ? 'visible' : '', className]
        .filter(Boolean)
        .join(' '),
    [className, delayClass, isVisible]
  );

  return (
    <Component ref={elementRef} className={classes} {...props}>
      {children}
    </Component>
  );
}
