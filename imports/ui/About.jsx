/* global document*/
import React from 'react';
import {Flex, Item} from 'react-flex';
import {Link} from 'react-router'
import {spring, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import MainMenu from './components/MainMenu.jsx';

const popConfig = { stiffness: 360, damping: 25 };

const About = () => {
  return (
    <Motion
      role="main"
      defaultStyle={{v: 0}}
      style={{v: spring(1)}}
    >
      {({v}) => <Flex row alignItems="center" justifyContent="center" style={{height: '100%'}}>
        <Helmet
          title="About | Jason J. Nathan"
          meta={[
              {"name": "description", "content": "A software engineer, writer, teacher and team-lead based in Singapore."}
          ]}
        />
        <div id="start-screen-container" style={{paddingTop:'70px'}}>
          <StaggeredName letters="Software" />
          <p className="block" style={{opacity: v, transform:'translate3d(${v},${v},1)'}}>
            Addicted to software, Jason has been creating software for over 12 years.
          </p>
        </div>
        <MainMenu activePath="About" />
      </Flex>
    }
    </Motion>
  )
}

About.sceneConfig = {
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

export default About;
