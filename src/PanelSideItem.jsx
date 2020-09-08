import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from './Typography';
import Link from './Link';

const styles = (theme) => ({
  /* Styles applied to the root element. */
  item: {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
		fontSize: '1rem',
		color: theme.palette.text.primary,
		position: 'relative',
		'&:hover': {
			color: theme.palette.text.secondary,
		}
	},
	isActive: {
		fontWeight: theme.typography.fontWeightBold,
		'&:before': {
			position: 'absolute',
			left: -theme.spacing(3),
			content: "'✓'",
		}
	},
  root: {},
  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {},
  /* Styles applied to the root element if dense. */
  dense: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
});

const PanelSideItem = React.forwardRef((props, ref) => {
  const {
    value,
    classes,
		className,
		active = false,
    dense = false,
    href,
    disablePadding = false,
    key,
    ...other
  } = props;

  return (
    <Grid
      item
      xs={12}
      key={key}
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
      <Link href={href}>
				<Typography 
					className={clsx(
						classes.item,
						{
							[classes.isActive]: active
						},
					)}
				>{value}</Typography>
      </Link>
    </Grid>
  );
});

PanelSideItem.propTypes = {
	/**
   * Display the link as active
   */
	active: PropTypes.bool,
	/**
   * The content of the component.
   */
  activity: PropTypes.string,
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
  /**
   * 
   */
  href: PropTypes.object.isRequired,
};

// export default withStyles(styles)(ResponsiveToolbarLink);
export default withStyles(styles, { name: 'PanelSideItem' })(PanelSideItem);
