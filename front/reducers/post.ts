import { AnyAction } from "redux"
import { IPost } from '../interface/post';
import produce from 'immer';

export const initialState = {
    mainPosts: [],
    singlePost: { Comments: []},
    pageSize: 10,
    currentPage: 1,
    start: 0,
    end: 10,
    likePostDone: false,
    likePostError: null,
    unlikePostDone: false,
    unlikePostError: null,
    loadPostDone: false,
    loadPostError: null,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostDone: false,
    addPostError: null,
    removePostDone: false,
    removePostError: null,
    updatePostDone: false,
    updatePostError: null,
    addCommentDone: false,
    addCommentError: null,
    removeCommentDone: false,
    removeCommentError: null,
};

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_STATE_END_PAGE = 'UPDATE_STATE_END_PAGE';


export const addPost= (data:any) => ({
    type: ADD_POST_REQUEST,
    data,
})

export const addComment= (data:any) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

export const updateCurrent = (data:number) => {
    return {
        type: UPDATE_CURRENT_PAGE,
        data,
    }
}

export const updateStateEnd = (data:any) => {
    return {
        type: UPDATE_STATE_END_PAGE,
        data,
    }
}

const reducer = (state: IPost | undefined = initialState, action: AnyAction) => { // { return } 생략가능
    return produce(state, (draft) => {
        switch (action.type) {
            case LIKE_POST_REQUEST:
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v:any) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId });
                draft.likePostDone = true;   
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostError = action.error;
                break;
            case UNLIKE_POST_REQUEST:
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v:any) => v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v:any) => v.id !== action.data.UserId);
                draft.unlikePostDone = true;   
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostError = action.error;
                break;
            case LOAD_POST_REQUEST:
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS: 
                draft.singlePost = action.data;
                draft.loadPostDone = true;   
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostError = action.error;
                break;
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS: 
                draft.loadPostsLoading = false;
                draft.mainPosts = action.data;
                draft.loadPostsDone = true;   
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v:any) => v.id === action.data.PostId);
                post.Comments.unshift(action.data);
                draft.addCommentDone = true;   
                break;
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentError = action.error;
                break;
            case REMOVE_COMMENT_REQUEST:
                draft.removeCommentDone = false;
                draft.removeCommentError = null;
                break;
            case REMOVE_COMMENT_SUCCESS: {
                const Post = draft.mainPosts.find((v:any) => v.id === action.data.PostId);
                Post.Comments = Post.Comments.filter((v:any) => v.id !== action.data.CommentId);
                draft.removeCommentDone = true;   
                break;
            }
            case REMOVE_COMMENT_FAILURE:
                draft.removeCommentError = action.error;
                break; 
            case ADD_POST_REQUEST:
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(action.data);
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = state.mainPosts.filter((v:any) => v.id !== action.data.PostId);
                draft.removePostDone = true;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostError = action.error;
                break;
            case UPDATE_CURRENT_PAGE:
                draft.currentPage = action.data;
                break;
            case UPDATE_STATE_END_PAGE:
                draft.start = action.data.start;
                draft.end = action.data.end;
                break;
            case UPDATE_POST_REQUEST:
                draft.updatePostDone = false;
                draft.updatePostError = null;
                break;
            case UPDATE_POST_SUCCESS: 
                draft.mainPosts.find((v:any) => v.id === action.data.PostId).title = action.data.title;
                draft.mainPosts.find((v:any) => v.id === action.data.PostId).content = action.data.content;
                draft.updatePostDone = true;   
                break;
            case UPDATE_POST_FAILURE:
                draft.updatePostError = action.error;
                break;
            default:
                break;
            }
    });
}

export default reducer;