const defaultState = {
  thisUser: {
    id: null,
    username: "NoName",
    first_name: "NoName",
    last_name: "NoName",
    sex: null
  }
}

export const SET_THIS_USER = "SET_THIS_USER"

export const thisUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_THIS_USER:
      return {...state, thisUser: action.payload}
    default:
      return state
  }
}

export const setThisUserAction = payload => ({type: SET_THIS_USER, payload})