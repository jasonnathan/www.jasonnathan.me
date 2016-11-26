/**
 * @class Header
 * @extends React.Component
 * @description Provides BreadCrumbs navigation for Blog and Skills Components
 */
import React, {Component, PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import stylePropType from 'react-style-proptype';
import Breadcrumbs from 'react-router-breadcrumbs';

export default class Header extends Component {
  /**
   * Sets clicked state to false
   */
  constructor(props) {
    super(props);
  }

  /**
   * This returns default props for the Motion Component
   *
   * @returns {Object} an object containing the required props for the Component
   */
  motionProps() {
    return {
      defaultStyle: { t: -100 },
      style: { t: spring(0, { stiffness: 150, damping: 15,precision: 1})}
    }
  }

  /**
   * This is the method that defines the styles for use within the animating
   * elements. The properties are provided for by the interpolation
   * The style also indents the text off screen for the sole benefit of
   * screen-readers
   *
   * @param {Number} t the current interpolated value
   * @returns {Object:{style:{}}} the style object to use in the elements animating
   */
  style(t) {
    return {transform: `translate3d(${t}%, 0, 0)`, textIndent: '-9999em'};
  }

  render() {
    const {
      routes,
      params,
      resolver,
      crumbs,
      lastCrumbResolver,
      goBack,
      style = {}
    } = this.props;
    /*
    * globally, the first route [0] is ignored but this can be written in a
    * more defensive way
    */
    const backPath = routes[1].breadCrumbLink || `/${routes[1].path}`;
    const backName = routes[1].breadCrumbName || routes[1].name;
    const _s = {
      ...style,
      display: "flex"
    }
    return (
      <header className="header breadcrumb-container" style={_s}>
        {/* Animation for back button slide in */}
        <Motion {...this.motionProps()}>{({t}) => (
          <a
            href={backPath}
            onClick={e => { e.preventDefault();goBack()}}
            title={`Back to ${backName}`}
            style={this.style(t)}
            className="back-button"
          >
            Back to {backName}
          </a>
          )}</Motion>
        {/*Original breadcrumbs component*/}
        <Breadcrumbs routes={routes} params={params} createLink={lastCrumbResolver} resolver={(key, text) => resolver(key, text)(crumbs)}/>
      </header>
    )
  }
}

const {object, func, array} = PropTypes;

Header.propTypes = {
  routes: object,
  params: object,
  resolver: func,
  crumbs: array,
  lastCrumbResolver: func,
  goBack: func,
  style: stylePropType
}
