/* global document*/
import React from 'react';
import {Flex, Item} from 'react-flex';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import MainMenu from './components/MainMenu.jsx';
import PostsList from './components/Posts.jsx';
import CategoriesList from './components/Categories.jsx';

// Create the client as outlined above
const popConfig = { stiffness: 360, damping: 25 };

const Blog = () => {
  return (<div>
    <Helmet
      title="Articles | Jason J. Nathan"
      meta={[
        {"name": "description", "content": "Tutorials, Freebies and other ramblings"}
      ]}
    />
    <div role="main">
      <section className="content" style={{bottom:0}}>
        <div className="scroll-y">
          <StaggeredName letters="All Articles" />
          <Flex alignItems="flex-start">
            <Item flex={2}><PostsList /></Item>
            <Item column wrap alignContent="space-between" justifyContent="space-between" className="hidden-mobile" flex={1}>
              <CategoriesList />
            </Item>
          </Flex>
        </div>
      </section>
    </div>
  </div>
  )
}
export default Blog;
