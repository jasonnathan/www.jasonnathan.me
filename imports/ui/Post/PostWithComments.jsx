import React from 'react';
import {graphql} from 'react-apollo';
import {Flex, Item} from 'react-flex';
import Loader from 'react-loaders';
import getPostBySlug from '/imports/api/post-by-slug-gql';
import ReactDisqusThread from './ReactDisqusThread.jsx';
import MainMenu from '../components/MainMenu.jsx';
import CategoriesList from '../components/Categories.jsx';

let lc = 1;

const abstractPostWithComments = (props) => {
  const {loading, post, error} = props.data;
  const {location} = props;

  if(loading)
      return (<div className="centered-loader" style={{paddingTop:'25vh'}}>
        <Loader type="ball-triangle-path" />
      </div>);

  if (error) {
    const result = {
      __html: JSON.stringify(error, null, 2).replace("\n", "<br />")
    }
    return (<pre style={{maxWidth:'75vh'}} dangerouslySetInnerHTML={result} />)
  }
  lc++;
  if(!post)
    return (<pre style={{maxWidth:'75vh'}} dangerouslySetInnerHTML={{__html:JSON.stringify(props, null, 2)}} />)
  const article = post[0];
  const getHtml = (val) => ({__html: val});
  return (
    <div className="scroll-y">
      <Flex alignItems="flex-start">
        <Item className="single-post" flex={2}>
          <article className="post-content">
            <header><h3 dangerouslySetInnerHTML={getHtml(article.title.rendered)} /></header>
            <section dangerouslySetInnerHTML={getHtml(article.content.rendered)} />
            {Meteor.isClient && (
              <ReactDisqusThread
                identifier={article.slug}
                title={article.title.rendered}
                url={`http://dev.jasonnathan.com/${location.pathname}`}
              />)}
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
  )
}

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
const PostWithComments = graphql(getPostBySlug, {
  options: (ownProps) => {
    if(!ownProps.routeParams)
      return {};

    return {variables: {
        slug:ownProps.routeParams.slug
      }}
  },
  props:(props) => {
    return props;
  }
})(abstractPostWithComments);
export default PostWithComments;
