import { GET_APPLICATION, APPLICATION_ERROR } from '../actions/types'

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
      return { ...state, application: null }
    default:
      return state
  }
}
