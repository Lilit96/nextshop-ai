'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCartStore, getTotalPrice } from '@/store/zustand/useCartStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const changeQuantity = useCartStore((state) => state.changeQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 dark:bg-slate-900">
        <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Корзина</h1>
        <p className="mb-4 text-slate-500">Корзина пуста.</p>
        <Link href="/" className="font-semibold text-indigo-600">
          Вернуться в каталог
        </Link>
      </main>
    )
  }

  const total = getTotalPrice(items)

  return (
    <main className="min-h-screen bg-slate-50 p-8 dark:bg-slate-900">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Корзина</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-20 w-20 rounded object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900">{product.title}</h2>
                <p className="font-bold text-indigo-600">${product.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(product.id, -1)}
                  className="h-8 w-8 rounded border border-slate-300 text-slate-900"
                >
                  -
                </button>
                <span className="w-6 text-center text-slate-900">{quantity}</span>
                <button
                  onClick={() => changeQuantity(product.id, 1)}
                  className="h-8 w-8 rounded border border-slate-300 text-slate-900"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(product.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="mb-3 text-lg font-bold text-slate-900">Итого</h2>
          <p className="mb-4 text-3xl font-bold text-indigo-600">${total}</p>
          <button className="w-full rounded bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700">
            Оформить заказ
          </button>
          <button
            onClick={clearCart}
            className="mt-2 w-full rounded border border-slate-300 py-2 text-sm text-slate-600"
          >
            Очистить корзину
          </button>
        </aside>
      </div>
    </main>
  )
}