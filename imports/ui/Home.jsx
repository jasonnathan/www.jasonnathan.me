/* global document*/
import React, {PureComponent} from 'react';
import {spring, presets, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import {Meteor} from 'meteor/meteor'
import StaggeredMenu from './components/StaggeredMenu.jsx';
import StaggeredName from './components/StaggeredName.jsx';
import MediaElement from './components/MediaElement.jsx';


export default class Home extends PureComponent{
  constructor(){
    super();
  }

  componentWillMount(){

  }

  render(){
    return (
      <div role="main" itemScope itemType="http://schema.org/WebPage">
        <Helmet
          title="Home | Jason J. Nathan"
          meta={[
            {"name": "description", "content": "A senior software engineer, writer, teacher and leader based in Singapore."}
          ]}
        />
        <MediaElement
          itemscope
          itemtype="http://data-vocabulary.org/Person"
          file="/profile.jpg"
          dim={110}
        >
          <header
            itemScope
            itemType="http://schema.org/WPHeader"
            role="banner"
          >
            <StaggeredName letters="Jason Nathan">
              <small className="block">
                A Senior Web & Mobile Software Engineer based in Singapore
              </small>
            </StaggeredName>
          </header>
        </MediaElement>
        <nav role="navigation" className="bottom-box" itemScope itemType="http://schema.org/SiteNavigationElement">
          <StaggeredMenu />
          <h6 style={{margin:"auto", textAlign:"center"}}>
            <a href="/area51">Area 51</a>
          </h6>
        </nav>
      </div>
    );
  }
}
