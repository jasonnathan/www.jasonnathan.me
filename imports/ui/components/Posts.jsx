import React from 'react';
import { Meteor } from 'meteor/meteor';
import { graphql } from 'react-apollo';
import getPosts from '/imports/api/posts-query-gql';
import Loader from 'react-loaders';
import PostSummary from './PostSummary.jsx'

const abstractPostsList = ({data:{posts, loading, error}, params}) =>{
  if(loading)
      return (<div className="centered-loader" style={{paddingTop:'25vh'}}><Loader type="ball-triangle-path" /></div>);
  if(error){
    throw(error)
  }
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
const PostsList = graphql(getPosts, {options: ({params:{category}}) => {
  let _opts = {ssr: true};
  if(category){
    _opts.variables = {category}
  }
  return _opts;
}})(abstractPostsList);
export default PostsList;
