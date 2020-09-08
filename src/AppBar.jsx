import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';

const styles = (theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  },
});

function AppBar(props) {
  return <MuiAppBar elevation={0} position="static" {...props} />;
}

export default withStyles(styles)(AppBar);
