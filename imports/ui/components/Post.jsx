import React from 'react';
import truncatise from 'truncatise';
import FadeInImage from './FadeInImage.jsx';

const Post = ({post}) => {
  const getUrl = () => {
    const cat = post.categories[0].slug;
    return `/${cat}/${post.slug}`;
  }
  return(
    <a href={getUrl()}>
      <article>
        <FadeInImage size="100%" className="bg-image" src={post.featured_media_url} />
        <div className="post-content">
          <h3 role="heading" id={`#${post.slug}`} dangerouslySetInnerHTML={{__html: post.title.rendered}} />
          <p dangerouslySetInnerHTML={{__html: truncatise(post.excerpt.rendered, {TruncateLength:30})}} />
        </div>
      </article>
    </a>
  )
}

export default Post;
