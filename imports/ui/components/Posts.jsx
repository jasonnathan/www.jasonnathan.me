import React from 'react';
import { graphql } from 'react-apollo';
import {spring, presets, StaggeredMotion} from 'react-motion';
import getPosts from '/imports/api/posts-query-gql';
import Loader from 'react-loaders';
import PostSummary from './PostSummary.jsx'

const abstractPostsList = ({data}) =>{
  const {posts, loading} = data
  if(loading)
      return (<div className="centered-loader" style={{paddingTop:'25vh'}}><Loader type="ball-triangle-path" /></div>);

  return (
    <ul className="responsive" style={{padding:0}}>
      {posts.map((post, i) => {
        return (
          <li key={i}><PostSummary post={post} /></li>
        )
      })}
    </ul>
  )
}

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
const PostsList = graphql(getPosts)(abstractPostsList);
export default PostsList;
