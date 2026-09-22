"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { categoryName, formatTHB, type Product } from "@/lib/mock-data"

export function FeaturedProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const [added, setAdded] = useState(false)

  return (
    <Card className={`group relative gap-0 overflow-hidden py-0 ${className ?? ""}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={`https://picsum.photos/seed/${product.imageSeed}-lg/800/1000`}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && <Badge className="absolute left-4 top-4">{product.badge}</Badge>}
      </div>
      <div className="flex flex-col gap-2 p-6">
        <span className="text-xs text-muted-foreground">{categoryName(product.categorySlug)}</span>
        <h3 className="font-heading text-xl font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-semibold text-foreground [font-variant-numeric:tabular-nums]">
            {formatTHB(product.price)}
          </span>
          <Button
            variant={added ? "secondary" : "outline"}
            disabled={added}
            onClick={() => setAdded(true)}
            aria-label={added ? `Added ${product.name} to cart` : `Add ${product.name} to cart`}
          >
            {added ? "Added" : "Add to cart"}
            {added ? <Check data-icon="inline-end" /> : <Plus data-icon="inline-end" />}
          </Button>
        </div>
      </div>
    </Card>
  )
}
