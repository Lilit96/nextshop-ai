import { Router } from 'express'
import { readFileSync } from 'fs'

const router = Router()
const products = JSON.parse(
  readFileSync(new URL('../data/products.json', import.meta.url))
)

router.get('/', (req, res) => {
  const { category, search } = req.query
  let result = products

  if (category) result = result.filter(p => p.category === category)
  if (search) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  }
  res.json(result)
})

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id))
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
})

export default router