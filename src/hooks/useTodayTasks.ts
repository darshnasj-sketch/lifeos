import { useMemo, useState } from 'react';
import type { Task } from '../types/dashboard';

const initialTasks: Task[] = [
  { id: 'grocery', name: 'Grocery', category: 'Home', tone: 'blue', completed: true },
  { id: 'gym', name: 'Gym', category: 'Health', tone: 'gold', completed: true },
  { id: 'bills', name: 'Bills', category: 'Money', tone: 'mint', completed: true },
];

export function useTodayTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);

  function toggleTask(taskId: string) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  }

  return { tasks, completedCount, toggleTask };
}
