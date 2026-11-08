'use client'

import type { Product } from '@/types/product'
import { useCartStore } from '@/store/zustand/useCartStore'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <img
        src={product.image}
        alt={product.title}
        className="mb-3 h-40 w-full rounded object-cover"
      />
      <h2 className="font-semibold text-slate-900">{product.title}</h2>
      <p className="text-sm text-slate-500">{product.description}</p>
      <p className="mt-2 font-bold text-indigo-600">${product.price}</p>
      <button
        onClick={() => addItem(product)}
        className="mt-3 w-full rounded bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        В корзину
      </button>
    </div>
  )
}