# LifeOS

LifeOS is a mobile-first React app with Supabase authentication, protected routes, profile-backed greetings, and an iPhone-inspired dashboard foundation.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router
- Lucide Icons

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Add your Supabase project values:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the app:

```bash
npm run dev
```

The app boots without hardcoded keys. Authentication requires valid Supabase environment variables.

## Supabase Auth

Enable these providers in Supabase:

- Email and password
- Google OAuth

Add these redirect URLs in Supabase Auth settings:

```text
http://localhost:5173
http://localhost:5173/login
```

For production, add your deployed domain as well.

## Database Setup

Run this SQL in the Supabase SQL editor.

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
```

The app also calls `ensureProfile` after login/sign-up so profiles are repaired if a trigger was added after users already existed.

## Routes

- `/login`
- `/signup`
- `/forgot-password`
- `/`
- `/money`
- `/pantry`
- `/journal`
- `/ai`

All app routes are protected. Unauthenticated users are redirected to `/login`.

## Project Structure

```text
src/
  assets/
  components/
    auth/
    dashboard/
    layout/
    ui/
  hooks/
  lib/
  pages/
  services/
  types/
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
