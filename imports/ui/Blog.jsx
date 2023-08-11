/* global document*/
import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Item} from 'react-flex';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import PostsList from './components/Posts.jsx';
import CategoriesList from './components/Categories.jsx';
// import Perf from 'react-addons-perf';
//
// if(Meteor.isClient){
//   window.Perf = Perf;
//   window.Perf.start();
// }

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
        {"name": "description", "content": description},
        {"itemprop": "description", "content": description},
        {"itemprop": "creator", "content": "Jason J. Nathan"},
        {"name": "name", "content": `${title} | Jason J. Nathan`}
      ]}
    />
    <div role="main" itemScope itemType="http://schema.org/WebPage">
      <section className="content" style={{bottom:0}}>
        <div className="scroll-y">
          <header
            itemScope
            itemType="http://schema.org/WPHeader"
            role="banner"
          >
            <StaggeredName letters={title}>
              <small itemProp="description">
                Engineering Journal, Guides, Freebies and other musings
              </small>
            </StaggeredName>
          </header>
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

Blog.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string
  })
}

export default Blog;
