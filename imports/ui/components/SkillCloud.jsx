import React, {PropTypes} from 'react';
import {TagCloud} from 'react-tagcloud';
import {Link} from 'react-router';
import FadeInImage from './FadeInImage.jsx';

const {string, number, arrayOf, shape, func} = PropTypes;

const skurl = (path) => `/work/skills/${path}`;
const skimg = (path) => `/brands/${path}`;

const skills = [
  {to: skurl('reactjs'), src: skimg('reactjs.svg'), title: "React Projects", count:1, category:"UI Frameworks" },
  {to: skurl('d3'), src: skimg('d3.svg'), title: "D3 Projects", count:6, category: "UI Frameworks" },
  {to: skurl('knockout'), src: skimg('knockout.svg'), title: "Knockout Projects", count:6, category: "UI Frameworks" },
  {to: skurl('handlebars'), src: skimg('handlebars.svg'), title: "Handlebars Projects", count:6, category: "UI Frameworks" },
  {to: skurl('jquery'), src: skimg('jquery.svg'), title: "jQuery Projects", count:6, category: "UI Frameworks" },
  {to: skurl('less'), src: skimg('less.svg'), title: "LESS Projects", count:6, category: "UI Frameworks" },
  {to: skurl('javascript'), src: skimg('JS.svg'), title: "Javascript Projects", count:3, category:"Languages" },
  {to: skurl('php'), src: skimg('php.svg'), title: "PHP Projects", count:3, category:"Languages" },
  {to: skurl('perl'), src: skimg('perl-logo.svg'), title: "Perl Projects", count:3, category:"Languages" },
  {to: skurl('nodejs'), src: skimg('nodejs-light.svg'), title: "NodeJS Projects", count:6, category: "Server Frameworks" },
  {to: skurl('kohana'), src: skimg('kohana.svg'), title: "Kohana Projects", count:6, category: "Server Frameworks" },
  {to: skurl('xampp'), src: skimg('xampp.svg'), title: "XAMPP Projects", count:5, category: "Server Frameworks" },
  {to: skurl('meteor'), src: skimg('meteor-light.svg'), title: "Meteor Projects", count:5, category: "FullStack Frameworks" },
  {to: skurl('sailsjs'), src: skimg('sailsjs-light.svg'), title: "SailsJS Projects", count:5, category: "FullStack Frameworks" },
  {to: skurl('momentjs'), src: skimg('momentjs.svg'), title: "MomentJS Projects", count:1, category: "ToolKits" },
  {to: skurl('eslint'), src: skimg('eslint.svg'), title: "ESlint Projects", count:6, category: "ToolKits" },
  {to: skurl('react-router'), src: skimg('react-router-light.svg'), title: " React Router Projects", count:6, category: "ToolKits" },
  {to: skurl('apollostack'), src: skimg('apollostack.svg'), title: "Apollo Projects", count:6, category: "Data Frameworks" },
  {to: skurl('redux'), src: skimg('redux-light.png'), title: "Redux Projects", count:1, category: "Data Frameworks" },
  {to: skurl('mocha'), src: skimg('mocha.svg'), title: "Mocha Projects", count:6, category: "Testing & Integration" },
  {to: skurl('jasmine'), src: skimg('jasmine.svg'), title: "Jasmine Projects", count:6, category: "Testing & Integration" },
]


export default function SkillCloud(props){
  return (
    <TagCloud {...props} />
  )
}

SkillCloud.defaultProps = {
  minSize:80,
  maxSize:100,
  shuffle: false,
  tags: skills,
  onClick: (tag,e) => {
    e.preventDefault();
    console.log("Linked clicked");
  },
  renderer: function Tag(tag, size){
    size = `${size}%`;
    const style = {width:size, height:size}
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
