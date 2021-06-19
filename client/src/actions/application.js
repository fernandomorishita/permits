import axios from 'axios'
import { APPLICATION_READ, APPLICATION_ERROR, GET_APPL_BY_ID, APPL_BY_ID_ERROR, CLEAR_APPL_BY_ID } from './types'

// Get current user application
export const getApplication = () => async dispatch => {
  try {
    const res = await axios.get('/api/application/me')
    dispatch({
      type: APPLICATION_READ,
      payload: res.data
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: APPLICATION_ERROR
    })
  }
}

// Create or Update user application
export const createOrUpdateApplication = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const res = await axios.post('/api/application', formData, config)

    dispatch({
      type: APPLICATION_READ,
      payload: res.data
    })
    history.push('/dashboard')
  } catch (error) {
    dispatch({
      type: APPLICATION_ERROR
    })
  }
}

export const getApplicationById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/application/${id}`)

    dispatch({
      type: GET_APPL_BY_ID,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: APPL_BY_ID_ERROR
    })
  }
}

export const clearApplicationById = () => async dispatch => {
  dispatch({
    type: CLEAR_APPL_BY_ID
  })
}
