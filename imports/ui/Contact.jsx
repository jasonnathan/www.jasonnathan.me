/* global document*/
import React from 'react';
import {Flex} from 'react-flex';
import Helmet from 'react-helmet';
import EmailIcon from 'react-icons/lib/fa/envelope-o';
import PhoneIcon from 'react-icons/lib/fa/phone';
import SkypeIcon from 'react-icons/lib/fa/skype';
import SlackIcon from 'react-icons/lib/fa/slack';

import StaggeredName from './components/StaggeredName.jsx';

const Contact = () => {
  return (
    <Flex row alignItems="center" className="noscroll" justifyContent="center" style={{height: '100%'}}>
      <Helmet
        title="Contact Me | Jason J. Nathan"
        meta={[
          {"name": "description", "content": "Contact me for freelance projects, work or just for a chat"}
        ]}
      />
      <div role="main" itemScope itemType="http://schema.org/WebPage">
        <section className="content" style={{bottom:0}}>
          <div className="scroll-y">
            <header
              itemScope
              itemType="http://schema.org/WPHeader"
              role="banner"
            >
              <StaggeredName letters="Contact">
                <small className="block" itemProp="description">
                  Contact me for freelance projects, consultation or just for a chat.
                </small>
              </StaggeredName>
            </header>
            <div itemScope itemType="http://schema.org/Person" className="contact-links" style={{display:"flex", justifyContent:"center", maxWidth:"320px", margin:"auto", fontSize:"2rem", flexDirection:"column"}}>
              <h1 itemProp="name" style={{textIndent:"-10000px"}}>Jason Nathan</h1>
              <span itemProp="telephone">
                <a title="Click here to make a call if you are on mobile" href="tel:+6592320417" style={{flex:1,display:"flex"}}><PhoneIcon /><small>+65 92320417</small></a>
              </span>
              <span itemProp="telephone">
                <a rel="nofollow noopener noreferrer" title="Click here to start a skype call" href="skype:jason.nathan?call" style={{flex:1,display:"flex"}}><SkypeIcon /><small>jason.nathan</small></a>
              </span>
              <span itemProp="email">
                <a href="mailto:jjnathanjr+web@gmail.com?subject=Hi+there" style={{flex:1,display:"flex"}}><EmailIcon /><small>jjnathanjr+web@gmail.com</small></a>
              </span>
              <span>
                <a target="_blank" rel="nofollow noopener noreferrer" title="Click here to connect via slack" href="https://jaystalk.slack.com/messages" style={{flex:1,display:"flex"}}><SlackIcon /><small>Slack</small></a>
              </span>
            </div>
          </div>
        </section>
      </div>
    </Flex>
  )
}


export default Contact;
