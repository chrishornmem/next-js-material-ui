import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
		height: 300,
		width: '100%',
		margin: '0 auto',
	},
  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {},
  /* Styles applied to the root element if dense. */
  dense: {},
});

const CustomMap = React.forwardRef((props, ref) => {
  const {
    classes,
    className,
    dense = false,
		disablePadding = false,
		lat = 0,
		long = 0,
		zoom = 13,
    ...other
  } = props;

	const position = [lat, long];

  return (
    <Map className={classes.root} center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker iconAnchor={position} position={position} />
    </Map>
  );
});

CustomMap.propTypes = {
	lat: PropTypes.number,
	long: PropTypes.number,
	zoon: PropTypes.number,
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
export default withStyles(styles, { name: 'CustomMap' })(CustomMap);
