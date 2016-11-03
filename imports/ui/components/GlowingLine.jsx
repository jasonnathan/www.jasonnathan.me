import React from 'react';
import stylePropType from 'react-style-proptype';
import {Motion, spring} from 'react-motion';

export default function GlowingLine({style}){
  return(
    <Motion defaultStyle={{o:0}} style={{o:spring(1)}}>
      {({o}) => (
        <hr
          className="glowing-line"
          style={{...style, transform:`scale3d(${o},${o},1)`}}
        />
      )}
    </Motion>
  )
}

GlowingLine.propTypes = {
  style: stylePropType
}
