"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Check,
  Truck,
  RotateCcw,
  Headset,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

const trustPoints = [
  { icon: Truck, label: "Free shipping", detail: "On orders over ฿1,500" },
  { icon: RotateCcw, label: "Easy returns", detail: "Within 14 days" },
  { icon: Headset, label: "Support team", detail: "Daily 9am–9pm" },
  { icon: CreditCard, label: "Secure payment", detail: "Cards, PromptPay, 0% installments" },
]

const shopLinks = [
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "All Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
]

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        {trustPoints.map((t) => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-foreground/5">
              <t.icon className="size-4 text-primary" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{t.label}</span>
              <span className="text-xs text-muted-foreground">{t.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">Easy</span>
            <span className="font-heading text-lg font-semibold tracking-tight text-primary">Tech</span>
          </Link>
          <p className="max-w-[38ch] text-sm text-muted-foreground">
            The IT store that hand-picks and tests every product ourselves, shipping fast nationwide since 2019.
          </p>

          <form onSubmit={handleSubscribe} className="flex max-w-sm flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Get discounts and new product updates</span>
            <InputGroup>
              <InputGroupInput
                type="email"
                required
                placeholder="Your email"
                disabled={subscribed}
              />
              <InputGroupAddon align="inline-end">
                <Button
                  type="submit"
                  size="icon-sm"
                  variant={subscribed ? "secondary" : "default"}
                  disabled={subscribed}
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check /> : <ArrowRight />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {subscribed && (
              <span className="text-xs text-muted-foreground">You&apos;re subscribed.</span>
            )}
          </form>

          <div className="mt-1 flex items-center gap-2">
            {[
              { label: "FB", name: "Facebook", href: "https://facebook.com" },
              { label: "IG", name: "Instagram", href: "https://instagram.com" },
              { label: "LN", name: "Line", href: "https://line.me" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex size-9 items-center justify-center rounded-full bg-background text-xs font-semibold tracking-tight text-muted-foreground ring-1 ring-foreground/5 transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-foreground">Shop</span>
          <ul className="flex flex-col gap-2.5">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-foreground">Contact us</span>
          <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href="tel:+6621234567" className="transition-colors hover:text-foreground">
                02-123-4567
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a
                href="mailto:hello@easytech.co.th"
                className="transition-colors hover:text-foreground"
              >
                hello@easytech.co.th
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>388 Exchange Tower, Sukhumvit Rd, Khlong Toei, Bangkok 10110</span>
            </li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} EasyTech. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <span className="cursor-default opacity-70">Privacy Policy</span>
          <span className="cursor-default opacity-70">Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}
