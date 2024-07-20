import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
// import path from 'path'

dotenv.config()

try {
  mongoose.connect(process.env.MONGODB_URI)
  console.log('connected to db.')
} catch (err) {
  console.log(err.message)
}

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use('/api/seeds', seedRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

// Needed for build when using Heroku for deployment
// const __dirname = path.resolve()
// app.use(express.static(path.join(__dirname, '/client/build')))
// app.get('*', (req, res) =>
// 	res.sendFile(path.join(__dirname, '/client/build/index.html')),
// )

// app.use(express.static(path.join(__dirname, '/client/build')))
// app.get('/*', function (req, res) {
// 	res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
// })

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})

// mongoose
// 	.connect(process.env.MONGODB_URI)
// 	.then(() => {
// 		console.log('connected to db')
// 	})
// 	.catch(err => {
// 		console.log(err.message)
// 	})

// import express from 'express'
// // const express = require('express')
// import path from 'path'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import seedRouter from './routes/seedRoutes.js'
// import productRouter from './routes/productRoutes.js'
// import userRouter from './routes/userRoutes.js'
// import orderRouter from './routes/orderRoutes.js'

// dotenv.config()

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to DB')
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.get('/api/keys/paypal', (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
// })

// app.use('/api/seed', seedRouter)
// app.use('/api/products', productRouter)
// app.use('/api/users', userRouter)
// app.use('/api/orders', orderRouter)

// const _dirname = path.resolve()
// app.use(express.static(path.join(_dirname, '/client/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(_dirname, '/client/build/index.html'))
// })

// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message })
// })

// const port = process.env.PORT || 5000
// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`)
// })
