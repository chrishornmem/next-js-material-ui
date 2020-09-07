import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from './Typography';

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

const useHighlightItemStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.h5,
    textTransform: 'initial',
    fontStyle: 'italic',
    lineHeight: '2.5rem',
  },
}));

export function HighlightItem(props) {
  const {
    children, style, align = 'center', classes, variant = 'h3',
  } = props;

  const classesProps = useHighlightItemStyles();
  return (
    <Typography
      style={style}
      className={clsx(classesProps.root, classes)}
      align={align}
      variant={variant}
    >
      {children}
    </Typography>
  );
}

export function Highlight(props) {
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

HighlightItem.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  classes: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline', 'srOnly', 'inherit']),
};

HighlightItem.defaultProps = {
  style: undefined,
  align: 'center',
  classes: '',
  variant: 'h3',
};
