import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Link from './Link';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(6),
    },
  },
});

const ResponsiveToolbarLink = React.forwardRef((props, ref) => {
  const {
    classes, className, href, activeClassName, ...other
  } = props;

  return (
    <Link
      variant="h6"
      underline="none"
      activeClassName={activeClassName}
      className={clsx(
        classes.root,
        className,
      )}
      href={href}
      ref={ref}
      {...other}
    />
  );
});

ResponsiveToolbarLink.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
};

ResponsiveToolbarLink.defaultProps = {
  className: '',
  activeClassName: '',
};

// export default withStyles(styles)(ResponsiveToolbarLink);
export default withStyles(styles, { name: 'ResponsiveToolbarLink' })(ResponsiveToolbarLink);
