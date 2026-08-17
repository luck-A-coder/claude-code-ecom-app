create type public.order_status as enum (
  'pending',    -- created, not yet paid
  'paid',       -- payment captured
  'shipped',    -- handed to carrier
  'delivered',  -- received by customer
  'cancelled'   -- terminal; may occur from pending or paid
);

create table public.categories (
  id   bigint generated always as identity primary key,
  name text not null,
  constraint categories_name_key unique (name)
);

create table public.products (
  id          bigint generated always as identity primary key,
  name        text not null,
  description text,
  price       numeric(10,2) not null,
  category_id bigint references public.categories (id) on delete set null,
  constraint products_price_non_negative check (price >= 0)
);

create table public.product_images (
  id         bigint generated always as identity primary key,
  product_id bigint not null references public.products (id) on delete cascade,
  image_name text not null,
  created_at timestamptz not null default now()
);

create table public.customers (
  id      bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  name    text,
  address text,
  phone   text,
  constraint customers_user_id_key unique (user_id)
);

create table public.orders (
  id           bigint generated always as identity primary key,
  ordered_at   timestamptz not null default now(),
  customer_id  bigint not null references public.customers (id) on delete restrict,
  status       public.order_status not null default 'pending',
  total_amount numeric(10,2),
  constraint orders_total_amount_non_negative check (total_amount >= 0)
);

create table public.order_items (
  id         bigint generated always as identity primary key,
  order_id   bigint not null references public.orders (id) on delete cascade,
  product_id bigint not null references public.products (id) on delete restrict,
  quantity   integer not null,
  price      numeric(10,2) not null,
  constraint order_items_quantity_positive   check (quantity > 0),
  constraint order_items_price_non_negative  check (price >= 0),
  constraint order_items_order_product_key   unique (order_id, product_id)
);
