import React from 'react'
import Link from 'next/link';
import { Button } from '@material-ui/core';
// import LoginForm from './LoginForm';

const LoginMenu: React.FunctionComponent = () => {
  return (
      <>
        <div>
            {/* <LoginForm/> */}
            <Link href="/login"><Button>로그인</Button></Link>
            <Link href="/signup"><Button>회원가입</Button></Link>
        </div>
      </>
  )
}

export default LoginMenu