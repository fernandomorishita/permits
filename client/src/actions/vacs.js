import { GET_VACS, VACS_ERROR } from './types'
import axios from 'axios'

export const getVacs = () => async dispatch => {
  try {
    const res = await axios.get('/api/vacs')

    dispatch({
      type: GET_VACS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: VACS_ERROR
    })
  }
}
