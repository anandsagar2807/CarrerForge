import React from 'react';

const SectionDivider = ({
  style = {},
  color = 'currentColor',
  opacity = 0.25,
  marginTop = '10px',
  marginBottom = '10px',
  thickness = '1px'
}) => {
  const defaultStyle = {
    borderBottom: `${thickness} solid ${color}`,
    opacity: opacity,
    marginTop: marginTop,
    marginBottom: marginBottom,
    width: '100%'
  };

  return <div style={{ ...defaultStyle, ...style }} />;
};

export default SectionDivider;
