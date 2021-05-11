import { APPLICATION_READ, APPLICATION_ERROR, CLEAR_APPLICATION } from '../actions/types'

const initialState = {
  application: null,
  isLoading: true
}

export default function application(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case APPLICATION_READ:
      return { ...state, application: payload, isLoading: false }
    case APPLICATION_ERROR:
    case CLEAR_APPLICATION:
      return { ...state, application: null, isLoading: false }
    default:
      return state
  }
}
