import { TOGGLE_MOBILE_MENU, HIDE_MOBILE_MENU } from '../actions/types'

const initialState = {
  showMobileMenu: false
}

export default function menu(state = initialState, action) {
  const { type } = action
  switch (type) {
    case TOGGLE_MOBILE_MENU:
      return { ...state, showMobileMenu: !state.showMobileMenu }
    case HIDE_MOBILE_MENU:
      return { ...state, showMobileMenu: false }
    default:
      return state
  }
}
