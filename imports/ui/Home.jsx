/* global document*/
import React from 'react';
import {Flex} from 'react-flex';
import {spring, presets, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import { fade } from 'react-router-transitioner';
import StaggeredMenu from './components/StaggeredMenu.jsx';
import StaggeredName from './components/StaggeredName.jsx';
import MediaElement from './components/MediaElement.jsx';
import MainMenu from './components/MainMenu.jsx';

const Home = () => {
  return (
    <Motion
      role="main"
      defaultStyle={{v: -1}}
      style={{v: spring(1, {...presets.wobbly, precision: .01})}}
    >
      {({v}) => <Flex row alignItems="center"  className="noscroll" justifyContent="center" style={{height: '100%'}}>
        <Helmet
          title="Home | Jason J. Nathan"
          meta={[
              {"name": "description", "content": "A senior software engineer, writer, teacher and leader based in Singapore."}
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
                A Senior Web & Mobile Software Engineer based in Singapore
              </small>
            </StaggeredName>
          </MediaElement>
          <nav role="navigation" className="bottom-box"><StaggeredMenu /></nav>
        </div>
        <MainMenu activePath="Home" />
      </Flex>
    }
    </Motion>
  );
}

const popConfig = { stiffness: 360, damping: 25 };

Home.sceneConfig = fade

export default Home;
