/*global window*/
/**
 * @class FadeInSVG
 * @extends React.PureComponent
 * @description a default SVG component that fades in and caches SVGs
 * @author Jason Nathan
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Isvg from 'react-inlinesvg';
import FadeInImage from './FadeInImage.jsx';

export default class FadeInSVG extends PureComponent {
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
