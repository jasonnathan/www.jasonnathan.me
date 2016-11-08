/* global document*/
import React from 'react';
import {Flex, Item} from 'react-flex';
import Helmet from 'react-helmet';
import StaggeredName from './components/StaggeredName.jsx';
import FadeInImage from './components/FadeInImage.jsx';
import FlipBox from './components/FlipBox.jsx';
import Panel from './components/Panel.jsx';
import {person, website, facts} from './about-text';

function About(props) {
  this.props = props;
    return (
      <div>
        <Helmet
          title="About | Jason J. Nathan"
          meta={[{
            "name": "description",
            "content": "A senior software engineer, writer, teacher and team-lead based in Singapore."
          }
          ]}
        />
        <div role="main">
          <section className="content" style={{bottom:0}}>
            <div className="scroll-y">
              <StaggeredName letters="About" />
              <div className="responsive">
                <Panel header="The Person">{person.map((s, i) => (<p key={i}>{s}</p>))}</Panel>
                <Panel header="The Website">{website.map((s, i) => (<p key={i}>{s}</p>))}</Panel>
                {/* <Panel header="Fun Stats">
                  <div className="responsive center">
                  <FlipBox topLabelText="Github" numText="1.6k" bottomLabelText="commits in 365 days" />
                  <FlipBox topLabelText="StackOverflow" numText="9%" bottomLabelText="position this year" />
                  </div>
                </Panel> */}
                <Panel header="Fun Facts">
                  <table className="list" width="100%">
                    <tbody>
                      {facts.map((s, i) => (
                        <tr key={i}>
                          <th width="40%">{s.label}</th>
                          <td>
                            <a href={s.link} rel="noopener noreferrer no_follow" target="_blank">
                              <FadeInImage noFilter size="auto" style={{height:".8rem"}} src={`/brands/${s.src}`} />
                              {s.text}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Panel>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
}

export default About;
