import React from 'react';

export const ContactCredit: React.FC = () => (
  <p className="text-center text-sm leading-relaxed text-[var(--neu-text-secondary)] opacity-50">
    <span className="font-bold text-[var(--neu-text-primary)]">Harish V</span>
    <span className="mx-2 text-[var(--neu-text-muted)]">·</span>
    <span>For any queries reach out:</span>
    {' '}
    <a
      href="mailto:harish.maildesk@gmail.com"
      className="font-semibold text-[var(--neu-accent)] underline-offset-4 hover:underline"
    >
      harish.maildesk@gmail.com
    </a>
  </p>
);
