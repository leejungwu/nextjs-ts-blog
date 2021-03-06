import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import Layout from '../components/Layout';
import wrapper from '../store/configureStore';
import dynamic from "next/dynamic";
import useInput from '../hooks/useInput';
import { Button } from '@material-ui/core';
import { Menu, Dropdown } from 'antd';
import { RootState } from '../interface/rootstate'
import { DownOutlined } from '@ant-design/icons';
import { addPost } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const Writer = dynamic(() => import("../components/Writer"), {
  ssr: false,
});

const Write = () => {
  const dispatch = useDispatch();
  const { addPostDone, mainPosts, loadPostsLoading } = useSelector((state: RootState) => state.post);
  const [title, onChangeTitle, setTitle] = useInput("");
  const [content, setContent] = useState<EditorState>(EditorState.createEmpty());
  const [category, setCategory] = useState("");

  if (mainPosts.length == 0 && loadPostsLoading == false) {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }

  useEffect(() => {
    if (addPostDone) {
      setTitle('');
      setContent(EditorState.createEmpty());
    }
  }, [addPostDone])

  const onSubmit = useCallback(() => {
    console.log(title, draftToHtml(convertToRaw(content.getCurrentContent())));
    dispatch(addPost({ category: category, title: title, content: draftToHtml(convertToRaw(content.getCurrentContent())) }));
  }, [category, title, content]);

  const onCategory = ({ key }: any) => {
    setCategory(key)
  }

  const handleEditorStateChange = (editorState:any) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setContent(editorState);
  }

  const menu = (
    <Menu onClick={onCategory}>
      <Menu.Item key="algorithm">algorithm</Menu.Item>
      <Menu.Item key="javascript">javascript</Menu.Item>
      <Menu.Item key="nodejs">nodejs</Menu.Item>
      <Menu.Item key="react">react</Menu.Item>
      <Menu.Item key="interview">??????</Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <form onSubmit={onSubmit} style={{ margin: '10px', padding: '10px', border: 'ridge' }}>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Click menu item <DownOutlined />
          </a>
        </Dropdown>
        <Writer onChangeTitle={onChangeTitle} content={content} handleEditorStateChange={handleEditorStateChange} />
        <Button type="submit">upload</Button>
      </form>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context?.store?.sagaTask?.toPromise();
});

export default Write