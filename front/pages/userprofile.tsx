import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/Layout'
import { Form, Button, Input } from 'antd';

import useInput from '../hooks/useInput';
import { RootState } from '../interface/rootstate'
import { CHANGE_NICKNAME_REQUEST, LOAD_MY_INFO_REQUEST, SIGN_OUT_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 30px;
`;

const ButtonWrapper = styled(Button)`
  margin: 10px;
`

const UserProfile: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const { mainPosts, loadPostsLoading } = useSelector((state:RootState)=> state.post);
    if (mainPosts.length == 0 && loadPostsLoading == false) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
    }

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

    const onSignOut = useCallback(() => {
      var answer = confirm('정말 탈퇴하시겠습니까?');
      if (answer == true) {
        dispatch({
          type: SIGN_OUT_REQUEST,
        });
      }
    }, []);

    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 10 },
    };
  
    const tailLayout = {
      wrapperCol: { offset: 5, span: 10 },
    };
    
    return (
      <>
        <Head>
          <title>UserProfile</title>
        </Head>
        <Layout>
          <Wrapper>
            <h2 style={{ textAlign: 'center' }}>설정</h2>
            <h4 style={{ margin: '25px'}}>개인정보 수정</h4>
            <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            >
              <Form.Item
                label="현재 이름"
                name="user-nickname"
              >
                <Input name="user-nickname" placeholder={me?.nickname!} readOnly required />
              </Form.Item>

              <Form.Item
                label="바꿀 이름"
                name="new-nickname"
                rules={[{ required: true, message: '새로운 별명을 입력하세요' }]}
              >
                <Input name="new-nickname" value={nickname} onChange={onChangeNickname} required />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <ButtonWrapper htmlType="submit" >
                  변경
                </ButtonWrapper>
              </Form.Item>
            </Form>
            <h4 style={{ margin: '25px'}}>회원탈퇴</h4>
            <Button style={{ marginLeft: '25px' }} onClick={onSignOut} >
              탈퇴하기
            </Button>
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