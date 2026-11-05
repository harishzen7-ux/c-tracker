import React from 'react';

interface NeuIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: 'round' | 'square';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'raised' | 'inset' | 'primary';
  active?: boolean;
  glow?: boolean;
  ariaLabel: string;
}

export const NeuIconButton: React.FC<NeuIconButtonProps> = ({
  children,
  className = '',
  shape = 'round',
  size = 'md',
  variant = 'raised',
  active = false,
  glow = false,
  disabled = false,
  ariaLabel,
  ...rest
}) => {
  const shapeClass = shape === 'round' ? 'rounded-full' : 'rounded-xl';

  const sizeClass = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size];

  let variantStyle = 'neu-raised text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)] active:neu-inset active:scale-95';
  if (variant === 'inset' || active) {
    variantStyle = 'neu-inset text-[var(--neu-accent)] shadow-[inset_2px_2px_5px_var(--neu-shadow-dark),inset_-2px_-2px_5px_var(--neu-shadow-light)]';
  } else if (variant === 'primary') {
    variantStyle = 'neu-orange-gradient text-slate-950 font-bold shadow-[0_0_12px_var(--neu-accent-glow)] hover:brightness-105 active:scale-95';
  }

  const glowStyle = (glow || active) ? 'shadow-[0_0_12px_var(--neu-accent-glow)] border border-[var(--neu-accent)]/30' : '';
  const disabledStyle = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--neu-base)] ${shapeClass} ${sizeClass} ${variantStyle} ${glowStyle} ${disabledStyle} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
