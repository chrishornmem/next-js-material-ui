import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function Breaker(props) {
  const theme = useTheme();

  const { color = 'primary.main', variant='type1' } = props;
  const paletteFirst = color.split('.')[0];
  const paletteSecond = color.split('.')[1] || 'main';
  let colorParam;
  try {
    colorParam = theme.palette[paletteFirst][paletteSecond];
  } catch {
    colorParam = color;
  }

  const normal = {
    marginTop: -1,
    width: '100%',
    display: 'block',
    margin: '0 auto',
    border: 0,
    padding: 0,
    maxWidth: '100%',
    height: 'auto',
    //WebkitTransform: 'scaleY(-1)',
    transform: 'scaleY(-1)',
  }

  const flip = {
    ...normal,
    marginBottom: -1,
    WebkitTransform: 'none',
   // transform: 'none',
  };

  const fill = {
    stroke: 'none',
    fill: colorParam,
  };

  return (
    <div style={variant === 'type2' ? flip : normal}>
      <div style={{height: 150, overflow: 'hidden'}} >
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
          <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={fill} />
        </svg>
      </div>
    </div>
  );
}
