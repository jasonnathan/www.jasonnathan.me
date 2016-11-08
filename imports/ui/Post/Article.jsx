/* global document*/
import React from 'react';
import {Flex} from 'react-flex';
import {spring} from 'react-motion';
import Loader from 'react-loaders';
import MainMenu from '../components/MainMenu.jsx';
import PostWithComments from './PostWithComments.jsx';

// Create the client as outlined above
const popConfig = { stiffness: 360, damping: 25 };

const Article = (props) => {
  return (
    <div role="main">
      <section className="content" style={{bottom:0}}>
        <div className="scroll-y">
          <PostWithComments {...props} />
        </div>
      </section>
    </div>
  )
}

Article.sceneConfig = {
  atEnter: {
    opacity: 1
  },
  atLeave: {
    opacity: spring(0.1, popConfig)
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



export default Article;
