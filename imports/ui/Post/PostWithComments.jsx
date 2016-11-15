import React from 'react';
import {Meteor} from 'meteor/meteor';
import {graphql} from 'react-apollo';
import {Flex, Item} from 'react-flex';
import Loader from 'react-loaders';
import {Link} from 'react-router';
import entities from 'entities';
import getPostBySlug from '/imports/api/post-by-slug-gql';
import ReactDisqusThread from './ReactDisqusThread.jsx';
import CategoriesList from '../components/Categories.jsx';
import BreadCrumbsHeader from '../components/BreadCrumbsHeader.jsx';


const postResolver = (key, text) => {
  return props => {
    switch(key){
      case ':category':
        return props.category;
      case ':slug':
        return props.title;
    }
    return text;
  };
};

const lastCrumbIsString = (link, key, text, index, routes) => {
  if (index === routes.length -1) {
    return <span key={key}>{text}</span>;
  }
  return <Link to={link} key={key}>{text}</Link>;
}

const abstractPostWithComments = (props) => {
  const {loading, post, error} = props.data;
  const {location} = props;
  const {routes, params} = props;
  const getHtml = (val) => ({__html: val});

  if(loading)
    return (<div className="centered-loader" style={{paddingTop:'25vh'}}>
      <Loader type="ball-triangle-path" />
    </div>);
  if(error)
    throw error

  const crumbs = {
    title: entities.decodeHTML(post.title.rendered),
    category: entities.decodeHTML(post.categories[0].name)
  }

  return (
    <div role="main">
      <BreadCrumbsHeader routes={routes} params={params} resolver={postResolver} crumbs={crumbs} lastCrumbResolver={lastCrumbIsString} />
      <div className="content with-breadcrumbs">
        <div className="scroll-y">
          <Flex alignItems="flex-start" className="responsive">
            <Item className="single-post" flex={2}>
              <article className="post-content">
                <header><h3 dangerouslySetInnerHTML={getHtml(post.title.rendered)} /></header>
                <section dangerouslySetInnerHTML={getHtml(post.content.rendered)} />
                <ReactDisqusThread
                  identifier={post.slug}
                  title={post.title.rendered}
                  url={`http://dev.jasonnathan.com/${location.pathname}`}
                />
              </article>
            </Item>
            <Item
              column
              wrap
              alignContent="space-between"
              justifyContent="space-between"
              className="hidden-mobile"
              flex={1}
            >
              <CategoriesList />
            </Item>
          </Flex>
        </div>
      </div>
    </div>
  )
}

const PostWithComments = graphql(getPostBySlug, {
  options: (ownProps) => {
    if(!ownProps.params)
      return {};

    return {
      variables: {
        slug: ownProps.params.slug
      },
      ssr: Meteor.isServer
    }
  }
})(abstractPostWithComments);
export default PostWithComments;
