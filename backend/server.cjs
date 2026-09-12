const dns = require('dns')

dns.setServers([
  '8.8.8.8',
  '1.1.1.1'
])

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User.cjs')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// =========================
// HOME / TEST ROUTE
// =========================

app.get('/', (req, res) => {
  res.json({
    message: 'CampusCart backend is running!'
  })
})

// =========================
// USER REGISTRATION
// =========================

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required.'
      })
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim()
    })

    if (existingUser) {
      return res.status(400).json({
        message: 'An account with this email already exists.'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    })

    res.status(201).json({
      message: 'Account created successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Registration error:', error.message)

    res.status(500).json({
      message: 'Something went wrong while creating the account.'
    })
  }
})

// =========================
// USER LOGIN
// =========================

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.'
      })
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      })
    }

    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error.message)

    res.status(500).json({
      message: 'Something went wrong while logging in.'
    })
  }
})

// =========================
// CONNECT TO MONGODB
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      )
    })
  })
  .catch((error) => {
    console.error(
      'MongoDB connection failed:',
      error.message
    )
  })