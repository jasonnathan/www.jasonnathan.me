import React, {Component} from 'react';
import {Link} from 'react-router';
import {StaggeredMotion, spring} from 'react-motion';
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
    this.lines = skillItem(props.params.skill).overview.split("<br />");
  }

  staggeredProps(){
    const p = this.lines;
    const _s = { stiffness: 900, damping: 50, precision:.1 }
    return {
      defaultStyles: p.map(() => ({t:50, o:0.1})),
      styles: prevInterpolatedStyles => prevInterpolatedStyles.map((_,i) => {
        return i === 0
              ? {t: spring(0, _s), o:spring(1, _s)}
              : {t: spring(prevInterpolatedStyles[i - 1].t, _s), o:spring(prevInterpolatedStyles[i - 1].o)}
      })
    }
  }

  staggeredStyle({t,o}){
    return {transform:`translate3d(0,${t}%,0)`, margin:"1rem auto 0 auto", opacity:o}
  }

  render(){
    const {routes, params} = this.props;
    const skill = skillItem(params.skill);
    const projs = skill.projects;
    return (
      <div role="main" style={{position:"fixed", top:0, left:0, width:"100vw", height:"100%", bottom:0, background:"#222"}}>
        <BreadCrumbsHeader
          routes={routes}
          params={params}
          goBack={this.props.router.goBack}
          resolver={skillResolver}
          crumbs={skill.title}
          lastCrumbResolver={lastCrumbIsString}
        />
        <div className="content with-breadcrumbs with-footer">
          <div className="scroll-y">
            <StaggeredMotion {...this.staggeredProps()}>
              {interpolatedStyles =>
                <article className="single-post skill-description">
                {interpolatedStyles.map((style, i) => (
                  <p
                    key={i}
                    style={this.staggeredStyle(style)}
                    dangerouslySetInnerHTML={{__html: this.lines[i]}}
                  />
                ))}
                </article>
              }
            </StaggeredMotion>
          </div>
        </div>
        <FooterTransition>
          <ul className="bottom-tabs" style={{maxWidth:`${(projs.length + 1) * 170}px`}}>
            <li><Link to={skill.to} activeClassName="active">Overview</Link></li>
            {projs.map(p => (
              <li key={p.path}><Link activeClassName="selected" to={p.path}>{p.name}</Link></li>
            ))}
          </ul>
        </FooterTransition>
      </div>
    )
  }
}
