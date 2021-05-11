import { GET_VISAS, VISAS_ERROR } from '../actions/types'

const initialState = {
  visas: null,
  isLoading: true
}

export default function visas(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_VISAS:
      return { ...state, visas: payload, isLoading: false }
    case VISAS_ERROR:
      return { ...state, visas: null, isLoading: false }
    default:
      return state
  }
}
