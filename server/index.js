import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'
import orderRouter from './routes/orders.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/products', productsRouter)
app.use('/orders', orderRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

