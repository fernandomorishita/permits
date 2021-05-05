const mongoose = require('mongoose')

const VisaSchema = new mongoose.Schema({
  type: {
    type: String
  },
  application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'application'
    }
  ]
})

module.exports = Visa = mongoose.model('visa', VisaSchema)
