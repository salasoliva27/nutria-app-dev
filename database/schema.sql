-- nutrIA conversations table
-- Run this in your Supabase SQL editor

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  messages jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists conversations_user_idx on conversations(user_id);

alter table conversations enable row level security;

create policy "own conversation" on conversations
  for all using (auth.uid() = user_id);

-- nutrIA patient profiles table
-- Populated automatically by profile extraction after intake conversation

create table if not exists patient_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  name text,
  age integer,
  sex text,
  weight_kg numeric,
  height_cm numeric,
  wrist_cm numeric,
  bmi numeric,
  goal text,
  conditions text[] default '{}',
  medications text[] default '{}',
  allergies text[] default '{}',
  activity_level text,
  intake_complete boolean default false,
  raw jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists patient_profiles_user_idx on patient_profiles(user_id);

alter table patient_profiles enable row level security;

create policy "own profile" on patient_profiles
  for all using (auth.uid() = user_id);
