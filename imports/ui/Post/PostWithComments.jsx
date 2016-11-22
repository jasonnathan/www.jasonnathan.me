import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {graphql} from 'react-apollo';
import Helmet from 'react-helmet';
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
  link = link.split("/").map(l => l === 'article' ? 'articles' : l).join("/");
  if (index === routes.length -1) {
    return <span key={key}>{text}</span>;
  }

  return <Link to={link} key={key}>{text}</Link>;
}

const abstractPostWithComments = ({data:{loading, post, error}, location, routes, params, router}) => {
  const toHtml = (val) => ({__html: val});
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
      <BreadCrumbsHeader
        routes={routes}
        params={params}
        goBack={router.goBack}
        resolver={postResolver}
        crumbs={crumbs}
        lastCrumbResolver={lastCrumbIsString}
      />
      <Helmet
        title={`${post.title.rendered}`}
        meta={[
          {"name": "description", "content": `${post.content.rendered}`}
        ]}
      />
      <div className="content with-breadcrumbs">
        <div className="scroll-y">
          <Flex alignItems="flex-start" className="responsive">
            <Item className="single-post" flex={2}>
              <article className="post-content">
                <header><h3 dangerouslySetInnerHTML={toHtml(post.title.rendered)} /></header>
                <section dangerouslySetInnerHTML={toHtml(post.content.rendered)} />
                <ReactDisqusThread
                  identifier={post.slug}
                  title={post.title.rendered}
                  url={`https://dev.jasonnathan.com/${location.pathname}`}
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
  options: ({params}) => {
    let opts = {ssr: true};
    if(!params)
      return opts;

    return {
      ...opts, variables: { slug: params.slug }
    }
  }
})(abstractPostWithComments);
export default PostWithComments;
