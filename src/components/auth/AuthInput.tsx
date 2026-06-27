import type { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AuthInput({ label, id, ...props }: AuthInputProps) {
  return (
    <label className="grid gap-2 text-xs font-bold text-life-muted" htmlFor={id}>
      {label}
      <input
        id={id}
        className="h-12 rounded-xl border border-life-line bg-white px-3 text-sm font-semibold text-life-ink outline-none transition placeholder:text-life-muted/60 focus:border-life-mintDeep focus:ring-4 focus:ring-life-mintDeep/10"
        {...props}
      />
    </label>
  );
}
