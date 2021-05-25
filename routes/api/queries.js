const express = require('express')
const router = express.Router()

// Model
const Application = require('../../models/Application')

// @route   GET api/queries
// @desc    Get all applications sorted by application year, response year and month
// @access  Public
router.get('/applications/by_response', async (req, res) => {
  try {
    /*
    const group = {
      $group: {
        _id: {
          appl_year: '$date.year',
          res_year: '$response.year',
          res_month: '$response.month'
        },
        count: { $sum: 1 }
      }
    }
    */

    const sort = {
      'date.year': 1,
      'data.month': 1,
      'response.year': 1,
      'response.month': 1
    }
    const result = await Application.find().sort(sort)
    res.json(result)
  } catch (error) {
    res.status(500).send('Server error, yo.')
  }
})

module.exports = router
