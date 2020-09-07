import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    paddingInlineStart: 0,
    padding: 0,
    position: 'relative',
  },
  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  /* Styles applied to the root element if dense. */
  dense: {},
});

const FooterList = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    component: Component = 'ul',
    dense = false,
    disablePadding = false,
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.dense]: dense,
          [classes.padding]: !disablePadding,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {children}
    </Component>
  );
});

FooterList.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, vertical padding will be removed from the list.
   */
  disablePadding: PropTypes.bool,
};


// export default withStyles(styles)(ResponsiveToolbarLink);
export default withStyles(styles, { name: 'FooterList' })(FooterList);
