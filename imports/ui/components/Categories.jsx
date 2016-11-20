import React from 'react';
import { graphql } from 'react-apollo';
import {IndexLink, Link} from 'react-router';
import {spring, presets, StaggeredMotion} from 'react-motion';
import getCategories from '/imports/api/categories-query-gql';
import Loader from 'react-loaders';

const abstractCategoriesList = ({data:{loading, categories}, location:{pathname}}) =>{
  if(loading)
    return (<div className="centered-content" style={{transform:'translateY(-50%)', top:"50%"}}><Loader type="ball-triangle-path" /></div>);

    let cats = [...categories];
    let count = cats.reduce((prev, curr) => prev.count + curr.count);
    cats.unshift({slug:"", name:"All", count})

  return (
    <StaggeredMotion
      defaultStyles={[...cats].map(() => {return {h: 0.1}})}
      styles={
        prevStyles =>
        prevStyles.map((_, i) => {
          return { h: spring(i === 0 ? 1 : prevStyles[i - 1].h, {...presets.stiff, precision:.1})}})}
    >
      {interpolatingStyles => <div className="box"><h4 className="heading">Categories</h4>
        {interpolatingStyles.map((style, i) => {
          let cat = cats[i],
              catHTML = {__html: `${cat.name} (${cat.count})`}
          return cat.slug === "" ? (
            <IndexLink
              key={cat.slug}
              style={{opacity: style.h}}
              to={`/articles/${cat.slug}`}
              activeClassName="active"
              dangerouslySetInnerHTML={catHTML}
            />
          ) : (
            <Link
              key={cat.slug}
              style={{opacity: style.h}}
              to={`/articles/${cat.slug}`}
              activeClassName="active"
              dangerouslySetInnerHTML={catHTML}
            />
          )
        })}
      </div>
      }
    </StaggeredMotion>
  )
}

const CategoriesList = graphql(getCategories)(abstractCategoriesList);
export default CategoriesList;
