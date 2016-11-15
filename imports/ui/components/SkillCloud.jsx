import React, {PropTypes} from 'react';
import {TagCloud} from 'react-tagcloud';
import {Link} from 'react-router';
import {SkillsData} from '/imports/api/data/skills-data';
import FadeInImage from './FadeInImage.jsx';

const {string, number, arrayOf, shape, func} = PropTypes;


export default function SkillCloud(props){
  return (
    <TagCloud {...props} />
  )
}

SkillCloud.defaultProps = {
  minSize:80,
  maxSize:100,
  shuffle: false,
  tags: SkillsData,
  renderer: function Tag(tag){
    return (
      <Link key={tag.to} to={tag.to} title={tag.title}>
        <FadeInImage size="100%" src={tag.src} />
      </Link>
    )
  }
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
