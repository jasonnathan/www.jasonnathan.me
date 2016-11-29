import React from 'react';
import {withApollo} from 'react-apollo';
import truncatise from 'truncatise';
import getPostBySlug from '/imports/api/graphql/queries/Post';

function PostSummary({post, client}){
  const getUrl = () => {
    const cat = post.categories[0].slug;
    return `/article/${cat}/${post.slug}`;
  }
  const prefetchPost = () => {
    client.query({
      query: getPostBySlug,
      variables: {slug: post.slug}
    });
  }
  return(
    <a href={getUrl()} onMouseOver={prefetchPost}>
      <article style={{background:`url(${post.featured_media_url})`, backgroundSize:"cover", backgroundPosition:"50% 50%"}}>
        <div className="post-content">
          <h3 role="heading" id={`#${post.slug}`} dangerouslySetInnerHTML={{__html: post.title}} />
          <p dangerouslySetInnerHTML={{__html: truncatise(post.excerpt, {TruncateLength:40})}} />
        </div>
      </article>
    </a>
  )
}

export default withApollo(PostSummary);
