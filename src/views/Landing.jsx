import React from 'react';

import indigo from '@material-ui/core/colors/indigo';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ProductHero from '../ProductHero';
import Breaker from '../Breaker';
import Showcase from './Showcase';
import Summary from './Summary';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: indigo['50'],
    paddingBottom: theme.spacing(8),
  },
  boxBreaker: {
    backgroundColor: indigo['50'],
  },
  container: {
    padding: theme.spacing(2),
  },
  boxShadow: {
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
  },
  root: {
    backgroundColor: indigo['50'],
  },
  // imageLeft: {
  // //  margin: '0 auto',
  //  // position: 'absolute',
  //   // top: 100,
  //   // left: 100,
  //   display: 'inline-block',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  // },
  imageLeft: {
    //  margin: '0 auto',
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    borderRadius: 30,
    backgroundColor: 'transparent',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
  },
  // left: '60%',
  imageRight: {
    //  margin: '0 auto',
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    borderRadius: 30,
    backgroundColor: 'transparent',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
    // left: '60%',
  },
  image: {
    //  margin: '0 auto',
    width: '100%',
    height: 'auto',
  //  maxHeight: '100%',
  //  backgroundColor: 'transparent',
    // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
    // left: '60%',
  },
  // imageCenter: {
  //   display: 'block',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  // },
  imageWrapperLeft: {
    width: 263 * 0.9,
    height: 'calc(100% * 0.9)',
    [theme.breakpoints.down('md')]: {
      width: 300 * 0.75,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300 * 0.5,
    },
    position: 'absolute',
    left: 0,
    top: 20,
    zIndex: 1,
  },
  imageWrapperRight: {
    width: 282 * 0.9,
    height: 'calc(100% * 0.9)',
    [theme.breakpoints.down('md')]: {
      width: 300 * 0.75,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300 * 0.5,
    },
    position: 'absolute',
    right: 0,
    top: 20,
    zIndex: 1,
  },
  imageWrapperCenter: {
    width: 300,
    height: 'auto',
    [theme.breakpoints.down('md')]: {
      width: 300 * 0.75,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300 * 0.5,
    },
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    zIndex: 2,
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
    marginTop: -200,
    position: 'relative',
  },
}));

// function isLargeDevice() {
//   const theme = useTheme();
//   // const result = useMediaQuery(theme.breakpoints.up('md'))
//   console.log(`isLargeDevice:${result.toString()}`);
//   return result;
// }

export default function Landing() {
  const theme = useTheme();
  // const largeDevice = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  // const [isLargeDevice, setIsLargeDevice] = React.useState(largeDevice);


  return (
    <>
      {/* <AppAppBar color="primary" /> */}
      <Box className={classes.box}>
        <ProductHero />
        <Breaker color="primary" />
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
      <Showcase containerClassName={classes.root} />
      <Box className={classes.boxBreaker}>
        <Breaker variant="type2" color={theme.palette.primary.light} />
      </Box>
    </>
  );
}
