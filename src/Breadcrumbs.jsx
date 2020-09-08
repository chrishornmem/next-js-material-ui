// Render Prop
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';

const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
    },
  },
});

const Breadcrumbs = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    style,
    ...other
  } = props;

  return (
    <MuiBreadcrumbs classes={{ root: classes.root }} aria-label="breadcrumb">
      {children}
    </MuiBreadcrumbs>
  );
});

export default withStyles(styles, { name: 'Breadcrumbs' })(Breadcrumbs);
