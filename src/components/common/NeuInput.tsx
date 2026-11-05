import React from 'react';

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  pill?: boolean;
}

export const NeuInput: React.FC<NeuInputProps> = ({
  className = '',
  icon,
  iconPosition = 'right',
  pill = true,
  disabled = false,
  ...rest
}) => {
  const shapeClass = pill ? 'rounded-full' : 'rounded-xl';

  return (
    <div className={`relative flex items-center w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {icon && iconPosition === 'left' && (
        <div className="absolute left-4 text-[var(--neu-text-secondary)] pointer-events-none flex items-center">
          {icon}
        </div>
      )}
      <input
        className={`w-full py-2.5 bg-[var(--neu-base)] text-[var(--neu-text-primary)] placeholder-[var(--neu-text-muted)] text-sm neu-inset outline-none transition-all duration-200 border border-transparent focus:border-[var(--neu-accent)]/50 focus:shadow-[inset_2px_2px_6px_var(--neu-shadow-dark),0_0_10px_var(--neu-accent-glow)] ${
          icon && iconPosition === 'left' ? 'pl-11' : 'pl-5'
        } ${icon && iconPosition === 'right' ? 'pr-11' : 'pr-5'} ${shapeClass} ${className}`}
        disabled={disabled}
        {...rest}
      />
      {icon && iconPosition === 'right' && (
        <div className="absolute right-4 text-[var(--neu-text-secondary)] pointer-events-none flex items-center">
          {icon}
        </div>
      )}
    </div>
  );
};
