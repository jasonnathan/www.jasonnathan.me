import React, { PureComponent, PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import {Loader} from 'react-loaders';
import Helmet from 'react-helmet';
import { createContainer } from 'meteor/react-meteor-data';
import {skurl} from '/imports/api/data/skills-data';
import getSkill from '/imports/api/graphql/queries/Skill';
import EditIcon from 'react-icons/lib/md/create';
import AddIcon from 'react-icons/lib/go/plus';
import BreadCrumbsHeader from '../components/BreadCrumbsHeader.jsx';
import FooterTransition from '../components/FooterTransition.jsx';
import StaggeredParagraphs from '../components/StaggeredParagraphs.jsx';
import StaggeredName from '../components/StaggeredName.jsx';
import SkillEditor from '../components/SkillEditor.jsx';

import { getCurrentIndex, getdefaultDescription } from '../../utils';

const skillResolver = (key, text) => skill => key === ':skill' ? skill : text;

const lastCrumbIsString = (link, key, text, index, routes) => {
  if (index === routes.length -1) {
    return <StaggeredName letters={text} key={key} />;
  }
  return <Link to={link} key={key}>{text}</Link>;
}

class Skill extends PureComponent{
  constructor(props){
    super(props);
    const { skill={ title:"", description:"", projects:[] } } = props.data
    const {location} = props;

    this.state = {
      currentIndex: getCurrentIndex(skill, location), editing: false, skill
    }
  }

  componentWillReceiveProps({data: {skill}, location}){
    if(skill){
      this.setState({skill, currentIndex: getCurrentIndex(skill, location)});
    }
  }

  getContainerStyles(skill){
    const { projects } = skill;
    const { currentIndex } = this.state;
    const ci = currentIndex > projects.length ? 0 : currentIndex;
    let img = ci === 0 ? skill.featuredImage : projects[ci-1].featuredImage;
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

  getProjectDefaults(p = {}){
    const { description = getdefaultDescription() } = p;
    return { ...p, description };
  }

  navigateToProj(e, idx){
    e && e.preventDefault();
    this.setState({editing:false, currentIndex: idx});
  }

  computePositionStyles(idx){
    const ci = this.state.currentIndex, base = 100, opacity = ci === idx ? 1 : .1;
    let pos, ret;

    pos = (-base * (ci-idx)) -50;
    ret = {
      transform: `translate3d(${pos}%,0,0)`,
      opacity
    }
    return ret;
  }

  showAdminButtons(){
    const { userId } =  this.props;
    const { editing } = this.state;
    if(!userId || editing)
      return null;

    return (
      <div className="buttons" style={styles.buttons}>
        <button onClick={() => this.setState({editing: !editing})} style={styles.edit}>
          <EditIcon />
        </button>
        <button onClick={() => this.addProject()} style={styles.edit}>
          <AddIcon />
        </button>
      </div>
    )
  }

  isSelected(idx){
    return this.state.currentIndex === idx ? "selected" : "";
  }

  addProject(){
    const {skill} = this.state;
    const {to, title} = skill;
    const index = skill.projects.length + 1;
    const project = {
      title: `New ${title} Project ${index}`,
      featuredImage: '/screenshots/work-in-progress.jpg',
      to:`${to}/new-project-${index}`,
      description: getdefaultDescription()
    }
    skill.projects.push(project);
    this.setState({skill, currentIndex:index});
  }

  render(){
    const {data: {loading, refetch}, routes, params} = this.props;
    if(loading)
      return (<div className="centered-loader" style={{paddingTop:'25vh'}}>
        <Loader type="ball-triangle-path" />
      </div>);

    const { skill } = this.state;
    const description = skill.description || getdefaultDescription();

    const projs = skill.projects;

    return (
      <div role="main" style={this.getContainerStyles(skill)} itemScope itemType="http://schema.org/WebPage">
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
              {this.showAdminButtons()}
              {this.props.userId && this.state.editing ? (
                <SkillEditor
                  {...skill}
                  description={description}
                  cancelEdit={() => this.setState({editing:false})}
                  refreshSkill={() => refetch()}
                />
              ) : <StaggeredParagraphs description={description} />}
            </div>
          )}
        </div>
        {projs.length && projs.map((p, i) => {
          p = this.getProjectDefaults(p);
          if(!p) return null;
          return (
            <div key={p.to} style={this.computePositionStyles(i+1)} className="content with-breadcrumbs with-footer">
              {this.state.currentIndex === i+1 && (
                <div className="scroll-y">
                  {this.showAdminButtons()}
                  {this.props.userId && this.state.editing ? (
                    <SkillEditor
                      {...p}
                      _id={skill._id  +"_" + i}
                      cancelEdit={() => this.setState({editing:false})}
                      refreshSkill={() => refetch()}
                    />
                  ) : (
                    <StaggeredParagraphs description={p.description} />
                  )}
                </div>
              )}
            </div>
          )
        })}
        <FooterTransition>
          <ul className="bottom-tabs" style={{maxWidth:`${(projs.length + 1) * 170}px`}}>
            <li>
              <a href={skill.to} className={this.isSelected(0)} onClick={(e) => this.navigateToProj(e, 0)}>
                Overview
              </a>
            </li>
            {projs.map((p, i) => (
              <li key={p.to}>
                <a className={this.isSelected(i+1)} onClick={(e) => this.navigateToProj(e, i+1)} href={p.to}>
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

const { shape, string, array, func, bool, object } = PropTypes;

Skill.propTypes = {
  data: shape({ loading: bool, refetch: func, skill: object }),
  params: shape({ skill: string }),
  userId: string,
  location: shape({pathname: string}),
  routes: array,
  router: shape({ goBack: func })
}

const styles = {
  buttons:{
    margin:"1px auto auto",
    textAlign:"center"
    // float:"right"
  },
  edit: {
    backgroundColor: "rgba(0,0,0,.25)",
    color:"orange",
    textAlign: 'right',
    right:"1rem",
    top:"1rem",
    width:"auto",
    maxWidth:"inherit",
    cursor:"pointer",
    padding:".5rem",
    border:"1px solid rgba(255,255,255,.2)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem"
  }
}

export default graphql(getSkill, {
  options: ({ params: { skill } }) => skill
    ? { ssr: true, variables: { to: skurl(skill) } }
    : { ssr: true }
})(createContainer(() => ({ userId: Meteor.userId() }), Skill));
