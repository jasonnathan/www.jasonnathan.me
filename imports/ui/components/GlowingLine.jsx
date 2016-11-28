/**
 * @function GlowingLine
 * @description A simple animated HR that grows on mount
 */
import React, {PureComponent} from 'react';
import stylePropType from 'react-style-proptype';
import {Motion, spring, presets} from 'react-motion';

export default class GlowingLine extends PureComponent{
  render(){
    const {style, className = ""} = this.props;
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
}

GlowingLine.propTypes = {
  style: stylePropType,
  className: React.PropTypes.string
}
