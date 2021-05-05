const mongoose = require('mongoose')

const CollegeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  dli: {
    type: String
  },
  public: {
    type: Boolean
  },
  application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'application'
    }
  ]
})

module.exports = College = mongoose.model('college', CollegeSchema)
