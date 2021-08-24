import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/Layout';
import wrapper from '../store/configureStore';
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';
import { Table, Tag } from 'antd';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Wrapper = styled.div`
  margin: 30px;
`;

const columns = [
  {
    title: '학교',
    dataIndex: '학교',
    key: '학교',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: '전공',
    dataIndex: '전공',
    key: '전공',
  },
  {
    title: '기간',
    dataIndex: '기간',
    key: '기간',
  },
  {
    title: '구분',
    key: '구분',
    dataIndex: '구분',
    render: (tags:any) => (
      <>
        {tags.map((tag:any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          // if (tag === '중퇴') {
          //   color = 'volcano';
          // }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data = [
  {
    학교: '대구가톨릭대학교 사범대학부속 무학고등학교',
    전공: '',
    기간: '2010. 3 ~ 2013. 2',
    구분: ['졸업'],
  },
  {
    학교: '대구가톨릭대학교',
    전공: '컴퓨터공학',
    기간: '2017. 3 ~ 2021. 2',
    구분: ['졸업'],
  },
  {
    학교: 'Angelo State University',
    전공: 'Computer Science',
    기간: '2019. 1 ~ 2019. 5',
    구분: ['Exchange Student'],
  },
];

const Profile: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [])

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Layout>
        <Wrapper>
          <h1 style={{ textAlign: 'center' }}>About</h1>
            <div>
              <h4>이정우 Jungwoo Lee</h4>
              <br/>
              <ul style={{ listStyleType:'circle'}}>
                <li>1995.1.11</li>
                <li>010-8250-8811</li>
                <li>ljw53800@gmail.com</li>
                <li>블로그 개발 기간: 2021.5.1 ~ 진행 중</li>
                <li>블로그 기술스택
                  <ul>
                    <li>Node, express</li>
                    <li>Nextjs</li>
                    <li>Typescript</li>
                    <li>Redux saga</li>
                    <li>MySQL</li>
                    <li>Material-ui, bootstrap, ant-design</li>
                  </ul>
                </li>
                <li>github link: <a href="https://www.github.com/leejungwu">https://www.github.com/leejungwu</a></li>
              </ul>
              <br/><br/><br/><br/>
              <h5>Education</h5>
              <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
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
  };
  context.store.dispatch({      
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);      
  await context?.store?.sagaTask?.toPromise();
});

export default Profile