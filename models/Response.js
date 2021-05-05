const mongoose = require('mongoose')

const ResponseSchema = mongoose.Schema({
  result: {
    type: String
  },
  month: {
    type: String
  },
  year: {
    type: String
  },
  application: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'application'
      },
      month: {
        //denormalized
        type: String
      },
      year: {
        //denormalized
        type: String
      }
    }
  ]
})

module.exports = Response = mongoose.model('response', ResponseSchema)
