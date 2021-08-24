import React, { useCallback, useEffect } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@material-ui/core';

import { loginRequestAction } from '../reducers/user'

import useInput from '../hooks/useInput';
import { RootState } from '../interface/rootstate';
import Router from 'next/router';

const Login = () => {
  const dispatch = useDispatch();
  const { me, logInError } = useSelector((state:RootState) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (me && me.id) {
      Router.replace('./')
    }
  }, [me && me.id])

  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])
  
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    dispatch(loginRequestAction({ email, password }));
  }, [email,password]);

  return (
    <>
        <form onSubmit={onSubmitForm}>
        <div>
            <label htmlFor="user-email">아이디</label>
            <br/>
            <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
        </div>
        <div>
            <label htmlFor="user-password">비밀번호</label>
            <br/>
            <Input name="user-password" value={password} onChange={onChangePassword} required />
        </div>
        <div>
            <Button type="submit">로그인</Button>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </div>
        </form>
    </>
  )
}
export default Login