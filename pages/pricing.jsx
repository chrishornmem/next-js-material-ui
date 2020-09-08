import React from 'react';
import Head from 'next/head';

import Prices from '../src/views/Prices'

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Anycoop - Pricing</title>
        <meta property="og:title" content="Anycoop - Pricing" />
        <meta key="description" name="description" content="An all-in-one membership management solution designed for co-operatives" />
        <meta key="metaDescription" property="og:description" content="An all-in-one membership management solution designed for co-operatives" />
      </Head>
      <Prices />
    </>
  );
}
