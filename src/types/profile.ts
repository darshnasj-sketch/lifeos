export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProfileInput {
  id: string;
  full_name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
}
