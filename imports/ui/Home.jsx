/* global document*/
import React from 'react';
import {Flex} from 'react-flex';
import {spring, presets, Motion} from 'react-motion';
import Helmet from 'react-helmet';

import StaggeredMenu from './components/StaggeredMenu.jsx';
import StaggeredName from './components/StaggeredName.jsx';
import MediaElement from './components/MediaElement.jsx';

const Home = () => {
  return (
    <Motion
      role="main"
      defaultStyle={{v: -1}}
      style={{v: spring(1, {...presets.wobbly, precision: .01})}}
    >
      {({v}) => <Flex row alignItems="center" justifyContent="center" style={{height: '100%'}}>
        <Helmet
          title="Home | Jason J. Nathan"
          meta={[
              {"name": "description", "content": "A software engineer, writer, teacher and leader based in Singapore."}
          ]}
        />
        <div id="start-screen-container">
          <MediaElement
            itemscope
            itemtype="http://data-vocabulary.org/Person"
            file="/profile.jpg"
            dim={110}
          >
            <StaggeredName letters="Jason Nathan">
              <small className="block" style={{opacity: v}}>
                A Software Engineer based in Singapore
              </small>
            </StaggeredName>
          </MediaElement>
          <nav role="navigation" className="bottom-box"><StaggeredMenu /></nav>
        </div>
      </Flex>
    }
    </Motion>
  );
}

const popConfig = { stiffness: 360, damping: 25 };

Home.sceneConfig = {
  atEnter: {
    opacity: 1
  },
  atLeave: {
    opacity: spring(0, popConfig)
  },
  atActive: {
    opacity: 1
  },
  mapStyles(styles) {
    return {
      height:'100%',
      opacity: styles.opacity
    };
  }
}

export default Home;
