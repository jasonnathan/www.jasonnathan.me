/* global document*/
import React, {Component} from 'react';
import {Flex, Item} from 'react-flex';
import {Link} from 'react-router'
import {spring, Motion} from 'react-motion';
import Helmet from 'react-helmet';
import { fade} from 'react-router-transitioner';
import StaggeredName from './components/StaggeredName.jsx';
import MainMenu from './components/MainMenu.jsx';


const popConfig = { stiffness: 360, damping: 25 };
const paragraphs = [
  "A burgeoning entrepreneur and service-oriented professional whose passion lies in innovation, engineering and user experiences.",
  "Possesses over ten years of experience in Software Engineering and has an outgoing personality.",
  "Commands an immense flair for communication skills to connect with a wide range of audiences.",
  "Driven to be self-trained, displays enthusiasm when exploring new ideas and excels beyond paper qualifications.",
  "A captivating and charismatic presenter of ideas and a valuable asset to his team.",
  "A natural leader who can inspire, nurture and produce results."
];

class About extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    // if(Meteor.isClient && typeof jQuery !== undefined){
    //   $('#start-screen-container').slimScroll({height:'100%', width:'100%'})
    // }

  }
  render(){
    const getTranslate = (v, t) => {
      t = `${t*100}%`;
      return `translateY(${t})`;
    }
    return (
      <Motion
        role="main"
        defaultStyle={{v: 0, t:1}}
        style={{v: spring(1, {...popConfig}), t: spring(0, {...popConfig})}}
      >
        {({v, t}) => <Flex row alignItems="center" className="noscroll" justifyContent="center" style={{height: '100%'}}>
          <Helmet
            title="About | Jason J. Nathan"
            meta={[
                {"name": "description", "content": "A senior software engineer, writer, teacher and team-lead based in Singapore."}
            ]}
          />
          <div id="start-screen-container" style={{height: 'calc(100vh - 70px)'}}>
            <StaggeredName letters="About" />
            <Flex className="responsive">
              <Item flex={1} wrap>
                <section className="post-content" style={{opacity: v, transform:`${getTranslate(v, t)}`}}>
                  {paragraphs.map((p, i) => <p key={i} className="block">{p}</p>)}
                </section>
              </Item>
              <Item flex={1} wrap>

              </Item>
            </Flex>
          </div>
          <MainMenu activePath="About" />
        </Flex>
      }
      </Motion>
    )
}
}

About.sceneConfig = fade

export default About;
