const express = require('express')
const router = express.Router()

const Visa = require('../../models/Visa')

// @route   POST api/visas
// @desc    Register user
// @access  Public
router.get('/', async (req, res) => {
  try {
    const visas = await Visa.find({})

    if (!visas) {
      return res.status(400).json({ msg: 'No profile, yo.' })
    }

    res.json(visas)
  } catch (error) {
    res.status(500).send('Server error, yo.')
  }
})

router.post('/applicant', async (req, res) => {
  console.log(req.body)
  try {
    const visa = await Visa.findOneAndUpdate({ id: req.body.visaId }, { $addToSet: { applicants: req.body.applicantId } })
  } catch (error) {
    res.status(500).send('Server error, yo.')
  }
})
module.exports = router
