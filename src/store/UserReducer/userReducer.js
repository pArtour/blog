import {LOGIN_USER, LOGOUT_USER, SET_ISLOGGED} from "../actions";

const initialState = {
    currentUser: {},
    isLogged: false
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, currentUser: action.payload, isLogged: action.isLogged}
        case LOGOUT_USER:
            return {...state, currentUser: {}, isLogged: action.payload }
        case SET_ISLOGGED:
            return {...state, isLogged: action.payload}
        default:
            return state;
    }
}