import { GET_VACS, VACS_ERROR } from '../actions/types'

const initialState = {
  vacs: null,
  isLoading: true
}

export default function vacs(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_VACS:
      return { ...state, vacs: payload, isLoading: false }
    case VACS_ERROR:
      return { ...state, vacs: null, isLoading: false }
    default:
      return state
  }
}
