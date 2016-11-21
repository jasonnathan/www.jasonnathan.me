/* global document*/
import React from 'react';
import {Flex} from 'react-flex';
import {spring, presets, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';

const Contact = () => {
  return (
    <Flex row alignItems="center" className="noscroll" justifyContent="center" style={{height: '100%'}}>
      <Helmet
        title="Works | Jason J. Nathan"
        meta={[
          {"name": "description", "content": "Contact me for freelance projects, work or just for a chat"}
        ]}
      />
      <div role="main">
        <section className="content" style={{bottom:0}}>
          <div className="scroll-y">
            <Motion
              role="main"
              defaultStyle={{v: -1}}
              style={{v: spring(1, {...presets.gentle, precision: .01})}}
            >
              {({v}) =>
                <StaggeredName letters="Contact">
                  <small className="block" style={{opacity: v}}>
                    Contact me for freelance projects, work or just for a chat.
                  </small>
                </StaggeredName>
              }
            </Motion>
          </div>
        </section>
      </div>
    </Flex>
  )
}


export default Contact;
