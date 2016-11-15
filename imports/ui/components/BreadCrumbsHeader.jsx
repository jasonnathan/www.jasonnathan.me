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

  style(t){
    return {transform: `translate3d(${t}%, 0, 0)`};
  }

  render(){
    const {routes, params, resolver, crumbs, lastCrumbResolver} = this.props;
    const back = routes[1].breadCrumbLink || "/" + routes[1].path;
    return (
      <header className="header breadcrumb-container" style={{display:"flex"}}>
        <Motion {...this.motionProps()}>{({t}) => (
          <Link to={back} style={this.style(t)} className="back-button" />
        )}</Motion>
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
