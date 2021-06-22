const mongoose = require('mongoose')
const config = require('config')
const {getMongoURI} = require('../config/configs')

//const db = config.get('mongoURI')

const db = getMongoURI()

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    console.log('MongoDB Connected...')
  } catch (error) {
    console.error(error.message)

    // Exit process with failure.
    process.exit(1)
  }
}

module.exports = connectDB
