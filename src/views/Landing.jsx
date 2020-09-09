import React from 'react';

import indigo from '@material-ui/core/colors/indigo';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Summary from './Summary';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: indigo['50'],
    paddingBottom: theme.spacing(8),
  },
  container: {
    padding: theme.spacing(2),
  },
  root: {
    backgroundColor: indigo['50'],
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  wrapper: {
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    position: 'relative',
  },
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.box}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <picture>
              <source srcSet="/images/splash.webp" type="image/webp" />
              <source srcSet="/images/splash.png" type="image/png" />
              <img className={classes.image} src="/images/splash.png" alt="Splash" />
            </picture>
          </div>
        </div>
      </Box>
      <Summary />
    </>
  );
}
