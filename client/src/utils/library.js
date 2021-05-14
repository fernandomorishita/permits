const moment = require('moment')

exports.calcProcessingWeeks = (applDate, apprDate) => {
  let useDate = ''
  if (apprDate) {
    useDate = apprDate
  } else {
    useDate = applDate
  }
  return moment().diff(moment(useDate, 'YYYY-MM-DD'), 'weeks')
}

exports.getMedicalStatus = medDate => {
  const elapsedDays = moment().diff(moment(medDate, 'YYYY-MM-DD'), 'days')
  if (elapsedDays > 365) return 'Expired'
  if (elapsedDays >= 300) return 'Expiring'
  return ''
}
