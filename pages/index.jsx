import React from 'react';
import Head from 'next/head';

import { connect } from '../src/utils/db';
import Landing from '../src/views/Landing';

export default function Index(props) {

  return (
    <>
      <Head>
        <title key="title">Anycoop - Home</title>
        <meta property="og:title" content="Anycoop - Home" />
        <meta key="description" name="description" content="An all-in-one membership management solution designed for co-operatives" />
        <meta key="metaDescription" property="og:description" content="An all-in-one membership management solution designed for co-operatives" />
      </Head>
      <Landing />
    </>
  );
}

export async function getServerSideProps(context) {
  const { isConnected } = await connect()

  return {
    props: { isConnected },
  };
}
