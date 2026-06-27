import { Check } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Task } from '../../types/dashboard';

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <div className="grid gap-2.5">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="grid min-h-12 grid-cols-[32px_1fr_auto] items-center gap-2.5 rounded-lg border border-life-line bg-[#fcfdfb] px-2.5 py-2"
        >
          <button
            type="button"
            aria-label={`Toggle ${task.name}`}
            onClick={() => onToggle(task.id)}
            className={`grid size-[26px] place-items-center rounded-full text-sm font-black transition ${
              task.completed
                ? 'bg-life-mint text-life-mintDeep'
                : 'border border-[#b8c3bc] bg-white text-transparent'
            }`}
          >
            <Check size={15} strokeWidth={3} />
          </button>
          <span className={`font-extrabold ${task.completed ? 'text-[#65736c] line-through' : 'text-life-ink'}`}>
            {task.name}
          </span>
          <Badge tone={task.tone}>{task.category}</Badge>
        </div>
      ))}
    </div>
  );
}
