import type { ReactNode } from 'react';

const toneClasses = {
  mint: 'bg-life-mint text-life-mintDeep',
  blue: 'bg-life-blue text-life-blueDeep',
  gold: 'bg-life-gold text-life-goldDeep',
  rose: 'bg-life-rose text-life-roseDeep',
};

interface BadgeProps {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
}

export function Badge({ children, tone = 'mint' }: BadgeProps) {
  return (
    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
