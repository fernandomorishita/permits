import { GET_CREDENTIALS, CREDENTIALS_ERROR } from '../actions/types'

const initialState = {
  credentials: null,
  isLoading: true
}

export default function credentials(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_CREDENTIALS:
      return { ...state, credentials: payload, isLoading: false }
    case CREDENTIALS_ERROR:
      return { ...state, credentials: null, isLoading: false }
    default:
      return state
  }
}
