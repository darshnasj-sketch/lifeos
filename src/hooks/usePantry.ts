import { useState } from 'react';
import type { PantryItem } from '../types/dashboard';

const initialPantry: PantryItem[] = [
  { id: 'milk', name: 'Milk', icon: '🥛', status: 'Low stock', quantity: 1 },
  { id: 'apples', name: 'Apples', icon: '🍎', status: 'Fresh', quantity: 3 },
  { id: 'potatoes', name: 'Potatoes', icon: '🥔', status: 'Stocked', quantity: 8 },
];

export function usePantry() {
  const [items, setItems] = useState<PantryItem[]>(initialPantry);

  function updateQuantity(itemId: string, direction: 'decrease' | 'increase') {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== itemId) return item;

        const nextQuantity = direction === 'increase' ? item.quantity + 1 : Math.max(0, item.quantity - 1);
        return { ...item, quantity: nextQuantity };
      }),
    );
  }

  return { items, updateQuantity };
}
