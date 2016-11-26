/*global window*/
/**
 * @class FadeInSVG
 * @extends React.Component
 * @description a default SVG component that fades in an caches SVGs
 */
import React, {Component, PropTypes} from 'react';
import Isvg from 'react-inlinesvg';
import FadeInImage from './FadeInImage.jsx';

export default class FadeInSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        opacity: 0.2,
        transition: 'opacity 1s ease-in'
      },
      className: "centered-content " + props.className || ""
    }
  }

  onImageLoad() {
    return this.setState({ style: { ...this.state.style, opacity: 1}});
  }

  render(){
    return (
      <div
        className={this.state.className}
        role="presentation"
        key={this.props.src}
        style={this.state.style}
      >
        <Isvg
          cacheGetRequests
          onLoad={() => this.onImageLoad()}
          src={this.props.src}
        >
          <FadeInImage size="100" src={this.props.src} />
        </Isvg>
      </div>
    )
  }
}

FadeInSVG.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string
}
