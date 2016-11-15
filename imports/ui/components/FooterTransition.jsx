import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

export default class FooterTransition extends Component{
  constructor(props){
    super(props);
  }

  motionProps(){
    return {
      defaultStyle:{t: 100},
      style:{t: spring(0, { stiffness: 150, damping: 15, precision:1 })}
    }
  }

  style(t){
    return {transform: `translate3d(0, ${t}%, 0)`};
  }

  render(){

    return (
      <Motion {...this.motionProps()}>{({t}) => (
        <footer className="footer scroll-x" style={this.style(t)}>
          {this.props.children}
        </footer>
        )}
      </Motion>
    )
  }
}
