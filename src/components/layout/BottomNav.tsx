import { Bot, BookOpen, Home, IndianRupee, ShoppingBasket } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../../types/dashboard';

const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Money', path: '/money', icon: IndianRupee },
  { label: 'Pantry', path: '/pantry', icon: ShoppingBasket },
  { label: 'Journal', path: '/journal', icon: BookOpen },
  { label: 'AI', path: '/ai', icon: Bot },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Bottom navigation"
      className="grid grid-cols-5 gap-1.5 border-t border-life-line bg-life-paper/95 px-3.5 pb-4 pt-2.5 backdrop-blur-xl"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            [
              'grid h-[54px] place-items-center gap-0.5 rounded-2xl text-[10px] font-extrabold transition hover:-translate-y-0.5',
              isActive ? 'bg-life-ink text-white' : 'bg-transparent text-life-muted',
            ].join(' ')
          }
        >
          <item.icon size={21} strokeWidth={2.2} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
