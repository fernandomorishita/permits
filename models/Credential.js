const mongoose = require('mongoose')

const CredentialSchema = new mongoose.Schema({
  name: {
    type: String
  },
  application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'application'
    }
  ]
})

module.exports = Credential = mongoose.model('credential', CredentialSchema)
