import React, { useEffect } from 'react'
import Head from 'next/head';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
var relativeTime = require('dayjs/plugin/relativeTime');

import { useSelector, useDispatch } from 'react-redux';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import Layout from '../components/Layout';
import Comment from '../components/Comment';
import Pagination from '../components/Pagination';
import { updateCurrent, updateStateEnd, LOAD_POSTS_REQUEST, LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { CircularProgress } from '@material-ui/core';

import { RootState } from '../interface/rootstate';
import { paginate } from '../utils/paginate';
import { useRouter } from 'next/router';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const TimeStamp = styled.span`
  float: right;
  margin-left: 20px;
`;

const Wrapper = styled.div`
  margin: 30px;
`;


const Index: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singlePost, mainPosts, pageSize, currentPage, start, end, loadPostsLoading, addCommentDone } = useSelector((state: RootState) => state.post);
  
  useEffect(() => {
    if (addCommentDone) {
      dispatch({
        type: LOAD_POST_REQUEST,
        data: '1' as string,
    });
    }
  },[])

  if (mainPosts.length == 0 && loadPostsLoading == false) {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }

  const Posts = mainPosts.filter((v: any) => v.id !== 1);
  const pagedData = paginate(Posts, currentPage, pageSize);
  const handlePageChange = (page: number) => {  //db에 저장x
    dispatch(updateCurrent(page));
  }

  const handleStartEndChange = (start: number, end: number) => {
    dispatch(updateStateEnd({ start, end }));
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Wrapper>
          <h1 style={{ textAlign: 'center' }}>Home</h1>
          <br />
          {loadPostsLoading ? <CircularProgress size={40} style={{ margin:'100px auto', display:'flex'}}/>:(
            <table className="table">
              <tbody>
                {pagedData.map((data) => (
                  <tr key={data.id}>
                    {data.title ? (
                      <td>
                        <a onClick={() => {
                          router.push(`/home/post/${data.id}`)
                          dispatch({
                            type: LOAD_POST_REQUEST,
                            data: data.id,
                          });
                      }}>{data.title}</a>
                      </td>
                    )
                      : (
                        <td>
                          <a onClick={() => {
                            router.push(`/home/post/${data.id}`)
                            dispatch({
                              type: LOAD_POST_REQUEST,
                              data: data.id,
                            });
                        }}>Non-title</a>
                        </td>
                      )
                    }
                    <td width='32%'><TimeStamp>{dayjs(data.createdAt).locale('ko').fromNow()}</TimeStamp></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pagination
              pageSize={pageSize}
              itemsCount={Posts.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onStartEndChange={handleStartEndChange}
              start={start}
              end={end}
            />
          </div>
          <br />
          <h2 style={{ textAlign: 'center' }}>방명록·질문</h2>
          <br />
          <p>{singlePost.Comments.length > 0 ? singlePost.Comments.length : 0}개의 댓글</p>
          <hr />
          <Comment commentLists={singlePost.Comments} PostId={1} />
        </Wrapper>
      </Layout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {                    // 쿠키를 써서 요청을 보낼때만(쿠키 공유방지)
    axios.defaults.headers.Cookie = cookie;       // 프론트에서 서버로 쿠키 전달
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: '1' as string,
  });

  context.store.dispatch(END);                    // SUCCESS 까지 기다림
  await context?.store?.sagaTask?.toPromise();
});

export default Index;
