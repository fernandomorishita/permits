import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, USER_NOT_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null
}

export default function auth(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, isLoading: false, user: payload }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true, isLoading: false }
    case REGISTER_FAIL:
    case USER_NOT_LOADED:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return { ...state, token: null, isAuthenticated: false, user: null, isLoading: true }
    default:
      return state
  }
}
