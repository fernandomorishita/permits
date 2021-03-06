import { USER_LOADED, USER_NOT_LOADED, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_APPLICATION, LOGOUT, LOADING_AUTH } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data // user
    })
  } catch (error) {
    dispatch({
      type: USER_NOT_LOADED
    })
  }
}

// Register User
export const register = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/api/user', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data // token
    })

    dispatch(loadUser())
    //dispatch(getCurrentProfile())
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      console.log(errors)
      //errors.forEach(e => dispatch(setAlert(e.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {
  dispatch({
    type: LOADING_AUTH
  })
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data // token
    })
    dispatch(loadUser())
  } catch (error) {
    //const errors = error.response.data.errors
    console.log(error)
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_APPLICATION })
  dispatch({ type: LOGOUT })
}
