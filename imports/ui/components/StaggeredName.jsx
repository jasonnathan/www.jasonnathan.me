import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {spring, StaggeredMotion} from 'react-motion';
import GlowingLine from './GlowingLine.jsx';

export default class StaggeredName extends PureComponent{
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
      h: spring(i === 0 ? 1 : prevStyles[i - 1].h, {stiffness: 650, damping: 40, precision:.1})
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
            itemProp="headline"
            style={{margin:'2rem auto 3rem auto', textAlign:'center', fontSize:'2rem'}}
            role="heading group"
            className="staggered-name"
            title={letters}
            label={letters}
          >
            {interpolatingStyles.map( (_,i) => this.animatingLetters(_,i))}
            <GlowingLine style={{margin:'auto'}} />
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
