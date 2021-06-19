const express = require('express')
const router = express.Router()
const Vacs = require('../../models/Vacs')

// @route   POST api/vacs
// @desc    Get all Vacs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const vacs = await Vacs.find({})

    if (!vacs) {
      return res.status(400).json({ msg: 'No Vacs, yo.' })
    }

    res.json(vacs)
  } catch (error) {
    res.status(500).send('Server error, yo.')
  }
})

module.exports = router
