import React, {Component} from 'react';
import {Link} from 'react-router';
import {Motion, spring} from 'react-motion';
import Breadcrumbs from 'react-router-breadcrumbs';

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      clicked: false
    }
  }

  handleClick(){
    this.setState({clicked:false})
  }

  motionProps(){
    const clicked = this.state.clicked
    return {
      defaultStyle:{t: -100},
      style:{t: spring(clicked ? -100 : 0, { stiffness: 150, damping: 15, precision:1 })}
    }
  }

  /**
   * The style also indents the text off screen for the sole benefit of screen-readers
   */
  style(t){
    return {transform: `translate3d(${t}%, 0, 0)`, textIndent:'-9999em'};
  }

  render(){
    const {routes, params, resolver, crumbs, lastCrumbResolver, goBack} = this.props;
    /*
    * globally, the first route [0] is ignored but this can be written in a
    * more defensive way
    */
    const backPath = routes[1].breadCrumbLink || `/${routes[1].path}`;
    const backName = routes[1].breadCrumbName || routes[1].name;
    return (
      <header className="header breadcrumb-container" style={{display:"flex"}}>
        {/* Animation for back button slide in */}
        <Motion {...this.motionProps()}>{({t}) => (
          <a
            href={backPath}
            onClick={e => {e.preventDefault();goBack()}}
            title={`Back to ${backName}`}
            style={this.style(t)}
            className="back-button"
          >
            Back to {backName}
          </a>
        )}</Motion>
        {/*Original breadcrumbs component*/}
        <Breadcrumbs
          routes={routes}
          params={params}
          createLink={lastCrumbResolver}
          resolver={(key, text) => resolver(key, text)(crumbs)}
        />
      </header>
    )
  }
}
