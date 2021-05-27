const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const moment = require('moment')

const auth = require('../../middleware/auth')
const Application = require('../../models/Application')

// utils
const { getMonthName, getYear } = require('../../config/dates')

// @route   GET api/application/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  console.log()
  try {
    const profile = await Application.findOne({ user_id: req.user.id }).populate('user', ['name'])

    if (!profile) {
      return res.status(400).json({ msg: 'No profile, yo.' })
    }

    res.json(profile)
  } catch (error) {
    res.status(500).send('Server error, yo.')
  }
})

// @route   POST api/application
// @desc    Create or Update user application
// @access  Private
router.post('/', [auth, [check('applDate', 'Application date is required.').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }

  const { applDate, applicants, consultantName } = req.body

  // Application Object
  applObj = {
    user_id: req.user.id,
    status: 'Waiting',
    date: {
      date: applDate,
      month: parseInt(moment(applDate, 'YYYY-MM-DD').format('MM')),
      fullmonth: moment(applDate, 'YYYY-MM-DD').format('MMMM'),
      year: parseInt(moment(applDate, 'YYYY-MM-DD').format('YYYY'))
    },
    applicants: applicants,
    consultant: {
      name: consultantName
    }
  }

  //console.log(applObj)

  try {
    let application = await Application.findOne({ user_id: req.user.id })

    if (application) {
      // Update
      await Application.findOneAndRemove({ user_id: req.user.id })
    }

    // Create
    application = new Application(applObj)
    await application.save()
    res.json(application)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})
module.exports = router
