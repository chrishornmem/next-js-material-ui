import React from 'react';
import LazyLoad from 'react-lazyload';
 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import indigo from '@material-ui/core/colors/indigo';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

import SignUp from './SignUp';
import FooterList from './FooterList';
import FooterListItem from './FooterListItem';
import Typography from './Typography';

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '33%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    margin: '0 auto'
  },
  root: {
    display: 'flex',
  },
  box: {
    backgroundColor: indigo['50'],
  },
  button: {
    width: '100%',
  },
  copyright: {
    paddingTop: theme.spacing(2),
    color: theme.palette.secondary.dark,
    fontSize: '0.8rem',
  },
  download: {
    height: 80,
    display: 'block',
    margin: '0 auto',
  },
  footer: {
    backgroundColor: theme.palette.primary.light, // 81c784
   // marginTop: theme.spacing(4),
  },
  footerContainer: {
    paddingBottom: theme.spacing(8),
  },
  form: {
    width: '33%',
    margin: '0 auto',
    marginBottom: theme.spacing(3),
  },
  heading: {
    color: theme.palette.secondary.dark,
  },
  input: {
    fontSize: '1rem',
    // width: '33%',
  },
  nakedLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    margin: 0,
    color: theme.palette.secondary.main,
    fontSize: '1rem',
    paddingInlineStart: 0,
  },
  linkColor: {
    color: theme.palette.secondary.dark,
    fontWeight: theme.typography.fontWeightLight,
    fontSize: '1rem',
  },
  linkWithSeparator: {
    margin: 0,
    '&:before': {
      content: '"|"',
      fontSize: '1.5rem',
      verticalAlign: 'middle',
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    '&:first-child:before': {
      content: '""',
      padding: 0,
    },
  },
}));

export default function AppFooter() {
  const classes = useStyles();
  const theme = useTheme();

  const [result, setResult] = React.useState({state:'none'});

  const handleSubmit = ((values, props) => {
    fetch('/api/subscribe', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setResult({state:'success'});
        } else {
          setResult({state:'fail'});
        }
      });
  });

  return (
    <LazyLoad height={682}>
      <Box className={classes.footer}>
        <Container component="footer" className={classes.footerContainer}>
          <picture>
            <source srcSet='/images/google-play-badge.webp' type="image/webp" />
            <source srcSet='/images/google-play-badge.png' type="image/png" />
            <img className={classes.download} src="/images/google-play-badge.png" alt="get it on google play" />
          </picture>
          <Typography className={classes.heading} align="center">Sign up to join the mobile app beta programme</Typography>
          {result.state === 'none' && <SignUp handleSubmit={handleSubmit} />}
          {result.state === 'success' && <Alert className={classes.alert} color="info" severity="success">Thanks for signing up, we'll get back to you soon!</Alert>}
          {result.state === 'fail' && <Alert className={classes.alert} color="warning" severity="error">There was a problem signing up, send an email to contact@anycoop.zone</Alert>}
          <FooterList>
            <FooterListItem className={classes.linkColor}>
              <a
                className={classes.nakedLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1T01PBnM1O6wCnp0Gnjce-08v_qxl8GUu/view?usp=sharing"
              >
                Privacy Policy
              </a>
            </FooterListItem>
            <FooterListItem className={classes.linkColor}>
              <a
                className={classes.nakedLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://bit.ly/31i4usR"
              >
                Terms of use
              </a>
            </FooterListItem>
            <FooterListItem className={classes.linkColor}>
              <a
                className={classes.nakedLink}
                href="mailto:contact@anycoop.zone"
                rel="noopener noreferrer"
                target="_blank"
              >
                contact@anycoop.zone
              </a>
            </FooterListItem>
          </FooterList>
          <FooterList>
            <FooterListItem disablePadding disableSeparator>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/Anycoop.zone/"
                className={classes.linkColor}
                aria-label="facebook"
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
            </FooterListItem>
            {/* <FooterListItem disablePadding disableSeparator>
              <IconButton className={classes.linkColor} aria-label="twitter">
                <TwitterIcon fontSize="large" />
              </IconButton>
            </FooterListItem>
            <FooterListItem disablePadding disableSeparator>
              <IconButton className={classes.linkColor} aria-label="linkedin">
                <LinkedInIcon fontSize="large" />
              </IconButton>
            </FooterListItem> */}
          </FooterList>
          <Typography className={classes.copyright} align="center">
            Anycoop is a trade name of ONEm Communications Ltd
            {'.  Copyright © '}
            {' '}
            {new Date().getFullYear()}
            .
          </Typography>
        </Container>
      </Box>
    </LazyLoad>
  );
}
