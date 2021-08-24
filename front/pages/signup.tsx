import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout'

import useInput from '../hooks/useInput';
import { RootState } from '../interface/rootstate'
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { Form, Input, Checkbox, Button } from 'antd';

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUpDone, signUpError, me } = useSelector((state:RootState) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [])
  
  useEffect(() => {
    if (me && me.id) {
      Router.replace('./')
    }
  }, [me && me.id])

  useEffect(() => {
    if (signUpDone) {
      Router.replace('./');
    }
  }, [signUpDone])

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError])

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.currentTarget.value !== password);
    setPasswordCheck(e.currentTarget.value);
  }, [password]);
  
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <Head>
          <title>Sign-Up</title>
      </Head>
      <Layout>
        <div style={{ marginTop: '80px', marginRight: '200px'}}>
          <Form
            {...formItemLayout}
            name="register"
            onFinish={onSubmit}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
            >
              <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              hasFeedback
            >
              <Input.Password name="user-password" value={password} onChange={onChangePassword} required />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
            >
              <Input.Password name="password-check" value={passwordCheck} onChange={onChangePasswordCheck} required />
              {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
              <div>비밀번호는 랜덤 솔트 sha512 방식으로 암호화되어 운영자도 알 수 없습니다. </div>
            </Form.Item>

            <Form.Item
              name="nickname"
              label="Nickname"
              tooltip="What do you want others to call you?"
            >
              <Input name="Nickname" value={nickname} onChange={onChangeNickname} required />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                <Link href="/terms.html"><a>약관</a></Link>에 동의합니다.
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                가입하기
              </Button>
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

export default SignUp;