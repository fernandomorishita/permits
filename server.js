const express = require('express')
const connectDB = require('./config/db')
const app = express()
const path = require('path')

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/application', require('./routes/api/application'))
app.use('/api/visas', require('./routes/api/visas'))
app.use('/api/queries', require('./routes/api/queries'))
app.use('/api/visaoffices', require('./routes/api/visaoffices'))
app.use('/api/vacs', require('./routes/api/vacs'))
app.use('/api/credentials', require('./routes/api/credentials'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
