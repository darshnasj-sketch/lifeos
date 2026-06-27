import { AppShell, TopBar } from '../components/layout/AppShell';
import { Panel } from '../components/ui/Panel';
import { useAuth } from '../hooks/useAuth';
import { getFirstName } from '../hooks/useFirstName';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const { user, profile } = useAuth();

  return (
    <AppShell>
      <TopBar greeting={getFirstName(profile, user)} />
      <Panel className="min-h-[360px]">
        <p className="text-xs font-bold uppercase text-life-muted">LifeOS</p>
        <h2 className="mt-1 text-2xl font-black">{title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-life-muted">{description}</p>
      </Panel>
    </AppShell>
  );
}
