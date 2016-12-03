/**
 * @class StaggeredParagraphs
 * @extends React.PureComponent
 * @description Presentational Component for animated paragraphs used in Skills
 * @author Jason Nathan
 */
import React, {PureComponent, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';
import {StaggeredMotion, spring} from 'react-motion';

export default class StaggeredParagraphs extends PureComponent {
  /** Default React constructor */
  constructor(props) {
    super(props);
  }

  /**
   * A simple method that splits a string into an array delimited by <br /> tags
   * This is then used to animate the paragraphs on load
   *
   * @param {String} a HTML string
   * @returns {Array} of split strings
   */
  splitOnBreak(content) {
    return content.split("<br />");
  }

  /**
   * This returns interpolation values for use in react-motion's StaggeredMotion
   * Component. It requires a simple empty array with the number of items
   * equivalent to the number of animatable elements. Given the content array
   * generated above for convenience.
   *
   * @param {Array} an array of things to animate.
   * @returns {Object} an object containing the required props for the Component
   */
  staggeredProps(contentArr) {
    const p = [...contentArr];
    const _s = { stiffness: 900, damping: 50, precision: .1}
    return {
      defaultStyles: p.map(() => ({t: 50, o: 0.1})),
      styles: prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? {
            t: spring(0, _s),
            o: spring(1, _s)
          }
          : {
            t: spring(prevInterpolatedStyles[i - 1].t, _s),
            o: spring(prevInterpolatedStyles[i - 1].o)
          }
      })
    }
  }

  /**
   * returns props (normally styles) for use in the parent container
   * of the animation. This method retrieves it from props and provides default
   * if none was defined
   *
   * @returns {Object} of props
   */
  containerProps() {
    const {
      containerProps = {
        className : "single-post skill-description",
        style : { backgroundImage: "url(/green-bg.svg)"}
      }
    } = this.props;
    return containerProps;
  }

  /**
   * This is the method that defines the styles for use within the animating
   * elements. The properties are provided for by the interpolation
   *
   * @param {Oject: {t:Number, o:Number}} the current value of the interpolation
   * @returns {Object:{style:{}}} the style object to use in the elements animating
   */
  staggeredStyle({t, o}) {
    return {transform: `translate3d(0,${t}%,0)`, margin: "1rem auto 0 auto", opacity: o}
  }

  render() {
    const paragraphs = this.splitOnBreak(this.props.description)
    return (
      <StaggeredMotion {...this.staggeredProps(paragraphs)}>
        {interpolatedStyles => <article {...this.containerProps()}>
          {interpolatedStyles.map((style, i) => (
            <p
              key={i}
              style={this.staggeredStyle(style)}
              dangerouslySetInnerHTML={{ __html: paragraphs[i]}}
            />
          ))}
        </article>}
      </StaggeredMotion>
    )
  }
}

StaggeredParagraphs.propTypes = {
  description: PropTypes.string.isRequired,
  containerProps: PropTypes.shape({
    className: PropTypes.string,
    style: stylePropType
  })
}
