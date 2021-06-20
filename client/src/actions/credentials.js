import { GET_CREDENTIALS, CREDENTIALS_ERROR } from './types'
import axios from 'axios'

export const getCredentials = () => async dispatch => {
  try {
    const res = await axios.get('/api/credentials')

    dispatch({
      type: GET_CREDENTIALS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: CREDENTIALS_ERROR
    })
  }
}
