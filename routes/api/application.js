const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const Profile = require('../../models/Application')

// @route   GET api/application/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Application.findOne({ user: req.user.id }).populate('user', ['name'])

    if (!profile) {
      return res.status(400).json({ msg: 'No profile, yo.' })
    }

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error, yo.')
  }
})

module.exports = router
