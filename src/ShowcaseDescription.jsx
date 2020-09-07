import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
  //  color: theme.palette.secondary.main,
  },
});

function ShowcaseDescription(props) {
  const {
    style, gridProps, order = 1, children,
  } = props;

  return (
    <Grid
      item
   //   alignItems="center"
   //   justify="center"
      sm={6}
      xs={12}
      style={{ order, ...style }}
      {...gridProps}
    >
      {children}
    </Grid>
  );
}


ShowcaseDescription.propTypes = {
  children: PropTypes.node.isRequired,
  order: PropTypes.number,
  style: PropTypes.object,
  gridProps: PropTypes.object,
};

ShowcaseDescription.defaultProps = {
  order: 1,
  style: undefined,
  gridProps: undefined,
};

export default withStyles(styles)(ShowcaseDescription);
