import { ContactCredit } from './ContactCredit';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 border-t border-[var(--neu-border)] py-8 px-6 text-center text-xs text-[var(--neu-text-muted)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--neu-accent)]" />
          <span>C Tracker · Phase 1: C Foundations (C99 ISO Standard)</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Keyboard Friendly</span>
          <span aria-hidden="true">·</span>
          <span>Monaco Editor</span>
          <span aria-hidden="true">·</span>
          <span>Zero-Latency C Simulator</span>
        </div>
      </div>
      <div className="mt-5">
        <ContactCredit />
      </div>
    </footer>
  );
};
