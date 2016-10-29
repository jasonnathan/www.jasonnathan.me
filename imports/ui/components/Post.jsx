import React from 'react';
import truncatise from 'truncatise';
import FadeInImage from './FadeInImage.jsx';

const Post = ({post}) => {
  return(
    <article>
      <FadeInImage size="100%" className="bg-image" src={post.featured_media_url} />
      <div className="post-content">
        <h3 role="heading" id={`#${post.slug}`} dangerouslySetInnerHTML={{__html: post.title.rendered}} />
        <p dangerouslySetInnerHTML={{__html: truncatise(post.excerpt.rendered, {TruncateLength:30})}} />
      </div>
    </article>
  )
}

export default Post;
