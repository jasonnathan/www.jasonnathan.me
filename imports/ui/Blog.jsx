/* global document*/
import React from 'react';
import {Flex} from 'react-flex';
import {spring, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import MainMenu from './components/MainMenu.jsx';
import PostsList from './components/Posts.jsx';

// Create the client as outlined above
const popConfig = { stiffness: 360, damping: 25 };

const Blog = () => {
  return (
    <Motion
      role="main"
      defaultStyle={{v: 0}}
      style={{v: spring(1)}}
    >
      {({v}) => <Flex row alignItems="center" justifyContent="center" style={{height: '100%'}}>
        <Helmet
          title="About Jason J. Nathan"
          meta={[
              {"name": "description", "content": "A software engineer, writer, teacher and team-lead based in Singapore."}
          ]}
        />
        <div id="start-screen-container" style={{paddingTop:'80px'}}>
          <StaggeredName letters="Articles" />
          <PostsList />
        </div>
        <MainMenu activePath="Blog" />
      </Flex>
    }
    </Motion>
  )
}

Blog.sceneConfig = {
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

export default Blog;
