import type { User } from '@supabase/supabase-js';
import { requireSupabase } from '../lib/supabase';
import type { Profile, ProfileInput } from '../types/profile';

function profileFromUser(user: User, fullName?: string): ProfileInput {
  const metadata = user.user_metadata;

  return {
    id: user.id,
    full_name: fullName ?? metadata.full_name ?? metadata.name ?? null,
    email: user.email ?? null,
    avatar_url: metadata.avatar_url ?? metadata.picture ?? null,
  };
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, avatar_url, created_at')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function upsertProfile(input: ProfileInput): Promise<Profile> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .upsert(input, { onConflict: 'id' })
    .select('id, full_name, email, avatar_url, created_at')
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function ensureProfile(user: User, fullName?: string): Promise<Profile> {
  const existing = await getProfile(user.id);

  if (existing) {
    return existing;
  }

  return upsertProfile(profileFromUser(user, fullName));
}
