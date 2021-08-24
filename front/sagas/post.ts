import { all, fork, call, takeEvery, put, throttle } from 'redux-saga/effects';
import axios from 'axios';
import { 
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, 
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, 
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, 
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, 
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE, REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE 
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function likePostAPI(data:any) {
    return axios.patch(`/post/${data}/like`)
}

function* likePost(action:any):any {
    try {
        const result = yield call(likePostAPI, action.data)
        yield put({
            type: LIKE_POST_SUCCESS,  // post reducer
            data: result.data,
        });
    } catch (err){
        console.error(err);
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function unlikePostAPI(data:any) {
    return axios.delete(`/post/${data}/like`)
}

function* unlikePost(action:any):any {
    try {
        const result = yield call(unlikePostAPI, action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,  // post reducer
            data: result.data,
        });
    } catch (err){
        console.error(err);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function loadPostAPI(data:any) {
    return axios.get(`/post/${data}`);
}

function* loadPost(action:any):any {
    try {
        const result = yield call(loadPostAPI, action.data)
        yield put({
            type: LOAD_POST_SUCCESS,  // post reducer
            data: result.data,
        });
    } catch (err){
        console.error(err);
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function loadPostsAPI(data:any) {
    return axios.get('/posts', data)
}

function* loadPosts(action:any):any {
    try {
        const result = yield call(loadPostsAPI, action.data)
        yield put({
            type: LOAD_POSTS_SUCCESS,  // post reducer
            data: result.data,
        });
    } catch (err){
        console.error(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}

function addPostAPI(data:any) {
    return axios.post('/post', data)
}

function* addPost(action:any):any {
    try {
        const result = yield call(addPostAPI, action.data)
        yield put({
            type: ADD_POST_SUCCESS,  // post reducer
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,   // user reducer
            data: result.data.id,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function removePostAPI(data:any) {
    return axios.delete(`/post/${data}`)
}

function* removePost(action:any):any {
    try {
        const result = yield call(removePostAPI, action.data)
        yield put({
            type: REMOVE_POST_SUCCESS,  // post reducer
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,  // user reducer
            data: action.data,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function addCommentAPI(data:any) {
    return axios.post(`/post/${data.postId}/comment`, data)
}

function* addComment(action:any):any {
    try {
        const result = yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }    
}

function removeCommentAPI(data:any) {
    return axios.delete(`/post/${data.postId}/comment/${data.commentId}`);
  }
  
function* removeComment(action:any):any {
    try {
        const result = yield call(removeCommentAPI, action.data);
        yield put({
            type: REMOVE_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}

function updatePostAPI(data:any) {
    return axios.patch(`/post/${data.PostId}`, data);
}

function* updatePost(action:any):any {
    try {
        const result = yield call(updatePostAPI, action.data)
        yield put({
            type: UPDATE_POST_SUCCESS,  // post reducer
            data: result.data,
        });
    } catch (err){
        console.error(err);
        yield put({
            type: UPDATE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLikePost() {
    yield takeEvery(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
    yield takeEvery(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchLoadPost() {
    yield takeEvery(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeEvery(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeEvery(REMOVE_POST_REQUEST, removePost);
}

function* watchUpdatePost() {
    yield takeEvery(UPDATE_POST_REQUEST, updatePost);
}

function* watchAddComment() {
    yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemoveComment() {
    yield takeEvery(REMOVE_COMMENT_REQUEST, removeComment);
}

export default function* postSaga() {
    yield all([
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchRemovePost),
        fork(watchUpdatePost),
        fork(watchAddComment),
        fork(watchRemoveComment),
    ])
}