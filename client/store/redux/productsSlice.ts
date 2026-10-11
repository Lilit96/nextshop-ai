import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '@/types/product'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) throw new Error('Не удалось загрузить товары')
  return (await res.json()) as Product[]
})

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Ошибка'
      })
  },
})

export default productsSlice.reducer