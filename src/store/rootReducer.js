import {
    LOGIN_USER,
    LOGOUT_USER,
    FETCH_POSTS,
    SET_ISLOGGED,
    FILTER_POSTS,
    FETCH_COMMENTS,
    CREATE_POST,
    CREATE_COMMENT,
    LOAD_NEW_PAGE,
    LOAD_EXACT_PAGE,
    DELETE_POST,
    GET_CURRENT_POST,
    UPDATE_POST,
    HIDE_COMMENT,
    UNHIDE_COMMENT,
    DELETE_COMMENT
} from "./actions";

const initialState = {
    currentUser: {},
    isLogged: false,

    posts: [],
    currentPost: null,
    filteredPosts: [],
    currentPosts: [],
    appliedFilters: [],
    postComments: [],
    hiddenComments: localStorage.comments ? JSON.parse(localStorage.comments) : [],
    postIsUpdated: false,
    currentPage: 0,
    countPerPage: 2,
    currentCount: 0,
    totalPages: 0,
    filteredPages: 0
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, currentUser: action.payload, isLogged: action.isLogged}
        case LOGOUT_USER:
            return {...state, currentUser: {}, isLogged: action.payload }
        case SET_ISLOGGED:
            return {...state, isLogged: action.payload}

        case FETCH_POSTS:
            // let count = action.payload.length;
            const countPerPage = 2;

            const totalPages = Math.ceil(action.payload.length / countPerPage);

            return {
                ...state,
                posts: action.payload,
                filteredPosts: action.payload,
                totalPages: totalPages,
                filteredPages: totalPages,
                offset: state.currentPage * state.countPerPage
            }
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
        case LOAD_NEW_PAGE:
            console.log(state)
            let loadNewPageState = {...state};
            let addPages = action.payload.page;
            loadNewPageState.currentPage += addPages;

            let perPage = loadNewPageState.countPerPage;
            let nextPosts;
            if (addPages === 1){
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount;
                loadNewPageState.currentCount += loadNewPageState.countPerPage;
                nextPosts = loadNewPageState.posts.slice(lowerCount, upperCount);
            }
            if (addPages === -1){
                let upperCount = loadNewPageState.currentCount;
                let lowerCount = loadNewPageState.currentCount - perPage;
                loadNewPageState.currentCount -= loadNewPageState.countPerPage;
                nextPosts = loadNewPageState.posts.slice(lowerCount - perPage, upperCount - perPage);
            }
            loadNewPageState.filteredProducts = nextPosts;
            return loadNewPageState;

        case LOAD_EXACT_PAGE:
            // const exactPageState = {...state};
            const indexOfLast = action.payload * state.countPerPage;
            const indexOfFirstTodo = indexOfLast - state.countPerPage;

            const offset = action.payload * state.countPerPage;
            console.log(offset)
            return {
                ...state,
                currentPage: action.payload,
                offset: action.payload * state.countPerPage,
                filteredPosts: state.posts.slice(indexOfLast, indexOfFirstTodo)
            }

            // return exactPageState;


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
                newState.filteredCount = newState.filteredPosts.length;
                newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);
            } else {
                appliedFilters = removeFilter(FILTER_POSTS, appliedFilters);
                if (appliedFilters.length === 0) {
                    newState.filteredPosts = newState.posts;
                    newState.filteredCount = newState.filteredPosts.length;
                    newState.filteredPages = Math.ceil(
                        newState.filteredCount / newState.countPerPage
                    );
                }
            }
            return newState;
        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts.filter(post => post.id !== action.payload)],
                filteredPosts: [...state.filteredPosts.filter(post => post.id !== action.payload)]
            }

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
                const newHiddenCommentsStorage = [...hiddenCommentsStorage, action.payload];
                localStorage.setItem("comments", JSON.stringify(newHiddenCommentsStorage));
                return {
                    ...state,
                    hiddenComments: newHiddenCommentsStorage,
                    postComments: state.postComments.filter(comment => comment.id !== action.payload.id)
                }
            } else {
                const hiddenComments = [action.payload]
                localStorage.setItem("comments", JSON.stringify(hiddenComments));
                return {
                    ...state,
                    hiddenComments,
                    postComments: state.postComments.filter(comment => comment.id !== action.payload.id)
                }
            }
        case UNHIDE_COMMENT:
            const hiddenComments = JSON.parse(localStorage.comments);
            const newHiddenComments = hiddenComments.filter(comment => comment.id !== action.payload.id);
            localStorage.setItem("comments", JSON.stringify(newHiddenComments));
            return {
                ...state,
                hiddenComments: state.hiddenComments.filter(comment => comment.id !== action.payload.id),
                postComments: [...state.postComments, action.payload]
            }

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