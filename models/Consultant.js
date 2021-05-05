const mongoose = require('mongoose')

const ConsultantSchema = new mongoose.Schema({
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

module.exports = Consultant = mongoose.model('consultant', ConsultantSchema)
