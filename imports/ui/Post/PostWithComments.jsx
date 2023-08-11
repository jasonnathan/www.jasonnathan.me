import React, {PureComponent} from 'react';
import {graphql} from 'react-apollo';
import Helmet from 'react-helmet';
import {Item} from 'react-flex';
import {Loader} from 'react-loaders';
import {Link} from 'react-router';
import entities from 'entities';
import TimeAgo from 'timeago-react';
import getPostBySlug from '/imports/api/graphql/queries/Post';
import ReactDisqusThread from './ReactDisqusThread.jsx';
import CategoriesList from '../components/Categories.jsx';
import BreadCrumbsHeader from '../components/BreadCrumbsHeader.jsx';

const postResolver = (key, text) => {
  return props => {
    switch(key){
      case ':category':
        return props.category;
      case ':slug':
        return props.title;
    }
    return text;
  };
};

const lastCrumbIsString = (link, key, text, index, routes) => {
  link = link.split("/").map(l => l === 'article' ? 'articles' : l).join("/");
  if (index === routes.length -1) {
    return <span key={key}>{text}</span>;
  }

  return <Link to={link} key={key}>{text}</Link>;
}

class PostWithComments extends PureComponent{
  constructor(props){
    super(props);
  }
  toHtml(val){return {__html: val}}
  render(){
    const {
      data:{loading, post, error},
      location, routes, params, router
    } = this.props;

    if(error)
      throw error;

    if(loading)
      return (<div className="centered-loader" style={{paddingTop:'25vh'}}>
        <Loader type="ball-triangle-path" />
      </div>);

    const crumbs = {
      title: entities.decodeHTML(post.title),
      category: entities.decodeHTML(post.categories[0].name)
    }

    return (
      <div role="main" itemScope itemType="http://schema.org/WebPage">
        <BreadCrumbsHeader
          routes={routes}
          params={params}
          goBack={router.goBack}
          resolver={postResolver}
          crumbs={crumbs}
          lastCrumbResolver={lastCrumbIsString}
        />
        <Helmet
          title={`${post.title}`}
          meta={[
            {"name": "description", "content": `${post.excerpt}`},
            {"itemprop": "description", "content": `${post.excerpt}`},
            {"itemprop": "author", "content": "Jason J. Nathan"},
            {"name": "name", "content": `${post.title}`}
          ]}
        />
        <div className="content with-breadcrumbs">
          <div className="scroll-y">
            <div className="responsive" style={{alignItems:"flex-start", display:"flex"}}>
              <Item className="single-post" flex={2}>
                <article className="post-content" itemScope itemType="http://schema.org/BlogPosting">
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
                  <header>
                    <h3 itemProp="headline" dangerouslySetInnerHTML={this.toHtml(post.title)} />
                    <div className="meta">Posted <TimeAgo datetime={post.date} /></div>
                  </header>
                  <section dangerouslySetInnerHTML={this.toHtml(post.content)} itemProp="mainEntityOfPage"x />
                  <ReactDisqusThread
                    identifier={post.slug}
                    title={post.title}
                    url={`https://www.jasonnathan.com/${location.pathname}`}
                  />
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(getPostBySlug, {
  options: ({params}) => {
    let opts = {ssr: true};
    if(!params)
      return opts;

    return {
      ...opts, variables: { slug: params.slug }
    }
  },
  returnPartialData:true
})(PostWithComments);
