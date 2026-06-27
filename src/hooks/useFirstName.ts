import type { User } from '@supabase/supabase-js';
import type { Profile } from '../types/profile';

export function getFirstName(profile: Profile | null, user: User | null): string {
  const displayName = profile?.full_name ?? user?.user_metadata.full_name ?? user?.user_metadata.name ?? user?.email ?? 'there';
  const [firstName] = displayName.trim().split(/\s+/);

  return firstName || 'there';
}
