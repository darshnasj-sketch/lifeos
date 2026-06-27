import { Plus, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { QuickAction } from '../../types/dashboard';

const quickActions: QuickAction[] = [
  { id: 'expense', label: 'Expense', helper: 'Track rupees' },
  { id: 'grocery', label: 'Grocery', helper: 'Add pantry item' },
  { id: 'meal', label: 'Meal', helper: 'Log food' },
  { id: 'journal', label: 'Journal', helper: 'Capture note' },
];

export function QuickActions() {
  const [activeAction, setActiveAction] = useState<QuickAction | null>(null);
  const [lastAction, setLastAction] = useState('Ready');

  function openAction(action: QuickAction) {
    setActiveAction(action);
  }

  function submitAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLastAction(activeAction ? `${activeAction.label} saved` : 'Saved');
    setActiveAction(null);
    event.currentTarget.reset();
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-2.5">
        <h2 className="text-base font-black">Quick Actions</h2>
        <span className="text-xs font-bold text-life-muted">{lastAction}</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 max-[360px]:grid-cols-1">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => openAction(action)}
            className="flex min-h-[70px] items-center gap-2.5 rounded-lg border border-life-line bg-white p-3 text-left transition hover:-translate-y-0.5"
          >
            <span className="grid size-[34px] place-items-center rounded-[11px] bg-life-ink text-white">
              <Plus size={19} strokeWidth={3} />
            </span>
            <span>
              <strong className="block text-sm leading-tight">{action.label}</strong>
              <span className="mt-1 block text-[11px] font-bold text-life-muted">{action.helper}</span>
            </span>
          </button>
        ))}
      </div>

      {activeAction ? (
        <div className="fixed inset-0 z-20 grid place-items-end bg-life-ink/30 p-4" role="dialog" aria-modal="true">
          <form className="w-full max-w-[396px] rounded-[22px] bg-white p-[18px] shadow-[0_18px_60px_rgba(0,0,0,0.24)]" onSubmit={submitAction}>
            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="text-base font-black">Add {activeAction.label}</h2>
              <button
                type="button"
                onClick={() => setActiveAction(null)}
                className="grid size-[42px] place-items-center rounded-[14px] border border-life-line bg-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <label className="mb-3 grid gap-2 text-xs font-bold text-life-muted" htmlFor="entryName">
              Name
              <input
                id="entryName"
                name="entryName"
                autoComplete="off"
                autoFocus
                placeholder={activeAction.id === 'journal' ? 'What happened today?' : 'What should LifeOS remember?'}
                className="h-[46px] rounded-xl border border-life-line bg-[#fbfcfb] px-3 text-sm text-life-ink outline-none focus:border-life-mintDeep focus:ring-4 focus:ring-life-mintDeep/10"
              />
            </label>
            <label className="mb-3 grid gap-2 text-xs font-bold text-life-muted" htmlFor="entryAmount">
              Amount or quantity
              <input
                id="entryAmount"
                name="entryAmount"
                autoComplete="off"
                placeholder="Optional"
                className="h-[46px] rounded-xl border border-life-line bg-[#fbfcfb] px-3 text-sm text-life-ink outline-none focus:border-life-mintDeep focus:ring-4 focus:ring-life-mintDeep/10"
              />
            </label>
            <button type="submit" className="h-12 w-full rounded-[13px] bg-life-ink text-sm font-black text-white">
              Save
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
