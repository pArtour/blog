import {
    CREATE_COMMENT, CREATE_POST, DELETE_COMMENT, DELETE_POST,
    FETCH_COMMENTS,
    FETCH_POSTS,
    FILTER_POSTS, GET_CURRENT_POST, HIDE_COMMENT, LOAD_EXACT_PAGE, LOAD_NEW_PAGE,
    LOGIN_USER,
    LOGOUT_USER,
    SET_ISLOGGED, UNHIDE_COMMENT, UPDATE_POST
} from "./actions";

//USER LOGIC
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
                if (data.message) {
                    //тут ваша логика
                    alert("something went wrond :(")
                } else {
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    dispatch(loginUser(user))
                }
            })
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
                        // Будет ошибка если token не дествительный
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


//POST LOGIC
const deletePost = post => ({
    type: DELETE_POST,
    payload: post
})
const getPosts = posts => ({
    type: FETCH_POSTS,
    payload: posts
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
                    //тут ваша логика
                    console.log(data)
                } else {
                    console.log(data)
                    dispatch(getPosts(data.items))
                }
            })
    }
}
const addPost = post => ({
    type: CREATE_POST,
    payload: post
})
export const createPost = postBody => {
    return dispatch => {
        return fetch("https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts", {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                // "Access-Control-Allow-Headers" : "Content-Type",
                // "Access-Control-Allow-Methods": "*"
            },
            body: JSON.stringify(postBody)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.detail) {
                    //тут ваша логика
                    console.log(data)
                } else {
                    console.log(data)
                    dispatch(addPost(data))
                }
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
                    console.log(data)
                    dispatch(setCurrentPost(data))
                }
            })
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
            return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts/${id}`, {
                method: "PUT",
                headers : {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify(postBody)
            })
                .then(resp => {
                    console.log(resp)
                    return resp.json()
                })
                .then(data => {
                    console.log(data)
                    dispatch(changePost(data))
                })
                .catch(err => alert(err));
        }
    }
}








//COMMENTS LOGIC
const getComments = comments => ({
    type: FETCH_COMMENTS,
    payload: comments
})
export const fetchComments = id => {
    return dispatch => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts/${id}/comments`, {
            method: "GET",
            headers : {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.detail) {
                    //тут ваша логика
                    console.log(data)
                } else {
                    console.log(data)
                    dispatch(getComments(data.items))
                }
            })
    }
}

const postComment = commentObj => ({
    type: CREATE_COMMENT,
    payload: commentObj
})
export const createPostComment = (id, content) => {
    return dispatch => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/posts/${id}/comments`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(content)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.detail) {
                    //тут ваша логика
                    console.log(data)
                } else {
                    console.log(data)
                    dispatch(postComment(data))
                }
            })
    }
}
// /api/v1/blog/post-comments/{id}/public (DELETE - hide comment by id)
//
// /api/v1/blog/post-comments/{id}/public (POST - unhide comment by id)
const removeCommentAction = id => ({
    type: DELETE_COMMENT,
    payload: id
})
export const removeComemnt = id => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/post-comments/${id}`, {
                method: "DELETE",
                headers : {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            })
                .then(resp => resp.text())
                .then(data => {
                    dispatch(removeCommentAction(id))
                })
                .catch(err => console.error(err));
        }
    }
}
const hideCommentAction = comment => ({
    type: HIDE_COMMENT,
    payload: comment
})
export const hideComment = (id, comment) => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/post-comments/${id}/public`, {
                method: "DELETE",
                headers : {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            })
                .then(resp => resp.text())
                .then(data => {
                    console.log(comment)
                    dispatch(hideCommentAction(comment))
                })
                .catch(err => console.error(err));
        }
    }
}
const showComment = comment => ({
    type: UNHIDE_COMMENT,
    payload: comment
})
export const unhideComment = (id, comment) => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(`https://cors-anywhere.herokuapp.com/https://test-api.febest.dev/api/v1/blog/post-comments/${id}/public`, {
                method: "POST",
                headers : {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            })
                .then(resp => resp.text())
                .then(data => {
                    console.log(data)
                    dispatch(showComment(comment))
                })
                .catch(err => console.error(err));
        }
    }
}






export const filterPosts = value => ({
    type: FILTER_POSTS,
    payload: value
});

export const loadNewPage = payload => ({
    type: LOAD_NEW_PAGE,
    payload
});
export const loadExactPage = payload => ({
    type: LOAD_EXACT_PAGE,
    payload
});