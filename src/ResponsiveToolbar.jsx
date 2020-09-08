import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, makeStyles, useTheme } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Link from './Link';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const drawerWidth = 240;
const useStyles = makeStyles({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  logoWrapper: {
    height: 50,
    lineHeight: 0,
  },
  primaryText: {
    color: theme.palette.primary.main,
  },
  whiteText: {
    color: theme.palette.common.white,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    color: theme.palette.common.black,
  },
  offset: theme.mixins.toolbar,
  toolbar: theme.mixins.toolbar,
  toolbarRegular: {
    height: 64,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
  //  padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
    color: theme.palette.text.primary,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 220,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  logo: {
    height: 50,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginRight: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  menuDrawer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'wrap',
    }
  },
});

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  //  target: window ? window() : undefined,
  });

  return (
    typeof children === 'function'
      ? (children)(trigger)
      : React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
  );

  // return React.cloneElement(children, {
  //   elevation: trigger ? 4 : 0,
  // });
}

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { children, color, logo } = props;
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const largeDevice = useMediaQuery(theme.breakpoints.up('sm'));
  const toolbarProp = largeDevice ? 'relative' : 'fixed';

  return (
    <div className={classes.root}>
      <ElevationScroll>
        {(isScrolling) => (
          <AppBar className={classes.root} color={color} elevation={0} position={toolbarProp}>
            <Toolbar className={classes.toolbarRegular}>
              {logo && (
                <Link aria-label="home" className={classes.logoWrapper} href="/">
                  <img src={logo} alt="home" className={classes.logo} />
                </Link>
              )}
              <IconButton
           //   color="secondary"
                aria-label="Open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.right}>
                {children}
              </div>
            </Toolbar>
          </AppBar>
        )}
      </ElevationScroll>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="js">
          <div className={classes.offset} style={{backgroundColor: color === 'transparent' ? color : theme.palette[color].main}} />
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            theme={theme}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon />
            </IconButton>
            <div className={classes.menuDrawer} onClick={handleDrawerToggle}>
              {children}
            </div>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
