import { all, fork, call, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, 
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE, 
} from '../reducers/user';

function loadMyInfoAPI() {
    return axios.get('/user')
}

function* loadMyInfo():any {   
    try {
        const result = yield call(loadMyInfoAPI)
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        })
    }
}

function logInAPI(data:any) {
    return axios.post('/user/login', data)
}

function* logIn(action:any):any {
    try {
        const result = yield call(logInAPI, action.data)
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
}

function logOutAPI() {
    return axios.post('/user/logOut');
}

function* logOut():any {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}

function signUpAPI(data:any) {
    return axios.post('/user', data)
}

function* signUp(action:any):any {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function ChangeNicknameAPI(data:any) {
    return axios.patch('/user/nickname', { nickname: data });
}

function* ChangeNickname(action:any):any {
    try {
        const result = yield call(ChangeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        })
    } catch (err){
        console.error(err);
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchChangeNickname() {
    yield takeEvery(CHANGE_NICKNAME_REQUEST, ChangeNickname);
}

function* watchLoadMyInfo() {
    yield takeEvery(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogIn() {
    yield takeEvery(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchChangeNickname),
        fork(watchLoadMyInfo),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}