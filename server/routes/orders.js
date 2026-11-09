import { Router } from 'express'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const router = Router()
const products = JSON.parse(
  readFileSync(new URL('../data/products.json', import.meta.url))
)

const orders = []

router.post('/', (req, res) => {
  const { items, customer } = req.body

  if(!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' })
  }

  if(!customer?.name || !customer?.email ) {
    return res.status(400).json({message: 'Name and email are required'})
  }

  let total = 0
  const orderItems = []

  for (const { id, quantity } of items) {
  
    const product = products.find(p => p.id === Number(id));

    if(!product) {
      return res.status(400).json({message: `Product ${id} not found`})
    }

    if(!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({message: "Invalid quantity"})
    }

    total += product.price * quantity;

    orderItems.push({  
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
    });
   
  }

  const order = {
    id: randomUUID(),
    items: orderItems,
    customer: { name: customer.name, email: customer.email },
    total,
    createdAt: new Date().toISOString(),
  }

  orders.push(order)
  res.status(201).json(order)
})

export default router