import {
    FETCH_POSTS,
    FILTER_POSTS,
    CREATE_POST,
    DELETE_POST,
    GET_CURRENT_POST,
    UPDATE_POST, SHOW_ALERT, HIDE_ALERT,
} from "../actions";
const initialState = {
    posts: [],
    currentPost: null,
    filteredPosts: [],
    appliedFilters: [],
    postIsUpdated: false,
    alert: null
}
export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {...state, posts: action.payload, filteredPosts: action.payload}
        case GET_CURRENT_POST:
            return {...state, currentPost: action.payload, postIsUpdated: false}
        case UPDATE_POST:
            return {
                ...state,
                postIsUpdated: true,
                currentPost: action.payload,
                posts: [...state.posts.filter(post => post.id !== action.payload.id), action.payload],
                filteredPosts: [...state.filteredPosts.filter(post => post.id !== action.payload.id), action.payload]
            }
        case CREATE_POST:
            return {...state, posts: [...state.posts, action.payload], filteredPosts: [...state.filteredPosts ,action.payload]}
        case FILTER_POSTS:
            let newState = {...state}
            let value = action.payload.toLowerCase();
            let filteredValues = state.posts.filter(post => {
                return post.title.toLowerCase().includes(value) ||
                    post.content.toLowerCase().includes(value);
            });
            let appliedFilters = state.appliedFilters;
            if (value) {
                appliedFilters = addFilterIfNotExists(FILTER_POSTS, appliedFilters);
                newState.filteredPosts = filteredValues;
            } else {
                appliedFilters = removeFilter(FILTER_POSTS, appliedFilters);
                if (appliedFilters.length === 0) {
                    newState.filteredPosts = newState.posts;
                }
            }
            return newState;
        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts.filter(post => post.id !== action.payload)],
                filteredPosts: [...state.filteredPosts.filter(post => post.id !== action.payload)]
            }
        case SHOW_ALERT:
            return {...state, alert: action.payload}
        case HIDE_ALERT:
            return {...state, alert: null}
        default:
            return state;
    }
}
function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index === -1) appliedFilters.push(filter);

    return appliedFilters;
}
function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}