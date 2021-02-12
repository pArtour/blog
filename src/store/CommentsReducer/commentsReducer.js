import {
    FETCH_COMMENTS,
    CREATE_COMMENT,
    HIDE_COMMENT,
    UNHIDE_COMMENT,
    DELETE_COMMENT
} from "../actions";
const initialState = {
    postComments: [],
    hiddenComments: localStorage.comments ? JSON.parse(localStorage.comments) : {}
}
export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return {...state, postComments: [...action.payload]}
        case CREATE_COMMENT:
            return {...state, postComments: [...state.postComments, action.payload]}
        case DELETE_COMMENT:
            return {
                ...state,
                postComments: state.postComments.filter(comment => comment.id !== action.payload)
            }
        case HIDE_COMMENT:
            if (localStorage.comments) {
                const hiddenCommentsStorage = JSON.parse(localStorage.comments);
                let newHiddenCommentsStorage;
                hiddenCommentsStorage.hasOwnProperty(`${action.postId}`) ? newHiddenCommentsStorage = {
                    ...hiddenCommentsStorage,
                    [`${action.postId}`]: [...hiddenCommentsStorage[`${action.postId}`], action.payload]
                } : newHiddenCommentsStorage = {
                    ...hiddenCommentsStorage,
                    [`${action.postId}`]: [action.payload]
                }
                localStorage.setItem("comments", JSON.stringify(newHiddenCommentsStorage));
                return {
                    ...state,
                    hiddenComments: newHiddenCommentsStorage,
                    postComments: state.postComments.filter(comment => comment.id !== action.payload.id)
                }
            } else {
                const hiddenComments = {[`${action.postId}`]: [action.payload]}
                localStorage.setItem("comments", JSON.stringify(hiddenComments));
                return {
                    ...state,
                    hiddenComments,
                    postComments: state.postComments.filter(comment => comment.id !== action.payload.id)
                }
            }
        case UNHIDE_COMMENT:
            const hiddenComments = JSON.parse(localStorage.comments);
            const newHiddenComments = hiddenComments[`${action.postId}`].filter(comment => comment.id !== action.payload.id);

            localStorage.setItem("comments", JSON.stringify({...hiddenComments, [`${action.postId}`]: newHiddenComments}));
            return {
                ...state,
                hiddenComments: {
                    ...state.hiddenComments,
                    [`${action.postId}`]: state.hiddenComments[`${action.postId}`].filter(comment => comment.id !== action.payload.id)
                },
                postComments: [...state.postComments, action.payload]
            }
        default:
            return state;
    }
}