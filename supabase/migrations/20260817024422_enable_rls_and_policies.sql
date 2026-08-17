-- Enable RLS everywhere
alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.customers      enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;

-- Helper functions (private schema, security definer for the two that
-- need to bridge auth.uid() through joins)
create schema if not exists private;

-- The caller's customer row id, or null if they have no profile.
create or replace function private.current_customer_id()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select c.id
  from public.customers c
  where c.user_id = (select auth.uid());
$$;

-- Does the caller own this order?
create or replace function private.owns_order(p_order_id bigint)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.orders o
    join public.customers c on c.id = o.customer_id
    where o.id = p_order_id
      and c.user_id = (select auth.uid())
  );
$$;

-- Is the caller an admin? Role lives in the JWT's app_metadata,
-- which users cannot edit themselves (unlike user_metadata).
create or replace function private.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

revoke execute on function private.current_customer_id()     from public, anon, authenticated;
revoke execute on function private.owns_order(bigint)        from public, anon, authenticated;
revoke execute on function private.is_admin()                from public, anon, authenticated;

-- Catalog: public read, admin write
create policy categories_select_public
  on public.categories for select to anon, authenticated using (true);

create policy categories_admin_all
  on public.categories for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

create policy products_select_public
  on public.products
  for select
  to anon, authenticated
  using (true);

create policy products_admin_all
  on public.products
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create policy product_images_select_public
  on public.product_images for select to anon, authenticated using (true);

create policy product_images_admin_all
  on public.product_images for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

-- customers: a user reads and edits exactly one row, their own
create policy customers_select_own
  on public.customers
  for select
  to authenticated
  using ((select auth.uid()) = user_id or (select private.is_admin()));

create policy customers_insert_own
  on public.customers
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy customers_update_own
  on public.customers
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy customers_admin_all
  on public.customers
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- orders: owner can read/insert; updates (status transitions) are admin-only
create policy orders_select_own
  on public.orders
  for select
  to authenticated
  using (
    customer_id = (select private.current_customer_id())
    or (select private.is_admin())
  );

create policy orders_insert_own
  on public.orders
  for insert
  to authenticated
  with check (customer_id = (select private.current_customer_id()));

create policy orders_admin_all
  on public.orders
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- order_items: owner can read/insert via owns_order(); immutable otherwise
create policy order_items_select_own
  on public.order_items
  for select
  to authenticated
  using (
    (select private.owns_order(order_id))
    or (select private.is_admin())
  );

create policy order_items_insert_own
  on public.order_items
  for insert
  to authenticated
  with check ((select private.owns_order(order_id)));

create policy order_items_admin_all
  on public.order_items
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));
