import type { ReactNode } from 'react';
import { Bell } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="grid h-[min(100vh,900px)] min-h-[min(760px,100vh)] w-[min(100vw,430px)] grid-rows-[auto_1fr_auto] overflow-hidden rounded-none border-0 border-black/10 bg-life-paper text-life-ink shadow-none sm:rounded-[34px] sm:border sm:shadow-phone">
      <div className="flex h-[34px] items-end justify-between px-6 pb-2 text-xs font-bold text-[#26332d]">
        <span>9:41</span>
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-current" />
          <span className="size-1.5 rounded-full bg-current" />
          <span className="size-1.5 rounded-full bg-current" />
        </span>
      </div>
      <div className="overflow-y-auto px-[18px] pb-[18px] pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      <BottomNav />
    </main>
  );
}

interface TopBarProps {
  greeting: string;
}

export function TopBar({ greeting }: TopBarProps) {
  return (
    <header className="mb-[18px] flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="grid size-[42px] place-items-center rounded-[14px] bg-life-ink text-base font-black text-white">L</div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase text-life-muted">LifeOS</p>
          <h1 className="mt-0.5 truncate text-2xl font-black leading-tight">Hello, {greeting}</h1>
        </div>
      </div>
      <button
        type="button"
        className="grid size-[42px] place-items-center rounded-[14px] border border-life-line bg-white text-life-ink transition hover:-translate-y-0.5"
        aria-label="Notifications"
      >
        <Bell size={18} />
      </button>
    </header>
  );
}
