'use client'

import { useEffect } from 'react'
import { fetchProducts } from '@/store/redux/productsSlice'
import { useAppDispatch, useAppSelector } from '@/store/redux/hooks'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  return (
    <main className="min-h-screen bg-slate-50 p-8 dark:bg-slate-900">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Каталог</h1>

      {status === 'loading' && <p className="text-slate-500">Загрузка...</p>}
      {status === 'failed' && <p className="text-red-500">Ошибка: {error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}