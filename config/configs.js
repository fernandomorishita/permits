const config = require('config')

exports.getJWTSecret = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.JWT_SECRET
  } else {
    return config.get('jwtSecret')
  }
}

exports.getMongoURI = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.MONGO_URI
  } else {
    return config.get('mongoURI')
  }
}