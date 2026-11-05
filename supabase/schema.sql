create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  username_lower text not null unique,
  created_at timestamptz not null default now(),
  last_login_at timestamptz,
  streak integer not null default 1 check (streak >= 0),
  last_active_date date not null default current_date,
  last_visited text,
  constraint profiles_username_format
    check (username ~ '^[A-Za-z][A-Za-z0-9_]{3,19}$'),
  constraint profiles_username_lower_format
    check (username_lower ~ '^[a-z][a-z0-9_]{3,19}$')
);

alter table public.profiles enable row level security;
grant select on public.profiles to authenticated;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_username text := new.raw_user_meta_data ->> 'username';
begin
  if new_username is null or new_username !~ '^[A-Za-z][A-Za-z0-9_]{3,19}$' then
    raise exception 'A valid username is required';
  end if;

  insert into public.profiles (id, username, username_lower)
  values (new.id, new_username, lower(new_username));

  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();

create or replace function public.is_username_available(candidate text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select candidate ~* '^[a-z][a-z0-9_]{3,19}$'
    and not exists (
      select 1
      from public.profiles
      where username_lower = lower(candidate)
    );
$$;

revoke all on function public.is_username_available(text) from public;
grant execute on function public.is_username_available(text) to anon, authenticated;

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;
grant select, insert, update on public.user_progress to authenticated;

drop policy if exists "Users can read their own progress" on public.user_progress;
create policy "Users can read their own progress"
  on public.user_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own progress" on public.user_progress;
create policy "Users can create their own progress"
  on public.user_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own progress" on public.user_progress;
create policy "Users can update their own progress"
  on public.user_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
