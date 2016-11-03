/* global document*/
import React from 'react';
import {Flex, Item} from 'react-flex';
import {spring} from 'react-motion';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import MainMenu from './components/MainMenu.jsx';
import PostsList from './components/Posts.jsx';
import CategoriesList from './components/Categories.jsx';
import { fade} from 'react-router-transitioner';

// Create the client as outlined above
const popConfig = { stiffness: 360, damping: 25 };

const Blog = () => {
  return (<Flex row alignItems="flex-start" className="noscroll" justifyContent="center" style={{height: '100%'}}>
        <Helmet
          title="Articles | Jason J. Nathan"
          meta={[
              {"name": "description", "content": "Tutorials, Freebies and other ramblings"}
          ]}
        />
          <div id="start-screen-container" style={{paddingTop:'80px', height:'100vh'}}>
            <StaggeredName letters="All Articles" />
            <Flex alignItems="flex-start">
              <Item flex={2}><PostsList /></Item>
              <Item column wrap alignContent="space-between" justifyContent="space-between" className="hidden-mobile" flex={1}>
                <CategoriesList />
              </Item>
            </Flex>
            <MainMenu activePath="Blog" />
            <br />
            <br />
            <br />
          </div>
      </Flex>)
}

Blog.sceneConfig = fade



export default Blog;
