/* global document*/
import React from 'react';
import {spring, presets, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import StaggeredMenu from './components/StaggeredMenu.jsx';
import StaggeredName from './components/StaggeredName.jsx';
import MediaElement from './components/MediaElement.jsx';


const Home = () => {
  return (
    <div>
      <Helmet
        title="Home | Jason J. Nathan"
        meta={[
            {"name": "description", "content": "A senior software engineer, writer, teacher and leader based in Singapore."}
        ]}
      />
      <Motion
        role="main"
        defaultStyle={{v: -1}}
        style={{v: spring(1, {...presets.wobbly, precision: .01})}}
      >
        {({v}) =>
          <div>
            <MediaElement
              itemscope
              itemtype="http://data-vocabulary.org/Person"
              file="/profile.jpg"
              dim={110}
            >
              <StaggeredName letters="Jason Nathan">
                <small className="block" style={{opacity: v}}>
                  A Senior Web & Mobile Software Engineer based in Singapore
                </small>
              </StaggeredName>
            </MediaElement>
            <nav role="navigation" className="bottom-box"><StaggeredMenu /></nav>
          </div>
      }
      </Motion>
    </div>
  );
}

export default Home;
