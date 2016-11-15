import React, {Component} from 'react';
import {Link} from 'react-router';
// import {Motion, presets, spring} from 'react-motion';
import {SkillsData, skurl} from '/imports/api/data/skills-data';
import BreadCrumbsHeader from '../components/BreadCrumbsHeader.jsx';
import FooterTransition from '../components/FooterTransition.jsx';
import StaggeredName from '../components/StaggeredName.jsx'

const skillItem = skill => SkillsData.find(a => a.to === skurl(skill));

const skillResolver = (key, text) => skill => key === ':skill' ? skill : text;

const lastCrumbIsString = (link, key, text, index, routes) => {
  if (index === routes.length -1) {
    return <StaggeredName letters={text} key={key} />;
  }
  return <Link to={link} key={key}>{text}</Link>;
}

export default class Skill extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: true
    }
  }

  openSideBar(active, e){
    e.stopPropagation();
    this.setState({
      open: active
    });
  }

  render(){
    const {routes, params} = this.props;
    const skill = skillItem(params.skill);
    const projs = [1, 2,3,4,5,6,7,8,9,10,11];
    return (
      <div role="main" style={{position:"fixed", top:0, left:0, width:"100vw", height:"100%", bottom:0,background:"#222"}}>
        <BreadCrumbsHeader routes={routes} params={params} resolver={skillResolver} crumbs={skill.title} lastCrumbResolver={lastCrumbIsString} />
        {/* <aside className={`leftbar ${isOpen}`}>
          <header className="header" onClick={(e) => this.openSideBar(true, e)}>
            <h4>SideBar</h4>
            <button className="close" onClick={(e) => this.openSideBar(false, e)}>X</button>
          </header>
          <section className="content with-header">
            <p>This {params.skill.title} is the coolest thing in the world</p>
          </section>
        </aside> */}
        <div className="content with-breadcrumbs with-footer">
          <div className="scroll-y" />
        </div>
        <FooterTransition>
          <ul className="bottom-tabs" style={{minWidth:`${(projs.length * 154)}px`}}>
            <li><Link to={skill.to} className="selected">Overview</Link></li>
            {projs.map(p => {
              return (
                <li key={p}>
                  <Link to={skill.to}>Private Property Singapore {p}</Link>
                </li>
              )
            })}
          </ul>
        </FooterTransition>
      </div>
    )
  }
}
