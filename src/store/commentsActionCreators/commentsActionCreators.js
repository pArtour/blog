//COMMENTS LOGIC
import {CREATE_COMMENT, DELETE_COMMENT, FETCH_COMMENTS, HIDE_COMMENT, UNHIDE_COMMENT} from "../actions";

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
                    console.log(data)
                } else {
                    dispatch(getComments(data.items))
                }
            })
            .catch(err => alert(err))
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
                    console.log(data)
                } else {
                    dispatch(postComment(data))
                }
            })
            .catch(err => console.log(err))
    }
}
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
const hideCommentAction = (comment, postId) => ({
    type: HIDE_COMMENT,
    payload: comment,
    postId
})
export const hideComment = (id, comment, postId) => {
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
                    dispatch(hideCommentAction(comment, postId))
                })
                .catch(err => console.error(err));
        }
    }
}
const showComment = (comment, postId) => ({
    type: UNHIDE_COMMENT,
    payload: comment,
    postId
})
export const unhideComment = (id, comment, postId) => {
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
                    dispatch(showComment(comment, postId))
                })
                .catch(err => console.error(err));
        }
    }
}
