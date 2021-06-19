import { combineReducers } from 'redux'
import auth from './auth'
import menu from './menu'
import application from './application'
import visas from './visas'
import queries from './queries'
import visaoffices from './visaoffices'
import vacs from './vacs'

export default combineReducers({
  auth,
  menu,
  application,
  visas,
  queries,
  visaoffices,
  vacs
})
