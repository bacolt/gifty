interface IconProps {
  name: string;
  className?: string;
}

/**
 * Renders a Bootstrap Icon by name (kebab-case, e.g. "check-circle", "arrow-right").
 */
export function Icon({ name, className = '' }: IconProps) {
  return <i className={`bi bi-${name} ${className}`.trim()} aria-hidden />;
}
