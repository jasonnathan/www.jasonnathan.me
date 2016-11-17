import React from 'react';
import { Meteor } from 'meteor/meteor';
import { graphql } from 'react-apollo';
// import {spring, presets, StaggeredMotion} from 'react-motion';
import getPosts from '/imports/api/posts-query-gql';
import Loader from 'react-loaders';
import PostSummary from './PostSummary.jsx'

const abstractPostsList = ({data}) =>{
  const {posts, loading, error} = data
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
const PostsList = graphql(getPosts, {options: {ssr: true}})(abstractPostsList);
export default PostsList;
