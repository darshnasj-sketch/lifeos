import type { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Panel({ children, className = '', ariaLabel }: PanelProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={`rounded-lg border border-life-line bg-white p-4 shadow-[0_1px_0_rgba(22,32,28,0.02)] ${className}`}
    >
      {children}
    </section>
  );
}
