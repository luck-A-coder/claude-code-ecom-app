import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import {
  categories,
  products,
  formatTHB,
  categoryName,
  type Product,
} from "@/lib/mock-data"

const bestsellers = products.filter((p) => p.badge === "ขายดี")
const deals = products.filter((p) => p.compareAtPrice)
const newArrivalsOrder = ["7", "3", "9", "5", "2", "8"]
const newArrivals = newArrivalsOrder
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p))

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:pt-16 lg:pb-24 lg:px-8">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <Badge variant="secondary" className="w-fit gap-1.5">
            <Sparkles className="size-3" data-icon="inline-start" />
            คัดสินค้าใหม่ทุกสัปดาห์
          </Badge>
          <h1 className="max-w-lg font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            อุปกรณ์ไอทีที่ใช่ ส่งถึงมือใน 24 ชั่วโมง
          </h1>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            สบายTech คัดสรรสมาร์ทโฟน แล็ปท็อป และแกดเจ็ตของแท้ พร้อมทีมงานที่ทดสอบสินค้าเองก่อนวางขายทุกชิ้น
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#bestsellers" className={buttonVariants({ size: "lg" })}>
              เลือกซื้อสินค้าขายดี
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="#categories"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              ดูหมวดหมู่ทั้งหมด
            </Link>
          </div>
          <div className="mt-2 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-tertiary text-tertiary" />
              <span className="font-medium text-foreground">4.8</span>
              <span>จาก 12,400+ รีวิว</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              <span>รับประกันศูนย์ไทย 1 ปี</span>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl bg-muted sm:max-w-lg">
            <Image
              src="https://picsum.photos/seed/hero-iphone-16-pro/900/1100"
              alt="iPhone 16 Pro วางอยู่บนโต๊ะไม้"
              fill
              priority
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-4 bottom-10 aspect-square w-32 overflow-hidden rounded-lg ring-4 ring-background sm:-left-8 sm:w-40">
            <Image
              src="https://picsum.photos/seed/hero-airpods-pro-2/400/400"
              alt="AirPods Pro 2 ในเคสชาร์จ"
              fill
              sizes="10rem"
              className="object-cover"
            />
          </div>
          <Card className="absolute -bottom-6 right-2 w-44 gap-1 py-3 shadow-lg sm:right-6">
            <div className="flex items-center justify-between px-(--card-spacing)">
              <span className="text-xs text-muted-foreground">iPhone 16 Pro</span>
              <Badge variant="secondary" className="text-[10px]">ขายดี</Badge>
            </div>
            <span className="px-(--card-spacing) text-lg font-semibold text-foreground [font-variant-numeric:tabular-nums]">
              {formatTHB(45900)}
            </span>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">ช้อปตามหมวดหมู่</h2>
            <p className="mt-1 text-sm text-muted-foreground">ครบทุกอุปกรณ์ที่ใช้ในชีวิตประจำวัน</p>
          </div>
        </div>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href="#bestsellers"
              className="group relative aspect-[4/5] w-36 shrink-0 snap-start overflow-hidden rounded-lg bg-muted sm:w-auto"
            >
              <Image
                src={`https://picsum.photos/seed/category-${category.slug}/400/500`}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 144px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
                <span className="text-sm font-medium text-white">{category.name}</span>
                <span className="text-xs text-white/70">{category.productCount} รายการ</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section id="bestsellers" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">สินค้าขายดี</h2>
            <p className="mt-1 text-sm text-muted-foreground">สินค้าที่ลูกค้าสั่งซื้อซ้ำมากที่สุด</p>
          </div>
          <Link
            href="#new-arrivals"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            ดูสินค้ามาใหม่
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {bestsellers[0] && (
            <Card className="group relative gap-0 overflow-hidden py-0 lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={`https://picsum.photos/seed/${bestsellers[0].imageSeed}-lg/800/1000`}
                  alt={bestsellers[0].name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4">{bestsellers[0].badge}</Badge>
              </div>
              <div className="flex flex-col gap-2 p-6">
                <span className="text-xs text-muted-foreground">
                  {categoryName(bestsellers[0].categorySlug)}
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {bestsellers[0].name}
                </h3>
                <p className="text-sm text-muted-foreground">{bestsellers[0].description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-semibold text-foreground [font-variant-numeric:tabular-nums]">
                    {formatTHB(bestsellers[0].price)}
                  </span>
                  <Button variant="outline">
                    ดูรายละเอียด
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:col-span-7">
            {bestsellers.slice(1).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section id="deals" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl">
          <div className="relative h-72 w-full sm:h-80">
            <Image
              src="https://picsum.photos/seed/promo-banner-week/1600/700"
              alt="โปรโมชั่นประจำสัปดาห์"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          </div>
          <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center gap-3 p-8 sm:p-12">
            <Badge variant="destructive" className="w-fit">ดีลประจำสัปดาห์</Badge>
            <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              ลดสูงสุด 1,000 บาท กับหูฟังและพาวเวอร์แบงค์
            </h2>
            <p className="text-sm text-white/80">ตั้งแต่วันนี้ถึง 30 กันยายน หรือจนกว่าสินค้าจะหมด</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section
        id="new-arrivals"
        className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">มาใหม่ล่าสุด</h2>
            <p className="mt-1 text-sm text-muted-foreground">เพิ่งเข้าสต๊อกในสัปดาห์นี้</p>
          </div>
        </div>
        <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} className="w-56 shrink-0 snap-start" />
          ))}
        </div>
      </section>
    </>
  )
}
