const mongoose = require('mongoose')

const CredentialsSchema = new mongoose.Schema({
  type: {
    type: String
  }
})

module.exports = Credentials = mongoose.model('credentials', CredentialsSchema)
