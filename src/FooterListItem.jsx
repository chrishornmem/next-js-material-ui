import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import capitalize from './utils/capitalize';

const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8,
  },
	  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="action"`. */
  colorAction: {
    color: theme.palette.action.active,
  },
  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main,
  },
  /* Styles applied to the root element if `color="disabled"`. */
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  /* Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: {
    fontSize: 'inherit',
  },
  /* Styles applied to the root element if `fontSize="small"`. */
  fontSizeSmall: {
    fontSize: theme.typography.pxToRem(20),
  },
  /* Styles applied to the root element if `fontSize="large"`. */
  fontSizeLarge: {
    fontSize: theme.typography.pxToRem(36),
  },
  /* Styles applied to the root element if dense. */
  dense: {},
  separator: {
    margin: 0,
    '&:before': {
      content: '"|"',
      verticalAlign: 'middle',
      fontSize: '1.5em',
      fontWeight: theme.typography.fontWeightBold,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    '&:first-child:before': {
      content: '""',
      padding: 0,
    },
  },
});

const FooterListItem = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    color = 'inherit',
    component: Component = 'li',
    fontSize = 'default',
    dense = false,
    disablePadding = false,
    disableSeparator = false,
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.dense]: dense,
          [classes.padding]: !disablePadding,
          [classes.separator]: !disableSeparator,
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          [classes[`fontSize${capitalize(fontSize)}`]]: fontSize !== 'default',
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

FooterListItem.propTypes = {
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'action', 'error', 'disabled']),
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
  /**
   * If `true`, vertical the footer separator will be removed.
   */
  disableSeparator: PropTypes.bool,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   */
  fontSize: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
};

// export default withStyles(styles)(ResponsiveToolbarLink);
export default withStyles(styles, { name: 'FooterListItem' })(FooterListItem);
