-- Foreign keys
create index products_category_id_idx      on public.products      (category_id);
create index product_images_product_id_idx on public.product_images (product_id);
create index order_items_order_id_idx      on public.order_items   (order_id);
create index order_items_product_id_idx    on public.order_items   (product_id);

-- Order history: "my orders, newest first" (composite index also serves
-- plain customer_id lookups, so the non-composite orders_customer_id_idx
-- is intentionally omitted per db-spec.md section 6)
create index orders_customer_ordered_at_idx on public.orders (customer_id, ordered_at desc);
