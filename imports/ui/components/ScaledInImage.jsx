/*global window*/
import React, {Component, PropTypes} from 'react';
import Transition from 'react-motion-ui-pack';
import {spring, presets} from 'react-motion';

import FadeInImage from './FadeInImage.jsx';

export default class ScaledInImage extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Transition
        component={false} // don't use a wrapping component
        measure={false} // don't measure component
        enter={{
          scale: 0
        }}
        leave={{
          scale: spring(1, {...presets.wobbly, precision:0.1})
        }}
      >
        <FadeInImage key={this.props.src} {...this.props} />
      </Transition>
    )
  }
}

ScaledInImage.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object
}
