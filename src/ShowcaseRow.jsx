import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
//    color: theme.palette.secondary.main,
  },
});

function ShowcaseRow(props) {
  const { children, style, ...other } = props;

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      spacing={10}
      style={{ marginTop: 40, ...style }}
      {...other}
    >
      {children}
    </Grid>
  );
}

ShowcaseRow.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

ShowcaseRow.defaultProps = {
  style: undefined,
};

export default withStyles(styles)(ShowcaseRow);
