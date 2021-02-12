//USER LOGIC
import {LOGIN_USER, LOGOUT_USER, SET_ISLOGGED} from "../actions";

const loginUser = userObj => ({
    type: LOGIN_USER,
    payload: userObj,
    isLogged: true
});
export const userLoginFetch = user => {
    return dispatch => {
        return fetch("https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/login_check", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => {
                localStorage.setItem("token", data.token)
                dispatch(loginUser(user))
            })
            .catch(err => alert(err));
    }
}


const setLogged = () => ({
    type: SET_ISLOGGED,
    payload: true
})
export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch("https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/user", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.detail) {
                        localStorage.removeItem("token")
                    } else {
                        console.log(data, 'setLogged')
                        dispatch(setLogged())
                    }
                })
                .catch(err => localStorage.removeItem("token"));
            //
        }
    }
}
export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: false
})

