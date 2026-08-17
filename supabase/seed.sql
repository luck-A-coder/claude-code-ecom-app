-- =============================================
-- Seed data for E-Commerce DB (per specs/db-spec.md §8)
-- Re-runnable: categories/products/images key off natural names;
-- customers keys off unique user_id; orders/order_items are guarded
-- by a "does this customer already have orders" check.
--
-- Real auth.users created via Dashboard (Authentication > Users):
--   admin@example.com   b47e2965-84eb-4953-a766-1b0387a5934d
--   user@example.com    c496f72c-95ee-4edd-a370-517a15b6f033
-- =============================================

-- 0. Admin role (app_metadata, per db-spec.md §7.1 private.is_admin())
update auth.users
set raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', 'admin')
where id = 'b47e2965-84eb-4953-a766-1b0387a5934d';

-- 1. categories
insert into public.categories (name) values
  ('สมาร์ทโฟน'),
  ('แล็ปท็อป'),
  ('หูฟัง'),
  ('แท็บเล็ต'),
  ('อุปกรณ์เสริม')
on conflict (name) do nothing;

-- 2. products
insert into public.products (name, description, price, category_id)
select v.name, v.description, v.price, c.id
from (values
  ('iPhone 16 Pro',        'สมาร์ทโฟน Apple จอ 6.3 นิ้ว ชิป A18 Pro',                45900.00, 'สมาร์ทโฟน'),
  ('Samsung Galaxy S25',   'สมาร์ทโฟน Samsung จอ 6.2 นิ้ว ชิป Snapdragon 8 Elite',   32900.00, 'สมาร์ทโฟน'),
  ('MacBook Air M3',       'แล็ปท็อป Apple จอ 15 นิ้ว RAM 16GB SSD 512GB',           44900.00, 'แล็ปท็อป'),
  ('AirPods Pro 2',        'หูฟังไร้สาย Apple ตัดเสียงรบกวน USB-C',                  8990.00,  'หูฟัง'),
  ('iPad Air M2',          'แท็บเล็ต Apple จอ 13 นิ้ว ชิป M2',                       33900.00, 'แท็บเล็ต')
) as v(name, description, price, category_name)
join public.categories c on c.name = v.category_name
where not exists (
  select 1 from public.products p where p.name = v.name
);

-- 3. product_images
insert into public.product_images (product_id, image_name)
select p.id, v.image_name
from (values
  ('iPhone 16 Pro',      'iphone16pro-front.jpg'),
  ('iPhone 16 Pro',      'iphone16pro-back.jpg'),
  ('Samsung Galaxy S25', 'galaxy-s25-front.jpg'),
  ('MacBook Air M3',     'macbook-air-m3-silver.jpg'),
  ('AirPods Pro 2',      'airpods-pro2-case.jpg')
) as v(product_name, image_name)
join public.products p on p.name = v.product_name
where not exists (
  select 1
  from public.product_images pi
  where pi.product_id = p.id and pi.image_name = v.image_name
);

-- 4. customers
-- user_id must reference a real auth.users(id); using the regular
-- test user created via the Dashboard (see header comment).
insert into public.customers (user_id, name, address, phone)
values (
  'c496f72c-95ee-4edd-a370-517a15b6f033',
  'สมชาย ใจดี',
  '123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
  '081-234-5678'
)
on conflict (user_id) do nothing;

-- 5 & 6. orders + order_items
-- Guarded: only runs if this customer has no orders yet, since
-- orders have no natural key to de-duplicate against on re-run.
do $$
declare
  v_customer_id bigint;
  v_order_1 bigint;
  v_order_2 bigint;
  v_order_3 bigint;
  v_order_4 bigint;
  v_order_5 bigint;
  v_iphone bigint;
  v_galaxy bigint;
  v_macbook bigint;
  v_airpods bigint;
  v_ipad bigint;
begin
  select id into v_customer_id
  from public.customers
  where user_id = 'c496f72c-95ee-4edd-a370-517a15b6f033';

  if not exists (select 1 from public.orders where customer_id = v_customer_id) then
    select id into v_iphone  from public.products where name = 'iPhone 16 Pro';
    select id into v_galaxy  from public.products where name = 'Samsung Galaxy S25';
    select id into v_macbook from public.products where name = 'MacBook Air M3';
    select id into v_airpods from public.products where name = 'AirPods Pro 2';
    select id into v_ipad    from public.products where name = 'iPad Air M2';

    insert into public.orders (ordered_at, customer_id, status, total_amount)
    values ('2026-06-01 09:30:00', v_customer_id, 'delivered', 100790.00)
    returning id into v_order_1;

    insert into public.orders (ordered_at, customer_id, status, total_amount)
    values ('2026-06-01 14:15:00', v_customer_id, 'delivered', 53890.00)
    returning id into v_order_2;

    insert into public.orders (ordered_at, customer_id, status, total_amount)
    values ('2026-06-02 10:00:00', v_customer_id, 'paid', 41890.00)
    returning id into v_order_3;

    insert into public.orders (ordered_at, customer_id, status, total_amount)
    values ('2026-06-02 16:45:00', v_customer_id, 'shipped', 78800.00)
    returning id into v_order_4;

    insert into public.orders (ordered_at, customer_id, status, total_amount)
    values ('2026-06-03 08:20:00', v_customer_id, 'paid', 79800.00)
    returning id into v_order_5;

    insert into public.order_items (order_id, product_id, quantity, price) values
      (v_order_1, v_iphone,  2, 45900.00),
      (v_order_1, v_airpods, 1, 8990.00),
      (v_order_2, v_macbook, 1, 44900.00),
      (v_order_2, v_airpods, 1, 8990.00),
      (v_order_3, v_galaxy,  1, 32900.00),
      (v_order_3, v_airpods, 1, 8990.00),
      (v_order_4, v_macbook, 1, 44900.00),
      (v_order_4, v_ipad,    1, 33900.00),
      (v_order_5, v_iphone,  1, 45900.00),
      (v_order_5, v_ipad,    1, 33900.00);
  end if;
end $$;
