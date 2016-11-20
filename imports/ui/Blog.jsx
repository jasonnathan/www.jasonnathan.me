/* global document*/
import React from 'react';
import {Flex, Item} from 'react-flex';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import MainMenu from './components/MainMenu.jsx';
import PostsList from './components/Posts.jsx';
import CategoriesList from './components/Categories.jsx';

const Blog = (props) => {
  let title = "All Articles",
  description = "Engineering Journal, Guides, Freebies and other musings";
  if(props.params.category){
    title = props.params.category.toUpperCase();
    description = `Articles filed in '${title}'`
  }
  return (<div>
    <Helmet
      title={`${title} | Jason J. Nathan`}
      meta={[
        {"name": "description", "content": description}
      ]}
    />
    <div role="main">
      <section className="content" style={{bottom:0}}>
        <div className="scroll-y">
          <StaggeredName letters={title}>
            <small>Engineering Journal, Guides, Freebies and other musings</small>
          </StaggeredName>
          <Flex alignItems="flex-start" className="posts-container responsive">
            <Item flex={2}><PostsList {...props} /></Item>
            <Item column wrap alignContent="space-between" justifyContent="space-between" className="hidden-mobile" flex={1}>
              <CategoriesList location={props.location} />
            </Item>
          </Flex>
        </div>
      </section>
    </div>
  </div>
  )
}
export default Blog;
