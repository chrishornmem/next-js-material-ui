import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

export default function ImageContainer(props) {
  const [width, setWidth] = React.useState(292);
  const [height, setHeight] = React.useState(517);
  const imageRef = React.useRef(null);

  const {
    boxShadow = 0, align = 'center', alt = '', src = '', style, ...other
  } = props;

  const wrapper = {
  //   position: 'relative',
  //  margin: align === 'center' ? '0 auto' : 'auto',
  //  float: align !== 'center' ? align : 'none',
  };

  const container = {
    width: '100%',
    height: 'auto',
  }

  React.useEffect(() => {
    if (imageRef?.current?.offsetWidth) {
      setWidth(imageRef.current.offsetWidth);
    }
    if (imageRef?.current?.offsetHeight) {
      setHeight(imageRef.current.offsetHeight);
    }
  }, []);

  React.useEffect(() => {
    if (imageRef?.current?.offsetWidth) {
      setWidth(imageRef.current.offsetWidth);
    }
    if (imageRef?.current?.offsetHeight) {
      setHeight(imageRef.current.offsetHeight);
    }
  }, [imageRef?.current?.offsetWidth, imageRef?.current?.offsetHeight]);

  return (
    <Box style={{...container, ...style}} {...other}>
      <Box boxShadow={boxShadow} style={{ width, height, ...wrapper }}>
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          // style={{
          //   position: 'absolute',
          //   left: '50%',
          //   top: '50%',
          //   WebkitTransform: 'translateY(-50%) translateX(-50%)',
          // }}
        />
      </Box>
      <div style={{ clear: 'both' }} />
    </Box>
  );
}

ImageContainer.propTypes = {
  boxShadow: PropTypes.number,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

ImageContainer.defaultProps = {
  align: 'center',
  boxShadow: 0,
  alt: '',
};
