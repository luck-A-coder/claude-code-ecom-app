"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Plus, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { categoryName, formatTHB, type Product } from "@/lib/mock-data"
import { cn } from "cn"

const badgeVariant: Record<NonNullable<Product["badge"]>, "default" | "secondary" | "destructive"> = {
  ขายดี: "secondary",
  มาใหม่: "default",
  ลดราคา: "destructive",
}

export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const [added, setAdded] = useState(false)

  return (
    <Card
      className={cn(
        "group/product relative gap-3 shadow-subtle transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-[3px] hover:shadow-product-hover",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={`https://picsum.photos/seed/${product.imageSeed}/640/640`}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover/product:scale-105"
        />
        {product.badge && (
          <Badge
            variant={badgeVariant[product.badge]}
            className="absolute left-3 top-3"
          >
            {product.badge}
          </Badge>
        )}
        <button
          type="button"
          aria-label={added ? `เพิ่ม ${product.name} ลงตะกร้าแล้ว` : `เพิ่ม ${product.name} ลงตะกร้า`}
          onClick={() => setAdded(true)}
          disabled={added}
          className={cn(
            "absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-md ring-1 ring-foreground/10 transition-all duration-200 group-hover/product:translate-y-0 group-hover/product:opacity-100 hover:bg-primary hover:text-primary-foreground disabled:translate-y-0 disabled:opacity-100",
            added && "bg-primary text-primary-foreground"
          )}
        >
          {added ? <Check className="size-4" /> : <Plus className="size-4" />}
        </button>
      </div>

      <div className="flex flex-col gap-1 px-(--card-spacing)">
        <span className="text-xs text-muted-foreground">{categoryName(product.categorySlug)}</span>
        <h3 className="font-heading text-sm font-medium text-foreground">{product.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{product.description}</p>

        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-tertiary text-tertiary" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div className="mt-1 flex items-baseline gap-2 [font-variant-numeric:tabular-nums]">
          <span className="text-base font-semibold text-foreground">{formatTHB(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatTHB(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
