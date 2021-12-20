import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppProps } from 'next/app';

import * as ga from '../lib/gtag';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import wrapper from '../store/configureStore';
import '../public/styles.css';


const Blog: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url:any) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
