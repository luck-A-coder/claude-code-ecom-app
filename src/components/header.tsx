"use client"

import Link from "next/link"
import { Menu, Search, ShoppingBag, User, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { categories } from "@/lib/mock-data"

const primaryNav = [
  { label: "สินค้าขายดี", href: "#bestsellers" },
  { label: "มาใหม่", href: "#new-arrivals" },
  { label: "หมวดหมู่ทั้งหมด", href: "#categories" },
  { label: "โปรโมชั่น", href: "#deals" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="hidden items-center justify-center gap-2 bg-foreground py-2 text-xs text-background sm:flex">
        <Truck className="size-3.5" />
        <span>จัดส่งฟรีทุกออเดอร์ตั้งแต่ 1,500 บาท · รับสินค้าภายใน 1–2 วันทำการ</span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="lg:hidden" />}
          >
            <Menu />
            <span className="sr-only">เปิดเมนู</span>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>เมนู</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-6">
              {primaryNav.map((item) => (
                <SheetClose
                  key={item.href}
                  render={
                    <Link
                      href={item.href}
                      className="rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-2 flex flex-col gap-1 border-t border-border px-6 pt-4">
              <span className="px-3 text-xs font-medium text-muted-foreground">หมวดหมู่</span>
              {categories.map((c) => (
                <SheetClose
                  key={c.slug}
                  render={
                    <Link
                      href="#categories"
                      className="rounded-2xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    />
                  }
                >
                  {c.name}
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-2 flex shrink-0 items-baseline gap-0.5">
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">สบาย</span>
          <span className="font-heading text-lg font-semibold tracking-tight text-primary">Tech</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <InputGroup className="hidden w-56 sm:flex md:w-72">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="ค้นหาสินค้า, แบรนด์..." />
          </InputGroup>

          <Button variant="ghost" size="icon" className="sm:hidden" aria-label="ค้นหา">
            <Search />
          </Button>

          <Button variant="ghost" size="icon" aria-label="บัญชีของฉัน">
            <User />
          </Button>

          <Button variant="ghost" size="icon" className="relative" aria-label="ตะกร้าสินค้า">
            <ShoppingBag />
            <Badge className="absolute -right-1 -top-1 size-4 justify-center rounded-full p-0 text-[10px]">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
