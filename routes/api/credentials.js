const express = require('express')
const router = express.Router()
const Credentials = require('../../models/Credentials')

// @route   POST api/credentials
// @desc    Get all Credentials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const credentials = await Credentials.find({})

    if (!credentials) {
      return res.status(400).json({ msg: 'No Vacs, yo.' })
    }

    res.json(credentials)
  } catch (error) {
    res.status(500).send('Server error, yo.')
  }
})

module.exports = router
