/*global window*/
/**
 * @class FadeInImage
 * @extends React.Component
 * @description a default Image component that fades in an image on load
 */
import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';

export default class FadeInImage extends Component {
  constructor(props) {
    super(props);
    // set defaults if not provided
    const {size=40, style={}, className="", noFilter=false} = props;
    if(noFilter){style.filter = "none";}
    this.state = {
      // it seems counter-intuitive to unset default styles
      // but it works better for my use case
      style: {
        opacity: 0.2,
        transition: 'opacity 1s ease-in',
        height: size,
        width: size,
        ...style
      },
      className: "centered-content " + className
    }
  }

  /**
   * A simple way to preload an image
   */
  componentDidMount(){
    let imgElement = new window.Image();
    imgElement.onload = () => this.onImageLoad();
    imgElement.src = this.props.src;
  }

  onImageLoad() {
    return this.setState({ style: { ...this.state.style, opacity: 1}});
  }

  render(){
    return (
      <img
        className={this.state.className}
        role="presentation"
        key={this.props.src}
        style={this.state.style}
        src={this.props.src}
      />
    )
  }
}

FadeInImage.propTypes = {
  size:PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  className: PropTypes.string,
  noFilter:PropTypes.Boolean,
  src: PropTypes.string,
  style: stylePropType
}
