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
  let countApproved = 0
  let totalAppls = 0

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }

  const { applDate, applType, applicants, consultantName, comments, resDate, visaOffice, passDateSent, passDateReceived, passVac } = req.body

  // Application Object
  applObj = {
    user_id: req.user.id,
    status: 'Awaiting',
    type: applType,
    date: {
      date: applDate,
      month: parseInt(moment(applDate, 'YYYY-MM-DD').format('MM')),
      fullmonth: moment(applDate, 'YYYY-MM-DD').format('MMMM'),
      year: parseInt(moment(applDate, 'YYYY-MM-DD').format('YYYY'))
    },
    applicants: applicants,
    consultant: {
      name: consultantName
    },
    comments: comments
  }

  if (resDate && resDate !== '') {
    applObj.response = {}
    applObj.response.date = resDate
    applObj.response.month = parseInt(moment(resDate, 'YYYY-MM-DD').format('MM'))
    applObj.response.fullmonth = moment(resDate, 'YYYY-MM-DD').format('MMMM')
    applObj.response.year = parseInt(moment(resDate, 'YYYY-MM-DD').format('YYYY'))
    if (visaOffice && visaOffice !== '' && visaOffice !== 'N/A') applObj.response.visaoffice = visaOffice
  }

  if (passDateSent) {
    applObj.passport = {}
    applObj.passport.date_sent = passDateSent

    if (passDateReceived) applObj.passport.date_received = passDateReceived
    if (passVac && passVac !== '' && passVac !== 'N/A') applObj.passport.vac = passVac
  }

  applicants.forEach(appl => {
    if (appl.status === 'Approved') {
      countApproved++
    }
    totalAppls++
  })

  if (countApproved === totalAppls) applObj.status = 'Approved'
  if (countApproved > 0 && countApproved < totalAppls) applObj.status = 'Partially Approved'

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

// @route   GET api/application/:user_id
// @desc    Get application by user id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id }).populate('user_id', 'name')
    if (!application) {
      return res.status(400).json({ errors: errors.array })
    }
    res.json(application)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})
module.exports = router
