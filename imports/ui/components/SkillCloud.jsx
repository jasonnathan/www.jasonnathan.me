import React, {PropTypes} from 'react';
import {TagCloud} from 'react-tagcloud';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import getSkills from '/imports/api/skills-query-gql';
// import {SkillsData} from '/imports/api/data/skills-data';
import FadeInImage from './FadeInImage.jsx';

const {string, number, arrayOf, shape, func} = PropTypes;


export default function SkillCloud(props){
  if(props.loading)
    return (<div className="centered-loader" style={{paddingTop:'25vh'}}>
      <Loader type="ball-triangle-path" />
    </div>);

  const tagProps = {
    minSize:80,
    maxSize:100,
    shuffle: false,
    tags: props.data.skills || [],
    renderer: function Tag(tag){
      const url = tag.featuredImage ? '/skill-bg-checked.svg' : '/skill-bg.svg';
      const _s = {
        backgroundImage: `url(${url})`
      }
      return (
        <Link key={tag._id} to={tag.to} title={tag.title} style={_s}>
          <FadeInImage size="100%" src={tag.icon} />
        </Link>
      )
    }
  }

  return (
    <TagCloud {...tagProps} />
  )
}


SkillCloud.propTypes = {
  minSize: number,
  maxSize: number,
  tags: arrayOf(shape({
    to: string,
    src: string,
    title: string,
    count:number
  })),
  onClick: func,
  rendered: func
}


SkillCloud = graphql(getSkills)(SkillCloud);
