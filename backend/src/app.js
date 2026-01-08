const express = require('express')
const app = express()
const path = require('path')
const cookiesParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookiesParser())

app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
app.use('/api', foodPartnerRoutes)

module.exports = app