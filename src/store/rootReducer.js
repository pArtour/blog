import {combineReducers} from "redux";
import {userReducer} from "./UserReducer/userReducer";
import {postsReducer} from "./PostsReducer/postsReducer";
import {commentsReducer} from "./CommentsReducer/commentsReducer";

export const reducer = combineReducers({
    userState: userReducer,
    postsState: postsReducer,
    commentsState: commentsReducer
});