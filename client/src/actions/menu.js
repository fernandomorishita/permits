import { TOGGLE_MOBILE_MENU, HIDE_MOBILE_MENU } from './types'

// Show mobile menu
export const toggleMobileMenu = forceHide => async dispatch => {
  if (forceHide) {
    dispatch({ type: HIDE_MOBILE_MENU })
  } else {
    dispatch({ type: TOGGLE_MOBILE_MENU })
  }
}
