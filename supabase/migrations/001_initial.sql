-- Users table
create table if not exists public.users (
  id text primary key,
  name text not null,
  username text,
  photo_url text,
  is_pro boolean default false,
  stripe_customer_id text,
  locale text default 'en',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User progress table
create table if not exists public.user_progress (
  user_id text primary key references public.users(id),
  xp integer default 0,
  streak integer default 0,
  hearts integer default 5,
  completed_lessons integer[] default '{}',
  earned_badges text[] default '{}',
  daily_goal_target integer default 3,
  daily_goal_done integer default 0,
  last_activity_date date default current_date,
  updated_at timestamp with time zone default now()
);

-- Battle results table
create table if not exists public.battle_results (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.users(id),
  challenge_id integer not null,
  opponent_name text,
  user_prompt text,
  won boolean not null,
  xp_earned integer default 0,
  created_at timestamp with time zone default now()
);

-- Payments table
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.users(id),
  stripe_session_id text,
  stripe_customer_id text,
  plan text,
  amount integer,
  currency text default 'usd',
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.user_progress enable row level security;
alter table public.battle_results enable row level security;
alter table public.payments enable row level security;

-- RLS policies (allow all for now, tighten in production)
create policy "Users can read own data" on public.users for select using (true);
create policy "Users can insert own data" on public.users for insert with check (true);
create policy "Users can update own data" on public.users for update using (true);

create policy "Progress read" on public.user_progress for select using (true);
create policy "Progress insert" on public.user_progress for insert with check (true);
create policy "Progress update" on public.user_progress for update using (true);

create policy "Battles read" on public.battle_results for select using (true);
create policy "Battles insert" on public.battle_results for insert with check (true);

create policy "Payments read" on public.payments for select using (true);
create policy "Payments insert" on public.payments for insert with check (true);
create policy "Payments update" on public.payments for update using (true);
