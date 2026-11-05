import React from 'react';

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'inset' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const NeuButton: React.FC<NeuButtonProps> = ({
  children,
  className = '',
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  ...rest
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-full min-h-[34px]',
    md: 'px-5 py-2.5 text-sm gap-2 rounded-full min-h-[42px]',
    lg: 'px-7 py-3.5 text-base gap-2.5 rounded-full min-h-[50px]',
  }[size];

  const variantClasses = {
    primary:
      'neu-orange-gradient text-slate-950 font-semibold shadow-[4px_4px_12px_rgba(0,0,0,0.4),-3px_-3px_8px_rgba(255,255,255,0.06),0_0_14px_var(--neu-accent-glow)] hover:brightness-105 active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)] active:scale-[0.98]',
    secondary:
      'neu-raised text-[var(--neu-text-primary)] font-medium hover:text-[var(--neu-accent)] active:neu-inset active:scale-[0.98]',
    inset:
      'neu-inset text-[var(--neu-accent)] font-semibold active:neu-raised',
    danger:
      'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[3px_3px_8px_rgba(0,0,0,0.4),-3px_-3px_7px_rgba(255,255,255,0.04)] hover:bg-red-500/20 active:neu-inset',
    ghost:
      'text-[var(--neu-text-secondary)] hover:text-[var(--neu-text-primary)] hover:bg-white/5 active:neu-inset',
  }[variant];

  const disabledClass = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--neu-base)] ${sizeClasses} ${variantClasses} ${disabledClass} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
