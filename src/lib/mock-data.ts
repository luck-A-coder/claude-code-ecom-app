export type Category = {
  slug: string
  name: string
  englishName: string
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
  badge?: "ขายดี" | "มาใหม่" | "ลดราคา"
}

export const categories: Category[] = [
  { slug: "smartphones", name: "สมาร์ทโฟน", englishName: "Smartphones", productCount: 14 },
  { slug: "laptops", name: "แล็ปท็อป", englishName: "Laptops", productCount: 9 },
  { slug: "headphones", name: "หูฟัง", englishName: "Headphones", productCount: 21 },
  { slug: "tablets", name: "แท็บเล็ต", englishName: "Tablets", productCount: 7 },
  { slug: "accessories", name: "อุปกรณ์เสริม", englishName: "Accessories", productCount: 38 },
]

export const products: Product[] = [
  {
    id: "1",
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    description: "จอ 6.3 นิ้ว ชิป A18 Pro กล้องเทเลโฟโต้ 5x",
    price: 45900,
    categorySlug: "smartphones",
    rating: 4.8,
    reviewCount: 312,
    imageSeed: "iphone-16-pro",
    badge: "ขายดี",
  },
  {
    id: "2",
    slug: "galaxy-s25",
    name: "Samsung Galaxy S25",
    description: "จอ 6.2 นิ้ว ชิป Snapdragon 8 Elite RAM 12GB",
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
    description: "กล้อง AI ประมวลผลภาพระดับมืออาชีพ",
    price: 36500,
    categorySlug: "smartphones",
    rating: 4.5,
    reviewCount: 76,
    imageSeed: "pixel-9-pro",
    badge: "มาใหม่",
  },
  {
    id: "4",
    slug: "macbook-air-m3",
    name: "MacBook Air M3",
    description: "จอ 15 นิ้ว RAM 16GB SSD 512GB แบตอึด 18 ชม.",
    price: 44900,
    categorySlug: "laptops",
    rating: 4.9,
    reviewCount: 421,
    imageSeed: "macbook-air-m3",
    badge: "ขายดี",
  },
  {
    id: "5",
    slug: "rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14",
    description: "RTX 4070 Ryzen 9 จอ 165Hz สำหรับเล่นเกม",
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
    description: "ตัดเสียงรบกวนแอคทีฟ ชาร์จ USB-C",
    price: 8990,
    compareAtPrice: 9990,
    categorySlug: "headphones",
    rating: 4.8,
    reviewCount: 567,
    imageSeed: "airpods-pro-2",
    badge: "ลดราคา",
  },
  {
    id: "7",
    slug: "sony-wh1000xm6",
    name: "Sony WH-1000XM6",
    description: "หูฟังครอบหู ตัดเสียงระดับแชมป์ แบต 30 ชม.",
    price: 11900,
    categorySlug: "headphones",
    rating: 4.9,
    reviewCount: 134,
    imageSeed: "sony-wh1000xm6",
    badge: "มาใหม่",
  },
  {
    id: "8",
    slug: "ipad-air-m2",
    name: "iPad Air M2",
    description: "จอ 13 นิ้ว ชิป M2 รองรับ Apple Pencil Pro",
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
    description: "จอ AMOLED 12.4 นิ้ว พร้อมปากกา S Pen",
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
    description: "แบตสำรอง 24,000mAh จ่ายไฟเร็วสุด 140W",
    price: 2490,
    compareAtPrice: 2990,
    categorySlug: "accessories",
    rating: 4.6,
    reviewCount: 312,
    imageSeed: "anker-737",
    badge: "ลดราคา",
  },
  {
    id: "11",
    slug: "mx-master-3s",
    name: "Logitech MX Master 3S",
    description: "เมาส์ไร้เสียง เซนเซอร์ 8000 DPI",
    price: 3290,
    categorySlug: "accessories",
    rating: 4.8,
    reviewCount: 441,
    imageSeed: "mx-master-3s",
    badge: "ขายดี",
  },
]

export function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug
}

export function formatTHB(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount)
}
