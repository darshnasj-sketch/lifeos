import type { ButtonHTMLAttributes } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function AuthButton({ variant = 'primary', className = '', ...props }: AuthButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-life-ink text-white hover:bg-life-ink/90'
      : 'border border-life-line bg-white text-life-ink hover:bg-[#f5faf7]';

  return (
    <button
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-[13px] text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
      {...props}
    />
  );
}
