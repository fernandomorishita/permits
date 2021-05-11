import { GET_VISAS, VISAS_ERROR } from './types'
import axios from 'axios'

export const getVisas = () => async dispatch => {
  try {
    const res = await axios.get('/api/visas')
    dispatch({
      type: GET_VISAS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: VISAS_ERROR
    })
  }
}

export const addApplicantToVisa = (visaId, applicantId) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  const body = {
    applicantId,
    visaId
  }

  try {
    const res = await axios.post('/api/visas/applicant', body, config)
    dispatch({
      type: GET_VISAS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: VISAS_ERROR
    })
  }
}
