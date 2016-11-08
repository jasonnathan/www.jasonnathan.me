/* global document*/
import React from 'react';
import {Flex, Item} from 'react-flex';
import {spring, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import SkillCloud from './components/SkillCloud.jsx';

export default function Work(props){
  return (
    <Flex row alignItems="center" className="noscroll" justifyContent="center" style={{height: '100%'}}>
      <Helmet
        title="Works | Jason J. Nathan"
        meta={[
          {"name": "description", "content": "A showcase of some of my professional work and other side projects with React, Meteor and NodeJS. Oh! And PHP"}
        ]}
      />
      <div role="main">
        <section className="content" style={{bottom:0}}>
          <div className="scroll-y">
            <StaggeredName letters="Work" />
            <SkillCloud />
          </div>
        </section>
      </div>
    </Flex>
  )
}
