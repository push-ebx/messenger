const defaultState = {
  companion: {
    id: null,
    username: "NoName",
    first_name: "NoName",
    last_name: "NoName",
    sex: null
  }
}

export const SET_COMPANION = "SET_COMPANION"

export const companionReducer = (state=defaultState, action) => {
  switch (action.type) {
    case SET_COMPANION:
      return {...state, companion: action.payload}
    default:
      return state
  }
}

export const setCompanionAction = payload => ({type: SET_COMPANION, payload})