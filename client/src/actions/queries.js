import axios from 'axios'
import moment from 'moment'

import { QUERY_CHARTS, QUERY_ERROR } from './types'

// Query for charts
export const getChartsQuery = () => async dispatch => {
  try {
    const res = await axios.get('/api/queries/applications/by_response')

    dispatch({
      type: QUERY_CHARTS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: QUERY_ERROR
    })
  }
}
