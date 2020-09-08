import React from 'react';
// import Container from '@material-ui/core/Container';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Why from '../src/views/Why';
import Breaker from '../src/Breaker';

const useStyles = makeStyles((theme) => ({
  root: {
    //   backgroundColor: indigo['50'],
  },
}));

export default function WhyPage(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Anycoop - Why?</title>
        <meta property="og:title" content="Anycoop - Why" />
        <meta key="description" name="description" content="An all-in-one membership management solution designed for co-operatives" />
        <meta key="metaDescription" property="og:description" content="An all-in-one membership management solution designed for co-operatives" />
      </Head>
      <Why containerClassName={classes.root} />
      <Box>
        <Breaker variant="type2" color={theme.palette.primary.light} />
      </Box>
    </>
  );
}

