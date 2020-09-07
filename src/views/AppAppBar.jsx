import React from 'react';
import dynamic from 'next/dynamic';
import { withStyles, createMuiTheme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import indigo from '@material-ui/core/colors/indigo';
import ResponsiveToolbarLink from '../ResponsiveToolbarLink';
import ResponsiveToolbar from '../ResponsiveToolbar';
import Typography from '../Typography';

const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const styles = (theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
  title: {
    fontSize: 24,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  linkNaked: {
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  link: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(6),
    },
  },
  underlineNone: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      backgroundColor: themeDark.palette.background.paper,
    },
    '&:hover': {
      color: indigo['200'],
    },
  },
  primaryText: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.common.white,
    },
  },
  whiteText: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  /*
   * Ensure this is last due to CSS class names specifity
   */
  active: {
    [theme.breakpoints.up('sm')]: {
      borderBottom: `2px solid ${theme.palette.common.white}`,
      '&:hover': {
        borderBottom: `2px solid ${indigo['200']}`,
      },
    },
    [theme.breakpoints.down('xs')]: {
      color: indigo['200'],
    },
  },
  activeInverted: {
    [theme.breakpoints.up('sm')]: {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      '&:hover': {
        borderBottom: `2px solid ${indigo['200']}`,
      },
    },
    [theme.breakpoints.down('xs')]: {
      color: indigo['200'],
    },
  },
});

function AppAppBar(props) {
  const { classes, inverted } = props;

  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  const linkTextStyle = clsx({
    [classes.link]: true,
    [classes.primaryText]: inverted,
  });

  const CustomFacebook = dynamic(
    () => import('../CustomFacebook'),
    { ssr: false },
  );

  const logo = inverted ? '/images/anycoop-logo.png' : '/images/anycoop-logo-white.png';

  return (
    <ResponsiveToolbar logo={logo} color={inverted ? 'transparent' : 'primary'}>
      {/* <Link
        variant="h6"
        underline="none"
        className={clsx(classes.link, classes.underlineNone )}
        activeClassName={classes.active}
        href="/"
      >
        Home
      </Link> */}
      {smallDevice && (
        <ResponsiveToolbarLink
          variant="h6"
          underline="none"
          activeClassName={inverted ? classes.activeInverted : classes.active}
          className={clsx(linkTextStyle, classes.underlineNone)}
          href="/"
        >
          Home
        </ResponsiveToolbarLink>
      )}
      {!smallDevice && (
        <CustomFacebook 
          style={{ marginTop: -8 }}
          className={clsx(linkTextStyle, classes.underlineNone)}
        />
      )}
      <ResponsiveToolbarLink
        variant="h6"
        underline="none"
        activeClassName={inverted ? classes.activeInverted : classes.active}
        className={clsx(linkTextStyle, classes.underlineNone)}
        href="/why"
      >
        Why Anycoop?
      </ResponsiveToolbarLink>
      <ResponsiveToolbarLink
        variant="h6"
        underline="none"
        activeClassName={inverted ? classes.activeInverted : classes.active}
        className={clsx(linkTextStyle, classes.underlineNone)}
        href="/features"
      >
        Features
      </ResponsiveToolbarLink>
      <ResponsiveToolbarLink
        variant="h6"
        underline="none"
        activeClassName={inverted ? classes.activeInverted : classes.active}
        className={clsx(linkTextStyle, classes.underlineNone)}
        href="/pricing"
      >
        Pricing
      </ResponsiveToolbarLink>
      <a
        className={classes.linkNaked}
        target="_blank"
        rel="noopener noreferrer"
        href="https://blog.anycoop.zone"
      >
        <Typography
          variant="h6"
          className={clsx(linkTextStyle, classes.underlineNone)}
        >
          Blog
        </Typography>
      </a>
    </ResponsiveToolbar>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  inverted: PropTypes.bool,
};

AppAppBar.defaultProps = {
  inverted: false,
};

export default withStyles(styles)(AppAppBar);
