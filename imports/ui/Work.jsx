/* global document*/
import React from 'react';
import {Flex} from 'react-flex';
import {spring, presets, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import SkillCloud from './components/SkillCloud.jsx';

export default function Work(){
  return (
    <Flex row alignItems="center" className="noscroll" justifyContent="center" style={{height: '100%'}}>
      <Helmet
        title="Works | Jason J. Nathan"
        meta={[
          {"name": "description", "content": "A collection of some of my professional work and other side projects with React, Meteor and NodeJS. Oh! And PHP"}
        ]}
      />
      <div role="main" style={{height:"100%"}} itemScope itemType="http://schema.org/WebPage">
        <section className="content" style={{bottom:0}}>
          <div className="scroll-y">
            <Motion
              role="main"
              defaultStyle={{v: -1}}
              style={{v: spring(1, {...presets.gentle, precision: .01})}}
            >
              {({v}) =>
                <StaggeredName letters="Work">
                  <small className="block" style={{opacity: v}}>
                    Click on the modules | frameworks | languages etc to see work done.
                  </small>
                </StaggeredName>
              }
            </Motion>
            <SkillCloud />
            <br />
            <br />
            <br />
            <br />
          </div>
        </section>
      </div>
    </Flex>
  )
}
