-- Advisory fix: private.is_admin() was created without a pinned search_path,
-- unlike the other two helper functions. A mutable search_path on a function
-- reachable from RLS policies is a privilege-escalation vector.
create or replace function private.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;
