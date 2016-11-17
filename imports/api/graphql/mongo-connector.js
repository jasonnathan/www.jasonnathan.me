import {Mongo} from 'meteor/mongo';
import projectData from '../data/projects-data';
import skillsData from '../data/skills-data';

const Skills = new Mongo.Collection("skills");
const Projects = new Mongo.Collection("projects");

export function getSkills(){
  let c = Skills.find();
  if(!c.count()){
    skillsData.forEach(s => {
      s._id = s.slug;
      delete s.slug;
      Skills.insert(s);
      return s;
    });
  }
  return c.fetch();
}

export function getProjects(){
  let c = Projects.find();
  if(!c.count()){
    projectData.forEach(p => Skills.insert(p));
  }
  return Projects.find().fetch();
}
