import {
    CREATE_POST,
    DELETE_POST,
    FETCH_POSTS,
    FILTER_POSTS,
    GET_CURRENT_POST,
    HIDE_ALERT,
    SHOW_ALERT, UPDATE_POST
} from "../actions";

const showAlert = payload => ({
    type: SHOW_ALERT,
    payload
});
const hideALert = () => ({type: HIDE_ALERT});

//POST LOGIC
const deletePost = post => ({
    type: DELETE_POST,
    payload: post
})
const getPosts = posts => ({
    type: FETCH_POSTS,
    payload: posts
});
export const filterPosts = value => ({
    type: FILTER_POSTS,
    payload: value
});
export const fetchPosts = () => {
    return dispatch => {
        return fetch("https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts", {
            method: "GET",
            headers : {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.detail) {
                    console.log(data)
                } else {
                    console.log(data)
                    dispatch(getPosts(data.items))
                }
            })
            .catch(err => alert(err));
    }
}
const addPost = post => ({
    type: CREATE_POST,
    payload: post
})
export const createPost = postBody => {
    return dispatch => {
        dispatch(showAlert("Creating..."))
        return fetch("https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts", {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(postBody)
        })
            .then(resp => resp.json())
            .then(data => {
                dispatch(hideALert())
                dispatch(addPost(data))
            })
            .catch(err => {
                alert(err)
            })
    }
}
export const removePost = id => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.text())
                .then(data => {
                    dispatch(deletePost(id))
                })
                .catch(err => alert(err))
        }
    }
}
const setCurrentPost = post => ({
    type: GET_CURRENT_POST,
    payload: post
});
export const fetchCurrentPost = id => {
    return dispatch => {
        fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts/${id}`, {
            method: "GET",
            headers : {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.detail) {
                    alert(data.detail);
                } else {
                    dispatch(setCurrentPost(data));
                }
            })
            .catch(err => alert(err))
    }
}
const changePost = data => ({
    type: UPDATE_POST,
    payload: data
})
export const updatePost = (id, postBody) => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            dispatch(showAlert("Updating..."))
            return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts/${id}`, {
                method: "PUT",
                headers : {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify(postBody)
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    dispatch(changePost(data));
                    dispatch(showAlert("Done"))
                    setTimeout(() => {
                        dispatch(hideALert())
                    }, 1500)
                })
                .catch(err => alert(err));
        }
    }
}
