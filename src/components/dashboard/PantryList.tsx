import { Minus, Plus } from 'lucide-react';
import type { PantryItem } from '../../types/dashboard';

interface PantryListProps {
  items: PantryItem[];
  onUpdateQuantity: (itemId: string, direction: 'decrease' | 'increase') => void;
}

export function PantryList({ items, onUpdateQuantity }: PantryListProps) {
  return (
    <div className="grid gap-2.5">
      {items.map((item) => (
        <div
          key={item.id}
          className="grid min-h-14 grid-cols-[38px_1fr_auto] items-center gap-2.5 rounded-lg border border-life-line bg-white px-2.5 py-2"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#f0f5f1] text-xl">{item.icon}</span>
          <div>
            <p className="font-extrabold">{item.name}</p>
            <p className="mt-0.5 text-xs font-bold text-life-muted">{item.status}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={`Decrease ${item.name}`}
              onClick={() => onUpdateQuantity(item.id, 'decrease')}
              className="grid size-7 place-items-center rounded-[9px] border border-life-line bg-white transition hover:-translate-y-0.5"
            >
              <Minus size={13} />
            </button>
            <strong className="min-w-4 text-center">{item.quantity}</strong>
            <button
              type="button"
              aria-label={`Increase ${item.name}`}
              onClick={() => onUpdateQuantity(item.id, 'increase')}
              className="grid size-7 place-items-center rounded-[9px] border border-life-line bg-white transition hover:-translate-y-0.5"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
