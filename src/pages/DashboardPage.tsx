import { LogOut } from 'lucide-react';
import { useMemo } from 'react';
import { AppShell, TopBar } from '../components/layout/AppShell';
import { Badge } from '../components/ui/Badge';
import { Panel } from '../components/ui/Panel';
import { PantryList } from '../components/dashboard/PantryList';
import { QuickActions } from '../components/dashboard/QuickActions';
import { TaskList } from '../components/dashboard/TaskList';
import { useAuth } from '../hooks/useAuth';
import { getFirstName } from '../hooks/useFirstName';
import { usePantry } from '../hooks/usePantry';
import { useTodayTasks } from '../hooks/useTodayTasks';

export function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const firstName = getFirstName(profile, user);
  const { tasks, completedCount, toggleTask } = useTodayTasks();
  const { items, updateQuantity } = usePantry();
  const summary = useMemo(
    () =>
      completedCount === tasks.length
        ? `${tasks.length} tasks complete`
        : `${completedCount} of ${tasks.length} tasks complete`,
    [completedCount, tasks.length],
  );

  return (
    <AppShell>
      <TopBar greeting={firstName} />

      <section className="rounded-lg border border-life-mintDeep/20 bg-[linear-gradient(135deg,#f4fff9,#fff9ed)] p-5">
        <div className="flex items-start justify-between gap-3.5">
          <div>
            <p className="text-xs font-bold uppercase text-life-muted">Today</p>
            <h2 className="text-base font-black">{summary}</h2>
            <p className="mt-1.5 text-xs font-bold text-life-muted">Home, food, money, and notes in one calm place.</p>
          </div>
          <span className="shrink-0 rounded-full border border-life-line bg-white px-2.5 py-2 text-xs font-extrabold text-life-muted">
            Sat, Jun 27
          </span>
        </div>
      </section>

      <section className="mt-3.5 grid grid-cols-2 gap-3 max-[360px]:grid-cols-1" aria-label="Daily overview">
        <Panel>
          <div className="mb-3 flex items-center justify-between gap-2.5">
            <h2 className="text-base font-black">Tasks</h2>
            <Badge>{completedCount}/{tasks.length}</Badge>
          </div>
          <TaskList tasks={tasks} onToggle={toggleTask} />
        </Panel>

        <Panel>
          <div className="mb-3 flex items-center justify-between gap-2.5">
            <h2 className="text-base font-black">Spending</h2>
            <Badge tone="gold">Monthly</Badge>
          </div>
          <p className="text-xs font-bold text-life-muted">June total</p>
          <p className="mt-1.5 text-3xl font-black leading-none">₹18,250</p>
          <div className="mt-3.5 h-2 overflow-hidden rounded-full bg-[#edf2ee]" aria-label="61 percent of monthly budget used">
            <span className="block h-full w-[61%] rounded-full bg-[linear-gradient(90deg,#1f7a5b,#e0b743)]" />
          </div>
          <p className="mt-2.5 text-xs font-bold text-life-muted">₹11,750 left</p>
        </Panel>
      </section>

      <Panel className="mt-3" ariaLabel="Pantry">
        <div className="mb-3 flex items-center justify-between gap-2.5">
          <h2 className="text-base font-black">Pantry</h2>
          <Badge tone="blue">{items.length} items</Badge>
        </div>
        <PantryList items={items} onUpdateQuantity={updateQuantity} />
      </Panel>

      <Panel className="mt-3" ariaLabel="Quick actions">
        <QuickActions />
      </Panel>

      <button
        type="button"
        onClick={() => void signOut()}
        className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-life-line bg-white text-sm font-black text-life-muted transition hover:-translate-y-0.5"
      >
        <LogOut size={16} />
        Logout
      </button>
    </AppShell>
  );
}
