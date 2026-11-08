import { Router } from 'express'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const router = Router()
const products = JSON.parse(
  readFileSync(new URL('../data/products.json', import.meta.url))
)

// Заказы хранятся в памяти (при перезапуске сервера пропадут)
const orders = []

router.post('/', (req, res) => {
  const { items, customer } = req.body

  // TODO 1: если items не массив или он пустой, ответь 400 и { message: 'Cart is empty' }

  // TODO 2: если нет customer.name или customer.email, ответь 400 и { message: 'Name and email are required' }

  let total = 0
  const orderItems = []

  for (const { id, quantity } of items) {
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