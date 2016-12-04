/**
 * @function CategoriesList
 * @description The Category Widget used in Articles
 */
import React, {PureComponent} from 'react';
import { graphql } from 'react-apollo';
import {IndexLink, Link} from 'react-router';
import {spring, presets, StaggeredMotion} from 'react-motion';
import {Loader} from 'react-loaders';
import getCategories from '/imports/api/graphql/queries/Categories';

class CategoriesList extends PureComponent{
  constructor(props){
    super(props);
    const {data:{loading, categories=[]}} = props;
    this.state = { loading, categories:this.getAllCategories(categories)}
  }

  // componentWillReceiveProps(newProps){
  //   const {data:{loading, categories=[]}} = newProps;
  //   this.setState({ loading, categories:this.getAllCategories(categories)})
  // }

  getAllCategories(categories){
    const count = categories.length
                  ? categories.reduce((p, c) => ({count:p.count + c.count})).count
                  : 0;

    return [{slug:"", name:"All", count}, ...categories]
  }

  render(){
    const {loading, categories} = this.state;
    if(loading)
      return (<div className="centered-content" style={{transform:'translate3d(1,-50%,1)', top:"50%"}}><Loader type="ball-triangle-path" /></div>);

    return (
      <StaggeredMotion
        defaultStyles={categories.map(() => {return {h: 0.1}})}
        styles={
          prevStyles =>
          prevStyles.map((_, i) => {
            return { h: spring(i === 0 ? 1 : prevStyles[i - 1].h, {...presets.stiff, precision:.1})}})}
      >
        {interpolatingStyles => <div className="box"><h4 className="heading">Categories</h4>
          {interpolatingStyles.map((style, i) => {
            const cat = categories[i], catHTML = {__html: `${cat.name} (${cat.count})`};

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
}

export default graphql(getCategories)(CategoriesList);
