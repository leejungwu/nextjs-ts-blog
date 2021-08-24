import React, { useCallback, useEffect } from 'react'
import Head from 'next/head';
// import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';

import { Form, Input, Button } from 'antd';

import { loginRequestAction } from '../reducers/user';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

import useInput from '../hooks/useInput';
import { RootState } from '../interface/rootstate';
import Router from 'next/router';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
  margin: 10px;
`


const Login = () => {
  const dispatch = useDispatch();

  const { me, logInError, logInLoading } = useSelector((state:RootState)=> state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (me && me.id) {
      Router.replace('./')
    }
  }, [me && me.id])

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [])
  
  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])

  useEffect(() => {
    dispatch({      
      type: LOAD_MY_INFO_REQUEST,
    })
  }, [])

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email,password]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <>
      <Head>
          <title>login</title>
      </Head>
      <Layout>
        <div style={{ marginTop: '80px', marginRight: '200px'}}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmitForm}
          >
            <Form.Item
              label="이메일"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password name="user-password" value={password} onChange={onChangePassword} required />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <ButtonWrapper htmlType="submit" loading={logInLoading}>
                로그인
              </ButtonWrapper>
              {/* <ButtonWrapper shape='round'>
                <Link href="http://api.jdoubleu.me/auth/kakao">카카오</Link>
              </ButtonWrapper> */}
            </Form.Item>
          </Form>
        </div>
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

export default Login