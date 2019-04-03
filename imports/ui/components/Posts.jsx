import React, {PropTypes} from 'react';
import { graphql } from 'react-apollo';
import getPosts from '/imports/api/graphql/queries/Posts';
import {Loader} from 'react-loaders';
import PostSummary from './PostSummary.jsx'

function PostsList({data:{posts, loading, error}, params}){
  if(loading)
      return (<div className="centered-loader" style={{paddingTop:'25vh'}}><Loader type="ball-triangle-path" /></div>);
  if(error){
    throw(error)
  }
  return (
    <ul className="responsive" style={{padding:0}} itemScope itemType="http://schema.org/Blog">
      {posts.map((post, i) => (
        <li
          itemScope
          itemProp="blogPosts"
          itemType="http://schema.org/BlogPosting"
          key={i}
        >
          <PostSummary post={post} />
        </li>
      ))}
    </ul>
  )
}

export default graphql(getPosts, {options: ({params:{category}}) => {
  let _opts = {ssr: true};
  if(category){
    _opts.variables = {category}
  }
  return _opts;
}})(PostsList);
