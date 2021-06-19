import axios from 'axios'
import moment from 'moment'

// Library
import { calcProcessingWeeks } from '../utils/library'

import { QUERY_CHARTS, QUERY_ERROR } from './types'

// Query for charts
export const getChartsQuery = () => async dispatch => {
  try {
    const res = await axios.get('/api/queries/applications/by_response')

    let payload = res.data.map(data => {
      let resDate = ''
      if (data.response) {
        resDate = data.response.date
      }
      let procWeeks = calcProcessingWeeks(data.date.date, resDate)

      let passWeeks = ''
      if (data.passport) {
        passWeeks = calcProcessingWeeks(data.passport.date_sent, data.passport.date_received)
      }
      return { ...data, procWeeks: procWeeks, passWeeks: passWeeks }
    })

    dispatch({
      type: QUERY_CHARTS,
      payload: payload
    })
  } catch (error) {
    dispatch({
      type: QUERY_ERROR
    })
  }
}
