import { GET_APPLICATION, APPLICATION_ERROR, CLEAR_APPLICATION } from '../actions/types'

const initialState = {
  application: null,
  isLoading: true
}

export default function application(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_APPLICATION:
      return { ...state, application: payload }
    case APPLICATION_ERROR:
    case CLEAR_APPLICATION:
      return { ...state, application: null, isLoading: true }
    default:
      return state
  }
}
