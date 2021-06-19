const mongoose = require('mongoose')

const VisaOfficesSchema = new mongoose.Schema({
  location: {
    type: String
  }
})

module.exports = VisaOffices = mongoose.model('visaoffices', VisaOfficesSchema)
