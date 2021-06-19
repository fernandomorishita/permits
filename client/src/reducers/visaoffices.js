import { GET_VISA_OFFICES, VISA_OFFICES_ERROR } from '../actions/types'

const initialState = {
  visaOffices: null,
  isLoading: true
}

export default function visaOffices(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_VISA_OFFICES:
      return { ...state, visaOffices: payload, isLoading: false }
    case VISA_OFFICES_ERROR:
      return { ...state, visaOffices: null, isLoading: false }
    default:
      return state
  }
}
