import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useHighlightStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12),
      paddingLeft: theme.spacing(18),
      paddingRight: theme.spacing(18),
    },
  },
}));

export default function Highlight(props) {
  const { children, style } = props;
  const classes = useHighlightStyles();

  return (
    <Box style={style} className={classes.root}>
      {children}
    </Box>
  );
}

Highlight.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Highlight.defaultProps = {
  style: undefined,
};
