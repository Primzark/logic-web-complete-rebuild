function getModernSource(src) {
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

export default function OptimizedImage({ src, alt, className, ...props }) {
  const modernSrc = getModernSource(src);

  return (
    <picture>
      <source srcSet={modernSrc} type="image/webp" />
      <img src={src} alt={alt} className={className} {...props} />
    </picture>
  );
}
