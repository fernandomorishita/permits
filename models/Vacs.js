const mongoose = require('mongoose')

const VacsSchema = new mongoose.Schema({
  location: {
    type: String
  }
})

module.exports = Vacs = mongoose.model('vacs', VacsSchema)
