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
