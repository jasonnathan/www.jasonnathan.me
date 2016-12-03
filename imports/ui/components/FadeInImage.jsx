/*global window*/
/**
 * @class FadeInImage
 * @extends React.PureComponent
 * @description a default Image component that fades in an image on load
 * @author Jason Nathan
 */
import React, {PureComponent} from 'react';
// import stylePropType from 'react-style-proptype';

export default class FadeInImage extends PureComponent {
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

// if(process.env.NODE_ENV === 'development'){
//   const {string, number, func, oneOfType, boolean} = PropTypes;
//
//   FadeInImage.propTypes = {
//     size: oneOfType([ string, number ]),
//     className: string,
//     noFilter:oneOfType([ boolean, func ]),
//     src: string,
//     style: stylePropType
//   }
// }
