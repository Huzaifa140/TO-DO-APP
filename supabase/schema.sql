-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> Run

create table if not exists public.todos (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title        text not null check (char_length(title) between 1 and 200),
  is_completed boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists todos_user_id_idx on public.todos (user_id, created_at desc);

-- Row Level Security: har user sirf apne todos dekh / badal sakta hai
alter table public.todos enable row level security;

drop policy if exists "Users can read own todos" on public.todos;
drop policy if exists "Users can insert own todos" on public.todos;
drop policy if exists "Users can update own todos" on public.todos;
drop policy if exists "Users can delete own todos" on public.todos;

create policy "Users can read own todos"
  on public.todos for select
  using (auth.uid() = user_id);

create policy "Users can insert own todos"
  on public.todos for insert
  with check (auth.uid() = user_id);

create policy "Users can update own todos"
  on public.todos for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own todos"
  on public.todos for delete
  using (auth.uid() = user_id);
