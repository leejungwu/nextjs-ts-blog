import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/Layout';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

import { RootState } from '../interface/rootstate';

const Wrapper = styled.div`
  margin: 30px;
`;

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsLoading } = useSelector((state:RootState)=> state.post);
  if (mainPosts.length == 0 && loadPostsLoading == false) {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }

  return (
    <>
      <Head>
        <title>포트폴리오</title>
      </Head>
      <Layout>
        <Wrapper>
          <h1 style={{ textAlign: 'center' }}>Portfolio</h1>
          <div>
            
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

export default Portfolio;