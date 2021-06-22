const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Access denied, yo.' })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, /*config.get('jwtSecret')*/ process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Token not valid, yo.' })
  }
}
