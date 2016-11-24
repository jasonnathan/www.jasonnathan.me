import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import {graphql} from 'react-apollo';
import {StaggeredMotion, spring} from 'react-motion';
import Loader from 'react-loaders';
import Helmet from 'react-helmet';
import { createContainer } from 'meteor/react-meteor-data';
import {skurl} from '/imports/api/data/skills-data';
import getSkill from '/imports/api/skill-by-to-gql';
import BreadCrumbsHeader from '../components/BreadCrumbsHeader.jsx';
import FooterTransition from '../components/FooterTransition.jsx';
import StaggeredName from '../components/StaggeredName.jsx';
import SkillEditor from '../components/SkillEditor.jsx';

const skillItem = skill => SkillsData.find(a => a.to === skurl(skill));

const skillResolver = (key, text) => skill => key === ':skill' ? skill : text;

const lastCrumbIsString = (link, key, text, index, routes) => {
  if (index === routes.length -1) {
    return <StaggeredName letters={text} key={key} />;
  }
  return <Link to={link} key={key}>{text}</Link>;
}

class abstractSkill extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentIndex: 0,
      isLoggedIn: props.userId,
      editing: false,
      description: null
    }
    this.onEdit = () => {
      this.setState({editing: !this.state.editing});
    }
  }

  componentWillReceiveProps(props){
    console.log("Received", props)
  }

  getContainerStyles(skill){
    const ci = this.state.currentIndex;
    let img = ci === 0 ? skill.featuredImage : skill.projects[ci-1].featuredImage;
    img = img || '/screenshots/work-in-progress.jpg';
    return {
      position:"fixed",
      top:0,
      left:0,
      width:"100vw",
      height:"100%",
      bottom:0,
      backgroundSize:"cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition:"50% 50%",
      backgroundImage: `url(${img})`
    }
  }

  splitOnBreak(content){
    return content.split("<br />");
  }

  staggeredProps(contentArr){
    const p = [...contentArr];
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

  isSelected(idx){
    return this.state.currentIndex === idx ? "selected" : "";
  }

  navigateToProj(e,p, idx){
    e.preventDefault();
    this.setState({editing:false, currentIndex: idx});
  }

  computePositionStyles(idx){
    const ci = this.state.currentIndex,
          base = 100,
          opacity = ci === idx ? 1 : .1;
    let pos, ret;

    pos = (-base * (ci-idx)) -50;
    ret = {
      transform: `translate3d(${pos}%,0,0)`,
      opacity
    }
    return ret;
  }

  showEditButton(){
    if(this.props.userId && !this.state.editing)
      return (
        <div className="buttons" style={styles.buttons}>
          <button onClick={this.onEdit} style={styles.edit}>Edit</button>
        </div>
      )
  }

  setEditingState(state){
    this.setState({editing:state});
  }

  refreshSkill(){
    console.log("Data refreshed")
    this.props.data.refetch();
  }

  render(){
    const {data:{loading, skill, error}, routes, params} = this.props;
    if(loading)
      return (<div className="centered-loader" style={{paddingTop:'25vh'}}>
        <Loader type="ball-triangle-path" />
      </div>);

    const description = skill.description || `<h2 style="text-align:center">WORK IN PROGRESS</h2>
      <br /> Development for this website <a target="_blank" href="https://github.com/jasonnathan/jasonnathan-react.com/commit/e563cce22f79f261e06cd155524603974bb4da6a">
        began ${daysPast} days ago</a>. The <a href="https://github.com/jasonnathan/jasonnathan-react.com/commit/db81b68dc10aa7f50b4dc73988a55dc14db605d7" target="_blank">
      first article was written ${contentPast} days ago</a>.
      <br />Content is being uploaded everyday, please be patient.<br />In the meantime, look out for items that are marked &check;`;

    const projs = skill.projects;

    return (
      <div role="main" style={this.getContainerStyles(skill)}>
        <BreadCrumbsHeader
            routes={routes}
            params={params}
            goBack={this.props.router.goBack}
            resolver={skillResolver}
            crumbs={skill.title}
            style={{background:"#111"}}
            lastCrumbResolver={lastCrumbIsString}
        />
        <Helmet
          title={`Work with ${skill.title} | Singapore`}
          meta={[
            {"name": "description", "content": `Have a look at stuff I've done with ${skill.title}`}
          ]}
        />
        <div style={this.computePositionStyles(0)} className="content with-breadcrumbs with-footer">
          {this.state.currentIndex === 0 && (
            <div className="scroll-y">
              {this.showEditButton()}
              {this.props.userId && this.state.editing ? (
                <SkillEditor
                  {...skill}
                  description={description}
                  setEditingState={(state) => this.setEditingState(state)}
                  refreshSkill={() => this.refreshSkill()}
                />
              ) : (
                <StaggeredMotion {...this.staggeredProps(this.splitOnBreak(description))}>
                  {interpolatedStyles =>
                    <article className="single-post skill-description" style={{backgroundImage:"url(/green-bg.svg)"}}>
                      {interpolatedStyles.map((style, i) => (
                        <p
                          key={i}
                          style={this.staggeredStyle(style)}
                          dangerouslySetInnerHTML={{__html: this.splitOnBreak(description)[i]}}
                        />
                      ))}
                    </article>
                  }
                </StaggeredMotion>
              )}
            </div>
          )}
        </div>
        {projs.length && projs.map((p, i) => (
          <div key={p.to} style={this.computePositionStyles(i+1)} className="content with-breadcrumbs with-footer">
            {this.state.currentIndex === i+1 && (
              <div className="scroll-y">
                {this.showEditButton()}
                {this.props.userId && this.state.editing ? (
                  <SkillEditor
                    {...p}
                    _id={skill._id  +"_" + i}
                    setEditingState={(state) => this.setEditingState(state)}
                    refreshSkill={() => this.refreshSkill()}
                  />
                ) : (
                  <StaggeredMotion {...this.staggeredProps(this.splitOnBreak(p.description))}>
                    {interpolatedStyles =>
                      <article className="single-post skill-description" style={{backgroundImage:"url(/green-bg.svg)", backgroundSize:"cover"}}>
                        {interpolatedStyles.map((style, x) => (
                          <p
                            key={x}
                            style={this.staggeredStyle(style)}
                            dangerouslySetInnerHTML={{__html: this.splitOnBreak(p.description)[x]}}
                          />
                        ))}
                      </article>
                    }
                  </StaggeredMotion>
                )}
              </div>
            )}
          </div>
        ))}
        <FooterTransition>
          <ul className="bottom-tabs" style={{maxWidth:`${(projs.length + 1) * 170}px`}}>
            <li>
              <a href={skill.to} className={this.isSelected(0)} onClick={(e) => this.navigateToProj(e, skill, 0)}>
                Overview
              </a>
            </li>
            {projs.map((p, i) => (
              <li key={p.to}>
                <a className={this.isSelected(i+1)} onClick={(e) => this.navigateToProj(e,p, i+1)} href={p.to}>
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </FooterTransition>
      </div>
    )
  }
}

const daysPast = Math.round(Math.abs(new Date() - new Date("2016-10-24")) / 8.64e7);
const contentPast = Math.round(Math.abs(new Date() - new Date("2016-11-17")) / 8.64e7);
const styles = {
  buttons:{
    margin:0,
    float:"right"
  },
  edit: {
    backgroundColor: "transparent",
    color:"orange",
    border:"none",
    textAlign: 'right',
    right:"1rem",
    top:"1rem",
    width:"auto",
    maxWidth:"inherit"
  }
}

const skillWithApollo = graphql(getSkill, {
  options: ({params, userId}) => {
    let opts = {ssr: true};
    if(!params)
      return opts;

    return {
      ...opts, variables: { to: skurl(params.skill) },
      pollInterval: 6e4
    }
  }
})(abstractSkill);

const Skill = createContainer(() => {
  return {
    userId: Meteor.userId()
  };
}, skillWithApollo);

export default Skill;
