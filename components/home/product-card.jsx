import { HeartIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function ProductCard({ product }) {
  return (
    <a
      href="#"
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
      <div className="relative">
        <div
          className={cn(
            "flex aspect-[4/3] items-center justify-center bg-gradient-to-br",
            product.gradient
          )}>
          <product.Icon className="size-16 text-white/90" strokeWidth={1.25} />
        </div>

        {product.featured && (
          <span className="absolute bottom-2 left-0 bg-[#ffce32] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#002f34]">
            FEATURED
          </span>
        )}

        {product.elite && (
          <span className="absolute top-0 right-0 rounded-bl-md bg-[#3a77ff] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
            ★ ELITE
          </span>
        )}

        <button
          aria-label="Add to wishlist"
          className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#002f34] shadow-sm transition-colors hover:bg-white">
          <HeartIcon className="size-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#002f34]">
            {product.price}
          </span>
          {product.meta && (
            <span className="truncate text-xs text-muted-foreground">
              {product.meta}
            </span>
          )}
        </div>

        <p className="line-clamp-1 text-sm text-[#002f34]">{product.title}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-[11px] text-muted-foreground uppercase">
          <span className="truncate">{product.location}</span>
          <span className="shrink-0">{product.date}</span>
        </div>
      </div>
    </a>
  );
}
