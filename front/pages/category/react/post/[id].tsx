import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { Button } from '@material-ui/core';
import Comment from '../../../../components/Comment';
import Layout from '../../../../components/Layout';
import { RootState } from '../../../../interface/rootstate'
import FavoriteBorderTwoToneIcon from '@material-ui/icons/FavoriteBorderTwoTone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { REMOVE_POST_REQUEST, LOAD_POST_REQUEST, LOAD_POSTS_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, UPDATE_POST_REQUEST } from '../../../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../../../reducers/user';
import { useRouter } from 'next/router';
import wrapper from '../../../../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import dynamic from "next/dynamic";
import useInput from '../../../../hooks/useInput';

const Writer = dynamic(() => import("../../../../components/Writer"), {
    ssr: false,
});


const React = () => { 
    const dispatch = useDispatch();
    const router = useRouter();

    const { id } = router.query;
    const { singlePost } = useSelector((state: RootState) => state.post);
    const { likePostDone, unlikePostDone, updatePostDone, mainPosts, loadPostsLoading } = useSelector((state: RootState) => state.post);
    const [editMode, setEditMode] = useState(false);
    const [title, onChangeTitle, setTitle] = useInput("");
    const [content, setContent] = useState("");

    const onChangePost = useCallback(() => {
        setEditMode(true);
    }, []);

    const onCancelUpdate = useCallback(() => {
        setEditMode(false);
    }, []);

    const onUpload = useCallback(() => {
        dispatch({
            type: UPDATE_POST_REQUEST,
            data: {
                PostId: id,
                title: title,
                content: content
            }
        })
    }, [id, title, content]);

    if (mainPosts.length == 0 && loadPostsLoading == false) {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
    }

    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
    }, [])

    useEffect(() => {
        if (updatePostDone) {
            setTitle('');
            setContent('');
            onCancelUpdate();
        }
    }, [updatePostDone])

    useEffect(() => {
        if (likePostDone || unlikePostDone) {
            dispatch({
                type: LOAD_POST_REQUEST,
                data: id,
            });
        }
    }, [likePostDone, unlikePostDone])

    const onLike = useCallback(() => {
        dispatch({
            type: LIKE_POST_REQUEST,
            data: id,
        })
    }, []);

    const onUnlike = useCallback(() => {
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: id,
        })
    }, []);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: parseInt(id as string, 10),
        })
        router.push('/category/react')
    }, []);

    const me = useSelector((state: RootState) => state.user.me?.id);
    const liked = singlePost.Likers.find((v: any) => v.id === me);

    return (
        <>
            <Head>
                <title>
                    {singlePost.title}
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                {/* <meta property="og:image" content={singlePost.Image[0] ? singlePost.Images[0].src : 'https://jungwooblog.com/favicon.ico'} />
                <meta property="og:url" content={`https://jungwooblog.com/post/${id}`} /> */}
            </Head>
            <Layout>
                <div style={{ margin: '20px' }}>
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>{singlePost.title}</h3>
                    </div>
                    <div style={{ textAlign: 'center', minHeight: '500px' }}>
                        {editMode
                            ? (
                                <form onSubmit={onUpload} style={{ margin: '10px', padding: '10px', border: 'ridge' }}>
                                    <Writer onChangeTitle={onChangeTitle} setContent={setContent} title={singlePost.title} content={singlePost.content} />
                                    <Button type="submit">업로드</Button>
                                    <Button onClick={onCancelUpdate}>취소</Button>
                                </form>
                            )
                            : <div className="ck-content" style={{ textAlign: 'left' }}>{ReactHtmlParser(singlePost.content)}</div>
                        }

                    </div>
                    {liked
                        ? <FavoriteIcon onClick={onUnlike} style={{ color: 'red' }} />
                        : <FavoriteBorderTwoToneIcon onClick={onLike} />
                    }{' '}{singlePost.Likers.length > 0 ? singlePost.Likers.length : null}

                    {me && me === singlePost.User.id
                        ? (
                            <>
                                <Button onClick={onChangePost}>수정</Button>
                                <Button onClick={onRemovePost}>삭제</Button>
                            </>
                        ) : null}
                    <br />
                    <p>{singlePost.Comments.length > 0 ? singlePost.Comments.length : 0}개의 댓글</p>
                    <hr />
                    <Comment commentLists={singlePost.Comments} PostId={parseInt(id as string, 10)} />
                </div>
            </Layout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    })
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params!.id,
    });
    context.store.dispatch(END);
    await context!.store!.sagaTask!.toPromise();
});

export default React;