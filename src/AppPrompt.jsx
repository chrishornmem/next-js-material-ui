import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Typography from './Typography';

const calloutBgColor = 'white';
const calloutTextColor = 'black';
const calloutBorderColor = '#e0e0e0';
const calloutBorderWidth = 1;

const useStyles = makeStyles((theme) => ({
  calloutWrapper: {
    position: 'fixed',
    bottom: 120,
    right: 20,
    zIndex: 999999999,
  },
  // From http://www.cssarrowplease.com/
  arrowBox: {
    position: 'relative',
    background: calloutBgColor,
    borderWidth: calloutBorderWidth,
    borderColor: calloutBorderColor,
    color: theme.palette.text.primary,
    fontStyle: 'italic',
    padding: 10,
    lineHeight: 30,
    minWidth: 180,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: '1.2em',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    '&:before': {
      top: '100%',
      left: '75%',
      border: 'solid transparent',
      content: '" "',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      borderColor: 'rgba(194, 225, 245, 0)',
      borderTopColor: 'rgba(0,0,0,0.12)',
      borderWidth: 16 + calloutBorderWidth + 4,
      marginLeft: -16 - calloutBorderWidth - 4,
    },
    '&:after': {
      top: '100%',
      left: '75%',
      border: 'solid transparent',
      content: '" "',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      borderColor: 'rgba(136, 183, 213, 0)',
      borderTopColor: calloutBgColor,
      borderWidth: 15,
      marginLeft: -15,
    },
  },
  arrowBoxText: {
    fontSize: '1rem',
  },
}));

export default function AppPrompt() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.calloutWrapper}>
        <Box className={classes.arrowBox}>
          <Typography className={classes.arrowBoxText} variant="body2">
            List your coop for free...
          </Typography>
        </Box>
      </Box>
    </>
  );
}
