import React, {PropTypes} from 'react';
import {TagCloud} from 'react-tagcloud';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import {Loader} from 'react-loaders';
import getSkills from '/imports/api/graphql/queries/Skills';
import FadeInSVG from './FadeInSVG.jsx';

const {string, number, arrayOf, shape, bool} = PropTypes;


function SkillCloud(props){
  if(props.data.loading)
    return (<div className="centered-loader" style={{paddingTop:'25vh'}}>
      <Loader type="ball-triangle-path" />
    </div>);

  const tagProps = {
    minSize:80,
    maxSize:100,
    shuffle: !1,
    tags: props.data.skills || [],
    renderer: tag => {
      const url = tag.featuredImage ? '/skill-bg-checked.svg' : '/skill-bg.svg';
      const _s = {
        backgroundImage: `url(${url})`
      }
      return (
        <Link key={tag._id} to={tag.to} title={tag.title} style={_s}>
          <FadeInSVG src={tag.icon} />
        </Link>
      )
    }
  }

  return (
    <TagCloud {...tagProps} />
  )
}


SkillCloud.propTypes = {
  data: shape({
    skills: arrayOf(shape({
      to: string,
      src: string,
      title: string,
      count:number
    })),
    loading: bool
  }),
}


export default graphql(getSkills)(SkillCloud);
