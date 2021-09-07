import React, { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import wrapper from '../store/configureStore';
import '../public/styles.css';


const Blog: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>JW Blog</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/a72e3c1afa.js" crossOrigin="anonymous"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
};


export default wrapper.withRedux(Blog);
