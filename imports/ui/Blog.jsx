/* global document*/
import React from 'react';
import {Flex, Item} from 'react-flex';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import MainMenu from './components/MainMenu.jsx';
import PostsList from './components/Posts.jsx';
import CategoriesList from './components/Categories.jsx';

const Blog = (props) => {
  return (<div>
    <Helmet
      title="Articles | Jason J. Nathan"
      meta={[
        {"name": "description", "content": "Engineering Journal, Guides, Freebies and other musings"}
      ]}
    />
    <div role="main">
      <section className="content" style={{bottom:0}}>
        <div className="scroll-y">
          <StaggeredName letters="All Articles">
            <small>Engineering Journal, Guides, Freebies and other musings</small>
          </StaggeredName>
          <Flex alignItems="flex-start" className="posts-container responsive">
            <Item flex={2}><PostsList {...props} /></Item>
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
