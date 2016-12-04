/**
 * @class FlipBox
 * @extends React.PureComponent
 * @description CURRENTLY NOT USED
 * @author Jason Nathan
 */
import React, {PureComponent, PropTypes} from 'react';
import {spring, presets, Motion} from 'react-motion';
import tinycolor from 'tinycolor2';
import * as colors from '/imports/api/colors';

export default class FlipBox extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
    this.closedProps = {
      margin: "10px",
      transformOrigin: "50% 0px 0px",
      width:"140px",
      backgroundColor: tinycolor(colors.black).setAlpha(.5).toRgbString(),
      // transform: "perspective(800px)"
    }
    this.closedFilterProps = {filter: "none", opacity: 1}
    this.topLabelStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      height: "10px",
      width: "140px",
      margin: ".5rem 0 0 0",
      fontSize: ".8rem",
      color:tinycolor(colors.blue).lighten(10).setAlpha(.9).toRgbString()
    }
    this.bottomLabelStyle = {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "10px",
      width: "140px",
      margin: "0 0 .75rem 0",
      fontSize: ".8rem",
      textTransform:"uppercase"
    }
  }

  getComputedContainerProps({rotateX}){
    return {
      transform: `perspective(800px) rotateX(${rotateX}deg)`,
    };
  }

  getFilterProps({blur}){
    return{
      filter: `blur(${blur}px)`,
      // opacity: opacity
    }
  }

  handleHover(active){
    this.setState({isOpen: active})
  }

  handleClick(e){
    e.persist();
    this.setState({isOpen: !this.state.isOpen})
  }

  get springProps() {
    const {wobbly} = presets;
    return {
      defaultStyle: { rotateX: 0, blur:0, opacity:1 },
      style:{
        rotateX: spring(this.state.isOpen ? 160 : 0, {...wobbly}),
        blur: spring(this.state.isOpen ? 4 : 0, {...wobbly}),
        opacity: spring(this.state.isOpen ? .4 : 1, {...wobbly})
      }
    };
  }

  render() {
    return (
      <div
        className="box"
        style={{position:"relative",cursor:"default"}}
        onMouseOver={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onTouchStart={(e) => this.handleClick(e)}
      >
        <Motion {... this.springProps}>
          {styles => (
            <div style={{...this.getComputedContainerProps(styles), ...this.closedProps}}>
              <div
                style={{
                  height:"140px",
                  width:"140px",
                  backgroundColor:tinycolor(colors.darkestCyan).darken(10).toString(),
                  textAlign:"center",
                  fontSize:"60px",
                  fontWeight:"bold",
                  cursor:"pointer",
                  position:"absolute"
                }}
              >
                <span className="box-button" style={{...this.closedFilterProps, ...this.getFilterProps(styles)}}>
                  <h6 style={this.topLabelStyle}>
                    {this.props.topLabelText}
                  </h6>
                  <SVGCircleText num={this.props.numText} />
                  <p style={this.bottomLabelStyle}>
                    {this.props.bottomLabelText}
                  </p>
                </span>
              </div>
            </div>
          )}
        </Motion>
        <div style={{margin:"10px"}}>
          <div
            style={{
              height:"140px",
              width:"140px",
              backgroundColor: tinycolor(colors.darkestCyan).darken(20).setAlpha(.3).toRgbString(),
              textAlign:"center",
              fontSize:"60px",
              fontWeight:"bold",
              cursor:"pointer",
              zIndex:-1
            }}
          >
            <span>
              <img className="emoji" draggable="false" alt="🐵" src="http://twemoji.maxcdn.com/72x72/1f435.png" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export const SVGCircleText = ({num}) => (
  <svg
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fill="none"
    clipRule="evenodd"
    width="100%"
    height="100%"
    // viewBox="0 0 50 50"
    style={{verticalAlign:"bottom"}}
  >
    <g>
      <circle
        strokeMiterlimit={10}
        stroke="rgba(0,0,0,.4)"
        strokeWidth="8px"
        cx="50%"
        cy="50%"
        r="40"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill={tinycolor(colors.blue).lighten(20).toString()}
        dy=".35em"
        fontFamily='"Century Gothic", CenturyGothic, AppleGothic, sans-serif'
        style={{fontSize:"1.5rem"}}
      >
        {num}
      </text>
    </g>
  </svg>
);
const {string, oneOfType, number} = PropTypes

SVGCircleText.propTypes = {
  num: oneOfType([string, number])
}

FlipBox.propTypes = {
  numText: string,
  bottomLabelText: string,
  topLabelText: string
}
