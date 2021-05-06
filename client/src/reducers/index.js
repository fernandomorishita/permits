import { combineReducers } from 'redux'
import auth from './auth'
import menu from './menu'
import application from './application'

export default combineReducers({
  auth,
  menu,
  application
})
