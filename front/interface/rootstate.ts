export interface RootState {
    user: {
        loadMyInfoDone: boolean,
        loadMyInfoError: any,
        logInLoading: boolean,
        logInDone: boolean,
        logInError: any,
        logOutLoading: boolean,
        logOutDone: boolean,
        logOutError: any,
        signUpDone: boolean,
        signUpError: any,
        signOutDone: boolean,
        signOutError: any, 
        changeNicknameDone: boolean,
        changeNicknameError: any,
        me: any,
        signUpData: any,
        loginData: any,
    },
    post: {
        mainPosts: any,
        singlePost: any,
        pageSize: number,
        currentPage: number,
        start: number,
        end: number,
        likePostDone: boolean,
        likePostError: any,
        unlikePostDone: boolean,
        unlikePostError: any,
        loadPostDone: boolean,
        loadPostError: any,
        loadPostsLoading: boolean,
        loadPostsDone: boolean,
        loadPostsError: any,
        addPostDone: boolean,
        addPostError: any,
        removePostDone: boolean,
        removePostError: any,
        updatePostDone: boolean,
        updatePostError: any,
        addCommentDone: boolean,
        addCommentError: any,
        removeCommentDone: boolean,
        removeCommentError: any,
    }
}