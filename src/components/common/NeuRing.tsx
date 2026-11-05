import React from 'react';

interface NeuRingProps {
  percentage: number; // 0 to 100
  size?: number; // diameter in px, e.g. 120
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  color?: 'orange' | 'green' | 'red';
}

export const NeuRing: React.FC<NeuRingProps> = ({
  percentage,
  size = 130,
  strokeWidth = 10,
  label,
  sublabel,
  className = '',
  color = 'orange',
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  const strokeColor = {
    orange: 'url(#orangeRingGrad)',
    green: '#22c55e',
    red: '#ef4444',
  }[color];

  const glowShadow = {
    orange: 'drop-shadow(0 0 6px rgba(255,122,26,0.5))',
    green: 'drop-shadow(0 0 6px rgba(34,197,94,0.5))',
    red: 'drop-shadow(0 0 6px rgba(239,68,68,0.5))',
  }[color];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer raised disc frame */}
      <div
        className="absolute inset-0 rounded-full neu-raised"
        style={{ width: size, height: size }}
      />

      {/* SVG Ring with gradient and track */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 transform -rotate-90"
        style={{ filter: glowShadow }}
      >
        <defs>
          <linearGradient id="orangeRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9A45" />
            <stop offset="100%" stopColor="#FF7A1A" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--neu-ring-track)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Inset dark center with percentage */}
      <div
        className="relative z-10 rounded-full neu-inset flex flex-col items-center justify-center p-2 text-center"
        style={{
          width: size - strokeWidth * 2.8,
          height: size - strokeWidth * 2.8,
        }}
      >
        <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--neu-text-primary)]">
          {Math.round(clamped)}%
        </span>
        {label && (
          <span className="text-[10px] font-medium text-[var(--neu-accent)] tracking-wider uppercase mt-0.5">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-[9px] text-[var(--neu-text-muted)] line-clamp-1">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
