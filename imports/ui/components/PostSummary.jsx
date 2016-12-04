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
    <a href={getUrl()} onMouseOver={prefetchPost} itemProp="mainEntityOfPage">
      <article style={{background:`url(${post.featured_media_url})`, backgroundSize:"cover", backgroundPosition:"50% 50%"}}>
        <meta itemProp="author" content="Jason Nathan" />
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="dateModified" content={post.modified} />
        <div itemProp="image" itemScope itemType="https://schema.org/ImageObject" style={{visibility:"hidden"}}>
          <meta itemProp="url" content={post.featured_media_url} />
        </div>
        <div itemProp="publisher" itemType="http://schema.org/Organization" itemScope style={{visibility:"hidden"}}>
          <meta itemProp="name" content="Jason Nathan" />
          <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
            <meta itemProp="url" content="https://www.jasonnathan.com/apple-icon-180x180.png" />
            <meta itemProp="width" content="180" />
            <meta itemProp="height" content="180" />
          </div>
        </div>
        <div className="post-content">
          <h3 role="heading" itemProp="headline" id={`#${post.slug}`} dangerouslySetInnerHTML={{__html: post.title}} />
          <p dangerouslySetInnerHTML={{__html: truncatise(post.excerpt, {TruncateLength:40})}} />
        </div>
      </article>
    </a>
  )
}

export default withApollo(PostSummary);
