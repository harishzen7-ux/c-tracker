import React from 'react';

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'raised' | 'inset' | 'flat';
  active?: boolean;
  glow?: boolean;
  radius?: 'normal' | 'lg' | 'xl' | 'pill';
  hoverable?: boolean;
}

export const NeuCard: React.FC<NeuCardProps> = ({
  children,
  className = '',
  variant = 'raised',
  active = false,
  glow = false,
  radius = 'xl',
  hoverable = false,
  ...rest
}) => {
  const radiusClasses = {
    normal: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-[22px]',
    pill: 'rounded-full',
  }[radius];

  const variantClasses = {
    raised: 'neu-raised',
    inset: 'neu-inset',
    flat: 'bg-[var(--neu-surface)] border border-[var(--neu-border)]',
  }[variant];

  const hoverClass = hoverable ? 'neu-raised-hover cursor-pointer active:scale-[0.99]' : '';
  const glowClass = (active || glow) ? 'neu-glow-orange border border-[var(--neu-accent)]/30' : '';

  return (
    <div
      className={`relative p-5 transition-[background-color,box-shadow,transform,border-color,color] duration-200 ${radiusClasses} ${variantClasses} ${hoverClass} ${glowClass} ${className}`}
      {...rest}
    >
      {active && (
        <span
          className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-[var(--neu-accent)] shadow-[0_0_8px_var(--neu-accent-glow)]"
          title="Active Topic"
        />
      )}
      {children}
    </div>
  );
};
