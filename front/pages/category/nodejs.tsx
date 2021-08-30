import React, { useEffect } from 'react'
import Head from 'next/head';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
var relativeTime = require('dayjs/plugin/relativeTime');

import { useSelector, useDispatch } from 'react-redux';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import { updateCurrent, updateStateEnd, LOAD_POSTS_REQUEST, LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { CircularProgress } from '@material-ui/core';

import { RootState } from '../../interface/rootstate'
import { paginate } from '../../utils/paginate';
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


const Nodejs: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { mainPosts, pageSize, currentPage, start, end, loadPostsLoading } = useSelector((state:RootState) => state.post);

  if (mainPosts.length == 0 && loadPostsLoading == false) {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }

  const nodejsPosts = mainPosts.filter((v:any) => v.category === 'nodejs');
  const pagedData = paginate(nodejsPosts, currentPage, pageSize);

  const handlePageChange = (page:number) => {  //db에 저장x
    dispatch(updateCurrent(page));
  }

  const handleStartEndChange = (start:number, end:number) => {
    dispatch(updateStateEnd({start,end}));
  }
  
  return (
      <>
        <Head>
            <title>Nodejs</title>
        </Head>
        <Layout>
            <Wrapper>
              <h1 style={{ textAlign: 'center' }}>Nodejs</h1>
              <br/>
              {loadPostsLoading ? <CircularProgress size={40} style={{ margin:'100px auto', display:'flex'}}/>:(
                <table className="table">
                  <tbody>
                  {pagedData.map((data) => (
                      <tr key={data.id}>
                        {data.title ? (
                          <td><a onClick={() => {
                            router.push(`/category/nodejs/post/${data.id}`)
                            dispatch({
                              type: LOAD_POST_REQUEST,
                              data: data.id,
                            });
                          }}>{data.title}</a></td>
                        )
                        : (
                          <td><a onClick={() => {
                            router.push(`/category/nodejs/post/${data.id}`)
                            dispatch({
                              type: LOAD_POST_REQUEST,
                              data: data.id,
                            });
                          }}>non title</a></td>
                        )
                      }
                        <td><TimeStamp>{dayjs(data.createdAt).locale('ko').fromNow()}</TimeStamp></td>
                      </tr>
                    ))}
                  </tbody>
                </table> 
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination 
                pageSize={pageSize} 
                itemsCount={nodejsPosts.length} 
                currentPage={currentPage} 
                onPageChange={handlePageChange}
                onStartEndChange={handleStartEndChange}
                start={start}
                end={end}
              />
              </div>
            </Wrapper>
        </Layout>
      </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie: '';
  axios.defaults.headers.Cookie = '';  
  if (context.req && cookie) {                  
    axios.defaults.headers.Cookie = cookie;     
  }
  context.store.dispatch({      
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch(END);      
  await context?.store?.sagaTask?.toPromise();
});

export default Nodejs;