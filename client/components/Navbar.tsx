'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore, getTotalCount } from '@/store/zustand/useCartStore';

export default function Navbar() {
  const items = useCartStore((state) => state.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const count = mounted ? getTotalCount(items) : 0

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-slate-700 dark:bg-slate-800">
      <Link href="/" className="text-xl font-bold text-indigo-600">
        NextShop
      </Link>
      <Link href="/cart" className="relative text-slate-900 dark:text-white">
        Корзина
        {count > 0 && (
          <span className="absolute -right-5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {count}
          </span>
        )}
      </Link>
    </nav>
  )
}