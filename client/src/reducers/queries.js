import { QUERY_CHARTS, QUERY_ERROR } from '../actions/types'

const initialState = {
  applications: null,
  isLoading: true
}

export default function queries(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case QUERY_CHARTS:
      return { ...state, applications: payload, isLoading: false }
    case QUERY_ERROR:
      return { ...state, applications: null, isLoading: false }
    default:
      return state
  }
}
