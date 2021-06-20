import { APPLICATION_READ, APPLICATION_ERROR, DELETE_APPLICATION, CLEAR_APPLICATION, GET_APPL_BY_ID, APPL_BY_ID_ERROR, CLEAR_APPL_BY_ID } from '../actions/types'

const initialState = {
  application: null,
  isLoading: true,
  appl_by_id: null,
  isLoadingApplById: true
}

export default function application(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case APPLICATION_READ:
      return { ...state, application: payload, isLoading: false }
    case APPLICATION_ERROR:
    case CLEAR_APPLICATION:
    case DELETE_APPLICATION:
      return { ...state, application: null, isLoading: false }
    case GET_APPL_BY_ID:
      return { ...state, appl_by_id: payload, isLoadingApplById: false }
    case APPL_BY_ID_ERROR:
    case CLEAR_APPL_BY_ID:
      return { ...state, appl_by_id: null, isLoadingApplById: false }
    default:
      return state
  }
}
