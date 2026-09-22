export type Category = {
  slug: string
  name: string
  productCount: number
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  categorySlug: string
  rating: number
  reviewCount: number
  imageSeed: string
  badge?: "Bestseller" | "New" | "Sale"
}

export const categories: Category[] = [
  { slug: "smartphones", name: "Smartphones", productCount: 14 },
  { slug: "laptops", name: "Laptops", productCount: 9 },
  { slug: "headphones", name: "Headphones", productCount: 21 },
  { slug: "tablets", name: "Tablets", productCount: 7 },
  { slug: "accessories", name: "Accessories", productCount: 38 },
]

export const products: Product[] = [
  {
    id: "1",
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    description: "6.3-inch display, A18 Pro chip, 5x telephoto camera",
    price: 45900,
    categorySlug: "smartphones",
    rating: 4.8,
    reviewCount: 312,
    imageSeed: "iphone-16-pro",
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "galaxy-s25",
    name: "Samsung Galaxy S25",
    description: "6.2-inch display, Snapdragon 8 Elite, 12GB RAM",
    price: 32900,
    categorySlug: "smartphones",
    rating: 4.6,
    reviewCount: 198,
    imageSeed: "galaxy-s25",
  },
  {
    id: "3",
    slug: "pixel-9-pro",
    name: "Google Pixel 9 Pro",
    description: "AI-powered camera with pro-grade image processing",
    price: 36500,
    categorySlug: "smartphones",
    rating: 4.5,
    reviewCount: 76,
    imageSeed: "pixel-9-pro",
    badge: "New",
  },
  {
    id: "4",
    slug: "macbook-air-m3",
    name: "MacBook Air M3",
    description: "15-inch display, 16GB RAM, 512GB SSD, 18-hour battery",
    price: 44900,
    categorySlug: "laptops",
    rating: 4.9,
    reviewCount: 421,
    imageSeed: "macbook-air-m3",
    badge: "Bestseller",
  },
  {
    id: "5",
    slug: "rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14",
    description: "RTX 4070, Ryzen 9, 165Hz display, built for gaming",
    price: 52900,
    categorySlug: "laptops",
    rating: 4.7,
    reviewCount: 89,
    imageSeed: "rog-zephyrus-g14",
  },
  {
    id: "6",
    slug: "airpods-pro-2",
    name: "AirPods Pro 2",
    description: "Active noise cancellation, USB-C charging",
    price: 8990,
    compareAtPrice: 9990,
    categorySlug: "headphones",
    rating: 4.8,
    reviewCount: 567,
    imageSeed: "airpods-pro-2",
    badge: "Sale",
  },
  {
    id: "7",
    slug: "sony-wh1000xm6",
    name: "Sony WH-1000XM6",
    description: "Over-ear headphones with best-in-class noise cancelling, 30-hour battery",
    price: 11900,
    categorySlug: "headphones",
    rating: 4.9,
    reviewCount: 134,
    imageSeed: "sony-wh1000xm6",
    badge: "New",
  },
  {
    id: "8",
    slug: "ipad-air-m2",
    name: "iPad Air M2",
    description: "13-inch display, M2 chip, supports Apple Pencil Pro",
    price: 33900,
    categorySlug: "tablets",
    rating: 4.7,
    reviewCount: 203,
    imageSeed: "ipad-air-m2",
  },
  {
    id: "9",
    slug: "galaxy-tab-s10",
    name: "Samsung Galaxy Tab S10",
    description: "12.4-inch AMOLED display with S Pen included",
    price: 28500,
    categorySlug: "tablets",
    rating: 4.4,
    reviewCount: 58,
    imageSeed: "galaxy-tab-s10",
  },
  {
    id: "10",
    slug: "anker-737-powerbank",
    name: "Anker 737 Power Bank 140W",
    description: "24,000mAh battery pack with 140W fast charging",
    price: 2490,
    compareAtPrice: 2990,
    categorySlug: "accessories",
    rating: 4.6,
    reviewCount: 312,
    imageSeed: "anker-737",
    badge: "Sale",
  },
  {
    id: "11",
    slug: "mx-master-3s",
    name: "Logitech MX Master 3S",
    description: "Silent-click mouse with 8000 DPI sensor",
    price: 3290,
    categorySlug: "accessories",
    rating: 4.8,
    reviewCount: 441,
    imageSeed: "mx-master-3s",
    badge: "Bestseller",
  },
]

export function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug
}

export function formatTHB(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount)
}
