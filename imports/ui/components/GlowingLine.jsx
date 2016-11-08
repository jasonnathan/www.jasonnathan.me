import React from 'react';
import stylePropType from 'react-style-proptype';
import {Motion, spring, presets} from 'react-motion';

export default function GlowingLine({style, className = ""}){
  return(
    <Motion defaultStyle={{o:0}} style={{o:spring(1, {...presets.gentle})}}>
      {({o}) => (
        <hr
          className={`glowing-line ${className}`}
          style={{...style, transform:`scale3d(${o},${o},1)`}}
        />
      )}
    </Motion>
  )
}

GlowingLine.propTypes = {
  style: stylePropType,
  className: React.PropTypes.string
}
