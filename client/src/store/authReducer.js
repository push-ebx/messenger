import cookie from "cookie";

const defaultState = {
  isAuth: !!cookie.parse(document.cookie).access_token
}

export const SWITCH_IS_AUTH = "SWITCH_IS_AUTH"

export const authReducer = (state=defaultState, action) => {
  switch (action.type) {
    case SWITCH_IS_AUTH:
      return {...state, isAuth: action.payload}
    default:
      return state
  }
}

export const switchIsAuthAction = payload => ({type: SWITCH_IS_AUTH, payload})