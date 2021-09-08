import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/Layout';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { Modal } from "react-bootstrap";

import { RootState } from '../interface/rootstate';

const Wrapper = styled.div`
  margin: 30px;
`;

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [jwShow, setJwShow] = useState(false);
  const [nodeShow, setNodeShow] = useState(false);
  const [bookShow, setBookShow] = useState(false);
  const [dcuShow, setDcuShow] = useState(false);

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
        <script src="https://kit.fontawesome.com/a72e3c1afa.js" crossOrigin="anonymous"></script>
      </Head>
      <Layout>
        <Wrapper>
          <h1 style={{ textAlign: 'center' }}>Portfolio</h1>
          <div className="filtered-list">
            <input type="radio" name="category" id="category-all" defaultChecked={true}/>
            <input type="radio" name="category" id="category-personal" />
            <input type="radio" name="category" id="category-competition" />
            <input type="radio" name="category" id="category-schoolwork" />
            <div className="filter-labels">
              <div className="filter-label-list">
                <div className="segmented-control">
                  <label htmlFor="category-all" id="label-category-all">all (4)</label>
                  <label htmlFor="category-personal" id="label-category-personal">personal (3)</label>
                  <label htmlFor="category-competition" id="label-category-competition">competiton (1)</label>
                  <label htmlFor="category-schoolwork" id="label-category-schoolwork">schoolwork (1)</label>
                </div>
              </div>
            </div>

            <section id="projects" className="row">
              <div id="blog" className="col-12 col-sm-6 col-md-4 project category-personal" onClick={() => setJwShow(true)}>
                <div className="box-visible">
                  <h3 className="mb-2">
                    <b>JW blog</b>
                  </h3>
                  <div className="mb-2">
                    <div className="extra-links">
                      <a href="https://jdoub.me/" target="_blank"><i className="fas fa-link"> Link</i></a>
                      <a href="https://github.com/leejungwu/nextjs-ts-blog" target="_blank"><i className="fab fa-github"></i> Code</a>
                    </div>
                  </div>
                  <div className="teaser">
                    <img src="/jdoub.png" alt="Loading..." data-action="zoom"/>
                  </div>
                  <p className="description">Portfolio website</p>
                  <p className="keywords">web development</p>
                  <div>
                    <small className="badge">personal</small>
                  </div>
                </div>
              </div>

              <div id="blog" className="col-12 col-sm-6 col-md-4 project category-personal" onClick={() => setNodeShow(true)}>
                <div className="box-visible">
                  <h3 className="mb-2">
                    <b>Nodejs blog</b>
                  </h3>
                  <div className="mb-2">
                    <div className="extra-links">
                      <a href="https://www.jungwooblog.com/" target="_blank"><i className="fas fa-link"> Link</i></a>
                      <a href="https://github.com/leejungwu/nodeblog" target="_blank"><i className="fab fa-github"></i> Code</a>
                    </div>
                  </div>
                  <div className="teaser">
                    <img src="/jungwooblog.png" alt="Loading..." data-action="zoom"/>
                  </div>
                  <p className="description">Blog-based bulletin board project</p>
                  <p className="keywords">web development</p>
                  <div>
                    <small className="badge">personal</small>
                  </div>
                </div>
              </div>

              <div id="blog" className="col-12 col-sm-6 col-md-4 project category-personal" onClick={() => setBookShow(true)}>
                <div className="box-visible">
                  <h3 className="mb-2">
                    <b>Address book</b>
                  </h3>
                  <div className="mb-2">
                    <div className="extra-links">
                      <a href="http://agile-plains-39979.herokuapp.com" target="_blank"><i className="fas fa-link"> Link</i></a>
                      <a href="https://github.com/leejungwu/Address-book" target="_blank"><i className="fab fa-github"></i> Code</a>
                    </div>
                  </div>
                  <div className="teaser">
                    <img src="/addressbook.png" alt="Loading..." data-action="zoom"/>
                  </div>
                  <p className="description">Web Application to use as addressbook</p>
                  <p className="keywords">web development</p>
                  <div>
                    <small className="badge">personal</small>
                  </div>
                </div>
              </div>

              <div id="blog" className="col-12 col-sm-6 col-md-4 project category-competition category-schoolwork" onClick={() => setDcuShow(true)}>
                <div className="box-visible">
                  <h3 className="mb-2">
                    <b>DCU time</b>
                  </h3>
                  <div className="mb-2">
                    <div className="extra-links">
                      <a href="http://13.124.26.140/" target="_blank"><i className="fas fa-link"> Link</i></a>
                      <a href="https://github.com/leejungwu/DCU" target="_blank"><i className="fab fa-github"></i> Code</a>
                    </div>
                  </div>
                  <div className="teaser">
                    <img src="/dcutime.png" alt="Loading..." data-action="zoom"/>
                  </div>
                  <p className="description">Social media service for DCU SW Exhibition</p>
                  <p className="keywords">web development</p>
                  <div>
                    <small className="badge">schoolwork</small>
                    <small className="badge">competition</small>
                  </div>
                </div>
              </div>

            </section>

            <Modal show={jwShow} onHide={() => setJwShow(false)}>
              <Modal.Body>
              <h3 className="mb-2">
                    <b>JW blog</b>
                  </h3>
                  <div className="mb-2">
                    <div className="extra-links">
                      <a href="https://jdoub.me/" target="_blank"><i className="fas fa-link"> Link</i></a>
                      <a href="https://github.com/leejungwu/nextjs-ts-blog" target="_blank"><i className="fab fa-github"></i> Code</a>
                    </div>
                  </div>
                  <div className="teaser">
                    <img src="/jdoub.png" alt="Loading..." data-action="zoom"/>
                  </div>
                  <p className="description">Portfolio website</p>
              </Modal.Body>
            </Modal>

            <Modal show={nodeShow} onHide={() => setNodeShow(false)}>
              <Modal.Body>
                  <h3 className="mb-2">
                    <b>Nodejs blog</b>
                  </h3>
                  <div className="mb-2">
                    <div className="extra-links">
                      <a href="https://www.jungwooblog.com/" target="_blank"><i className="fas fa-link"> Link</i></a>
                      <a href="https://github.com/leejungwu/nodeblog" target="_blank"><i className="fab fa-github"></i> Code</a>
                    </div>
                  </div>
                  <div className="teaser">
                    <img src="/jungwooblog.png" alt="Loading..." data-action="zoom"/>
                  </div>
                  <p className="description">Blog-based bulletin board project</p>
              </Modal.Body>
            </Modal>

            <Modal show={bookShow} onHide={() => setBookShow(false)}>
              <Modal.Body>
                <h3 className="mb-2">
                  <b>Address book</b>
                </h3>
                <div className="mb-2">
                  <div className="extra-links">
                    <a href="http://agile-plains-39979.herokuapp.com" target="_blank"><i className="fas fa-link"> Link</i></a>
                    <a href="https://github.com/leejungwu/Address-book" target="_blank"><i className="fab fa-github"></i> Code</a>
                  </div>
                </div>
                <div className="teaser">
                  <img src="/addressbook.png" alt="Loading..." data-action="zoom"/>
                </div>
                <p className="description">Web Application to use as addressbook</p>
              </Modal.Body>
            </Modal>

            <Modal show={dcuShow} onHide={() => setDcuShow(false)}>
              <Modal.Body>
                <h3 className="mb-2">
                  <b>DCU time</b>
                </h3>
                <div className="mb-2">
                  <div className="extra-links">
                    <a href="http://13.124.26.140/" target="_blank"><i className="fas fa-link"> Link</i></a>
                    <a href="https://github.com/leejungwu/Address-book" target="_blank"><i className="fab fa-github"></i> Code</a>
                  </div>
                </div>
                <div className="teaser">
                  <img src="/dcutime.png" alt="Loading..." data-action="zoom"/>
                </div>
                <p className="description">Social media service for DCU SW Exhibition</p>
              </Modal.Body>
            </Modal>
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