import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  image: {
    maxWidth: '100%', maxHeight: 466, margin: '0 auto', display: 'block',
  },
});

function ShowcaseImage(props) {
  const {
    classes, style, order = 1, src = '', alt = '', useSvg = false, ...other
  } = props;

  return (
      <Grid
        item
    //    alignItems="center"
    //    justify="center"
        sm={6}
        xs={12}
        style={{ order, ...style }}
        {...other}
      >
        <LazyLoad height={288}>
          {!useSvg && (
          <picture>
            <source srcSet={`/images/${src}.webp`} type="image/webp" />
            <source srcSet={`/images/${src}.png`} type="image/png" />
            <img className={classes.image} src={`/images/${src}.png`} alt={alt} />
          </picture>
          )}
          {useSvg && <img className={classes.image} src={`/images/${src}.svg`} alt={alt} />}
        </LazyLoad>
      </Grid>
  );
}

ShowcaseImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  useSvg: PropTypes.bool,
  order: PropTypes.number,
  style: PropTypes.object,
  classes: PropTypes.object,
};

ShowcaseImage.defaultProps = {
  order: 1,
  style: undefined,
  classes: {},
  useSvg: false,
};

export default withStyles(styles)(ShowcaseImage);
