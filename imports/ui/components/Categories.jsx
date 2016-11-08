import React from 'react';
import { graphql } from 'react-apollo';
import {spring, presets, StaggeredMotion} from 'react-motion';
import getCategories from '/imports/api/categories-query-gql';
import Loader from 'react-loaders';

const abstractCategoriesList = ({data}) =>{
  if(data.loading)
    return (<div className="centered-content" style={{paddingTop:'25vh'}}><Loader type="ball-triangle-path" /></div>);
  return (
    <StaggeredMotion
      defaultStyles={[...data.categories].map(() => {return {h: 0.1}})}
      styles={
        prevStyles =>
        prevStyles.map((_, i) => {
          return { h: spring(i === 0 ? 1 : prevStyles[i - 1].h, {...presets.stiff, precision:.1})}})}
    >
      {interpolatingStyles => <div className="box"><h4 className="heading">Categories</h4>
        {interpolatingStyles.map((style, i) => {
          let cat = data.categories[i],
              catHTML = {__html: `${cat.name} (${cat.count})`}
          return (
            <a
              key={cat.slug}
              style={{opacity: style.h}}
              href={`/articles/${cat.slug}`}
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
