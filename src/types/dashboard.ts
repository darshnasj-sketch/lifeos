import type { LucideIcon } from 'lucide-react';

export interface Task {
  id: string;
  name: string;
  category: string;
  tone: 'mint' | 'blue' | 'gold';
  completed: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  icon: string;
  status: string;
  quantity: number;
}

export interface QuickAction {
  id: string;
  label: string;
  helper: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}
