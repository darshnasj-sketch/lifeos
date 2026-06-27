import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_12%_8%,rgba(183,234,215,0.5),transparent_28rem),linear-gradient(145deg,#eef6f1_0%,#f7f1ea_48%,#edf4ff_100%)] px-4 py-8 text-life-ink">
      <section className="w-full max-w-[430px] rounded-[28px] border border-black/10 bg-life-paper p-5 shadow-phone">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-[14px] bg-life-ink text-lg font-black text-white">L</div>
          <div>
            <p className="text-xs font-bold uppercase text-life-muted">LifeOS</p>
            <h1 className="text-2xl font-black leading-tight">{title}</h1>
          </div>
        </div>
        <p className="mb-5 text-sm font-semibold text-life-muted">{subtitle}</p>
        {children}
      </section>
    </main>
  );
}
