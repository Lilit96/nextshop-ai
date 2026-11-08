import { Router } from 'express'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'
import { title } from 'process'

const router = Router()
const products = JSON.parse(
  readFileSync(new URL('../data/products.json', import.meta.url))
)

// Заказы хранятся в памяти (при перезапуске сервера пропадут)
const orders = []

router.post('/', (req, res) => {
  const { items, customer } = req.body

  // TODO 1: если items не массив или он пустой, ответь 400 и { message: 'Cart is empty' }
  if(items.length === 0 || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Cart is empty' })
  }

  if(custmer.name === undefined || customer.email === undefined ) {
    return res.status(400).json({message: 'Name and email are required'})
  }

  // TODO 2: если нет customer.name или customer.email, ответь 400 и { message: 'Name and email are required' }

  let total = 0
  const orderItems = []

  for (const { id, quantity } of items) {
  
    product = products.find(p => p.id === Number(id));

    if(!product) {
      return res.status(400).json({message: `Product ${id} not found`})
    }

    if(quantity < 1 && !Number(quantity)) {
      return res.status(400).json({message: "Invalid quantity"})
    }

    total = price * quantity;
    orderItems.push({id, title, price, quantity});
    // TODO 3: найди товар в products по id (не забудь Number(id))
    // TODO 4: если товара нет, ответь 400 и { message: `Product ${id} not found` }
    // TODO 5: если quantity не целое число или меньше 1, ответь 400 и { message: 'Invalid quantity' }

    // TODO 6: прибавь price * quantity к total
    // TODO 7: добавь в orderItems объект { id, title, price, quantity }
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