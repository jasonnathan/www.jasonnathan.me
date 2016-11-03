import React, {Component, PropTypes} from 'react';
import {spring, StaggeredMotion} from 'react-motion';
import GlowingLine from './GlowingLine.jsx';

const popConfig = { stiffness: 360, damping: 25 };

export default class StaggeredName extends Component{
  constructor(props){
    super(props);
  }

  get defaultStyles(){
    return [...this.letterArr()].map(() => ({h: 0.01}));
  }

  letterArr(){
    return this.props.letters.split('').map( (l) => l.replace(/ /g, "\u00a0"));
  }

  animatingLetters(style, i){
    const _arr = this.letterArr();
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
        {_arr[i]}
      </span>
    )
  }

  springProps(prevStyles){
    return prevStyles.map((_, i) => ({
      h: spring(i === 0 ? 1 : prevStyles[i - 1].h, { ...popConfig})
    }));
  }

  render(){
    const letters = this.props.letters;
    return (
      <StaggeredMotion
        defaultStyles={this.defaultStyles}
        styles={this.springProps}
      >
        {interpolatingStyles => (
          <h1
            role="heading group"
            title={letters}
            label={letters}
          >
            {interpolatingStyles.map( (_,i) => this.animatingLetters(_,i))}
            <GlowingLine />
            {this.props.children}
          </h1>
        )}
      </StaggeredMotion>
    );
  }
}

StaggeredName.propTypes = {
  letters: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
