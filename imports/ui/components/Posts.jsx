import React from 'react';
import { graphql } from 'react-apollo';
import {spring, presets, StaggeredMotion} from 'react-motion';
import getPosts from '/imports/api/posts-query-gql';
import Post from './Post.jsx'
import Loader from 'react-loaders'

// MyComponent is a "presentational" or apollo-unaware component,
// It could be a simple React class:
const abstractPostsList = ({data}) =>{
  return data.loading ? (<div className="centered-content"><Loader type="ball-triangle-path" /></div>): (
    <StaggeredMotion
      defaultStyles={[...data.posts].map(() => {return {h: 0.1}})}
      styles={
        prevStyles =>
          prevStyles.map((_, i) => {
            return { h: spring(i === 0 ? 1 : prevStyles[i - 1].h, {...presets.stiff, precision:.1})}})}
    >
      {interpolatingStyles => <ul className="post-list">
        {interpolatingStyles.map((style, i) => {
          return (
            <li key={data.posts[i].slug} style={{opacity: style.h}}>
              <Post post={data.posts[i]} />
            </li>
          )
        })}
      </ul>
      }
    </StaggeredMotion>
  )
}

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
const PostsList = graphql(getPosts)(abstractPostsList);
export default PostsList;
