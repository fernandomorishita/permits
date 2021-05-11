const { months } = require('./constants')

exports.getMonth = date => {
  // yyyy-mm-dd

  return Number(date.slice(5, 7))
}
exports.getMonthName = date => {
  // yyyy-mm-dd

  return months[this.getMonth(date) - 1]
}

exports.getYear = date => {
  // yyyy-mm-dd

  return Number(date.slice(0, 4))
}

exports.getDay = date => {
  // yyyy-mm-dd

  return Number(date.slice(6, 8))
}

exports.convertStringToDate = date => {
  let day = this.getDay(date)
  let month = this.getMonth(date)
  let year = this.getYear(date)
  return new Date(day, month, year)
}
