import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function ProductHeroLayout(props) {
  const {backgroundClassName, children } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.container,backgroundClassName)} >
      {children}
    </div>
  );
}

ProductHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string,
  children: PropTypes.node.isRequired
};

ProductHeroLayout.defaultProps = {
  backgroundClassName: ''
};

export default ProductHeroLayout;
