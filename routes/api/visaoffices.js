const express = require('express')
const router = express.Router()
const VisaOffices = require('../../models/VisaOffices')

// @route   POST api/visaoffices
// @desc    Get all the Visa Offices
// @access  Public
router.get('/', async (req, res) => {
  try {
    const offices = await VisaOffices.find({})

    if (!offices) {
      return res.status(400).json({ msg: 'No Visa Offices, yo.' })
    }

    res.json(offices)
  } catch (error) {
    res.status(500).send('Server error, yo.')
  }
})

module.exports = router
