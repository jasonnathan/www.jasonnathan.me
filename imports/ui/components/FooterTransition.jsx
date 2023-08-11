/**
 * @class FooterTransition
 * @extends React.PureComponent
 * @description Provides the animated tabs on the Skill footer area
 * @author Jason Nathan
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Motion, spring} from 'react-motion';

export default class FooterTransition extends PureComponent{
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

FooterTransition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
