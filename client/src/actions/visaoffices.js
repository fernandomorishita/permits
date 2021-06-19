import { GET_VISA_OFFICES, VISA_OFFICES_ERROR } from './types'
import axios from 'axios'

export const getVisaOffices = () => async dispatch => {
  try {
    const res = await axios.get('/api/visaoffices')
    dispatch({
      type: GET_VISA_OFFICES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: VISA_OFFICES_ERROR
    })
  }
}
