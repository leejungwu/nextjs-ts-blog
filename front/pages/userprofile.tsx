import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/Layout'
import { Button, Input } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import useInput from '../hooks/useInput';
import { RootState } from '../interface/rootstate'
import { CHANGE_NICKNAME_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 30px;
`;

const UserProfile: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
    }, [])

    useEffect(() => {
      dispatch({
          type: LOAD_MY_INFO_REQUEST,
      })
    },[]);

    const { me } = useSelector((state:RootState) => state.user);
    const [nickname, onChangeNickname] = useInput('');
    
    const onSubmit = useCallback(() => {
      dispatch({
        type: CHANGE_NICKNAME_REQUEST,
        data: nickname,
      })
    }, [nickname]);
    
    return (
      <>
        <Head>
          <title>UserProfile</title>
        </Head>
        <Layout>
          <Wrapper>
            <h1 style={{ textAlign: 'center' }}>설정</h1>
              <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <label htmlFor="user-email">현재이름</label>
                        <Input name="user-email" value={me?.nickname!} readOnly/>
                    </Grid>
                    <Grid item xs={12}>
                        <label htmlFor="user-password">바꿀 이름</label>
                        <Input name="user-password" value={nickname} onChange={onChangeNickname} required />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit">변경</Button>
                    </Grid>
                </Grid>
            </form>
            <div>회원탈퇴</div>
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

export default UserProfile;