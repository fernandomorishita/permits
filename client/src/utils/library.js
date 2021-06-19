const moment = require('moment')
const { chartColors } = require('../utils/defines')

exports.calcProcessingWeeks = (applDate, resDate) => {
  if (resDate) {
    return moment(resDate, 'YYYY-MM-DD').diff(moment(applDate, 'YYYY-MM-DD'), 'weeks')
  } else {
    return moment().diff(moment(applDate, 'YYYY-MM-DD'), 'weeks')
  }
}

exports.getMedicalStatus = medDate => {
  const elapsedDays = moment().diff(moment(medDate, 'YYYY-MM-DD'), 'days')
  if (elapsedDays > 365) return 'Expired'
  if (elapsedDays >= 300) return 'Expiring'
  return ''
}

exports.handleChartData = applications => {
  let compiledData = {
    // Pie
    applicationsChart: {
      data: [], // Total by application year
      title: 'Applications',
      total: 0,
      labels: [] // Application years
    },
    // Pie
    processedChart: {
      data: [],
      title: 'Processed',
      total: 0,
      labels: []
    },
    // Pie
    awaitingChart: {
      data: [],
      title: 'Awating',
      total: 0,
      labels: []
    },
    // Data
    responses: {
      today: 0,
      week: 0,
      month: 0
    },
    // Processed Bar
    processedDates: {
      labels: [],
      datasets: []
    },
    // Waiting Bar
    waitingDates: {
      labels: [],
      datasets: []
    },
    // Averages
    averages: []
  }

  if (applications === null) return

  // Variables for Pie Charts
  let applYearDict = {}

  // Variables for Processed Dates BarChart
  let resDateDict = {}
  let ctrlDict = {}
  let applYearArray = []
  let resDateArray = []

  // Variables for Waiting BarChart
  let applDateDict = {}
  let applDateArray = []

  // Variables for Average
  let avgDict = {}

  applications.forEach(appl => {
    compiledData.applicationsChart.total++

    let hasResponse = appl.response && appl.response.date

    // Count applications by application year
    if (!(appl.date.year in applYearDict)) {
      // Store the year index starting with 0
      applYearDict[appl.date.year] = compiledData.applicationsChart.labels.length

      compiledData.applicationsChart.labels.push(appl.date.year)
      compiledData.processedChart.labels.push(appl.date.year)
      compiledData.awaitingChart.labels.push(appl.date.year)

      // Add to applications array
      compiledData.applicationsChart.data.push(1)

      if (hasResponse) {
        // Add to the processed array if a response exists
        compiledData.processedChart.data.push(1)
        compiledData.processedChart.total++
      } else {
        // Else, add to the waiting array
        compiledData.processedChart.data.push(0)
        compiledData.awaitingChart.data.push(1)
        compiledData.awaitingChart.total++
      }

      applYearArray.push(appl.date.year)
    } else {
      // Increment the applications array in the year index stored in dictionary
      compiledData.applicationsChart.data[applYearDict[appl.date.year]]++

      // Increment the processed array if a response exists
      // Else, increment the waiting array
      if (hasResponse) {
        compiledData.processedChart.data[applYearDict[appl.date.year]]++
        compiledData.processedChart.total++
      } else {
        compiledData.awaitingChart.data[applYearDict[appl.date.year]]++
        compiledData.awaitingChart.total++
      }
    }

    // Handle Response data
    if (hasResponse) {
      // Responses in the last days
      let diff = moment().diff(moment(appl.response.date, 'YYYY-MM-DD'), 'days')
      if (diff === 0) compiledData.responses.today++
      if (diff >= 0 && diff <= 7) compiledData.responses.week++
      if (diff >= 0 && diff <= 30) compiledData.responses.month++
    }

    // Handle Processed chart
    if (hasResponse) {
      // Responses by response date and application year
      let resDateKey = appl.response.fullmonth.slice(0, 3) + '/' + appl.response.year.toString()
      let ctrlKey = appl.response.fullmonth.slice(0, 3) + '/' + appl.response.year.toString() + appl.date.year.toString()
      if (!(resDateKey in resDateDict)) {
        resDateDict[resDateKey] = compiledData.processedDates.labels.length
        compiledData.processedDates.labels.push(resDateKey)
        resDateArray.push(resDateKey)
      }

      if (!(ctrlKey in ctrlDict)) {
        ctrlDict[ctrlKey] = 1
      } else {
        ctrlDict[ctrlKey]++
      }
    } else {
      // Handle waiting chart
      let applDateKey = appl.date.fullmonth.slice(0, 3) + '/' + appl.date.year.toString()

      if (!(applDateKey in applDateDict)) {
        applDateDict[applDateKey] = 1
        applDateArray.push(applDateKey)
        compiledData.waitingDates.labels.push(applDateKey)
      } else {
        applDateDict[applDateKey]++
      }
    }

    // Handle averages
    let procWeeks = 0
    if (hasResponse) {
      procWeeks = moment(appl.response.date, 'YYYY-MM-DD').diff(moment(appl.date.date, 'YYYY-MM-DD'), 'weeks')
    } else {
      procWeeks = moment().diff(moment(appl.date.date, 'YYYY-MM-DD'), 'weeks')
    }

    if (!(appl.date.year in avgDict)) {
      avgDict[appl.date.year] = compiledData.averages.length
      compiledData.averages.push({
        year: appl.date.year,
        weeks: [procWeeks]
      })
    } else {
      compiledData.averages[avgDict[appl.date.year]].weeks.push(procWeeks)
    }

    // End loop
  })

  applYearArray.forEach((year, index) => {
    // Create dataset for Processed Date BarChart
    let procDataset = {
      label: year,
      data: [],
      stack: 1,
      backgroundColor: chartColors[index],
      borderColor: chartColors[index]
    }
    resDateArray.forEach(date => {
      let key = date + year
      if (key in ctrlDict) {
        procDataset.data.push(ctrlDict[key])
      } else {
        procDataset.data.push(0)
      }
    })
    compiledData.processedDates.datasets.push(procDataset)

    // Create dataset for waiting applications BarChart
    let waitDataset = {
      label: year,
      data: [],
      stack: 1,
      backgroundColor: chartColors[index],
      borderColor: chartColors[index]
    }

    applDateArray.forEach(date => {
      if (parseInt(date.slice(4, 8)) === year) {
        waitDataset.data.push(applDateDict[date])
      } else {
        waitDataset.data.push(0)
      }
    })
    compiledData.waitingDates.datasets.push(waitDataset)
  })

  // Calculate Averages
  compiledData.averages.forEach((avg, index) => {
    compiledData.averages[index].avg = (avg.weeks.reduce((a, b) => a + b, 0) / avg.weeks.length).toFixed(0)
  })

  return compiledData
}

/* Local functions */
