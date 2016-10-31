import React from 'react';
import {spring, presets, StaggeredMotion} from 'react-motion';

export default function StaggeredName({children, letters}){
  letterArr = letters.split('').map( (l) => {if(l === ' ') l = "\u00a0"; return l;} );
  return (
    <StaggeredMotion
      defaultStyles={[...letterArr].map(() => {return {h: 0.01}})}
      styles={
        prevStyles =>
          prevStyles.map((_, i) => {
            return { h: spring(i === 0 ? 1 : prevStyles[i - 1].h, { ...presets.stiff})}})}
    >
      {interpolatingStyles => <h1 role="header group" title={letters} label={letters} >
        {interpolatingStyles.map((style, i) => {
          return (
            <span
              key={i}
              style={{
                transform: `scale(${style.h})`,
                display: 'inline-block',
                color: 'rgba(0, 255, 255, ' + style.h + ')',
                opacity:'.9',
                textShadow: style.h === 1 ? 'none' : '0 0 ' + style.h*30 + 'px #00ffff'
              }}
            >
              {letterArr[i]}
            </span>
          )
        })}
        {children}
      </h1>
    }
    </StaggeredMotion>
  );
}
