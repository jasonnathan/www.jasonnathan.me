const skurl = (path) => `/work/skills/${path}`;
const skimg = (path) => `/brands/${path}`;

const SkillsData = [
  {to: skurl('reactjs'), src: skimg('reactjs.svg'), title: "ReactJS", count:1, category:"UI Frameworks" },
  {to: skurl('d3'), src: skimg('d3.svg'), title: "D3", count:6, category: "UI Frameworks" },
  {to: skurl('knockout'), src: skimg('knockout.svg'), title: "Knockout Projects", count:6, category: "UI Frameworks" },
  // {to: skurl('handlebars'), src: skimg('handlebars.svg'), title: "Handlebars Projects", count:6, category: "UI Frameworks" },
  // {to: skurl('jquery'), src: skimg('jquery.svg'), title: "jQuery Projects", count:6, category: "UI Frameworks" },
  {to: skurl('less'), src: skimg('less.svg'), title: "LESS", count:6, category: "UI Frameworks" },
  {to: skurl('javascript'), src: skimg('JS.svg'), title: "JavaScript Projects", count:3, category:"Languages" },
  {to: skurl('php'), src: skimg('php.svg'), title: "PHP Projects", count:3, category:"Languages" },
  // {to: skurl('perl'), src: skimg('perl-logo.svg'), title: "Perl Projects", count:3, category:"Languages" },
  {to: skurl('nodejs'), src: skimg('nodejs-light.svg'), title: "NodeJS", count:6, category: "Server Frameworks" },
  {to: skurl('codeigniter'), src: skimg('codeigniter.svg'), title: "Codeigniter PHP", count:6, category: "Server Frameworks" },
  {to: skurl('kohana'), src: skimg('kohana.svg'), title: "Kohana PHP", count:6, category: "Server Frameworks" },
  // {to: skurl('xampp'), src: skimg('xampp.svg'), title: "XAMPP Projects", count:5, category: "Server Frameworks" },
  {to: skurl('meteor'), src: skimg('meteor-light.svg'), title: "Meteor Projects", count:5, category: "FullStack Frameworks" },
  {to: skurl('sailsjs'), src: skimg('sailsjs-light.svg'), title: "SailsJS Projects", count:5, category: "FullStack Frameworks" },
  {to: skurl('cordova'), src: skimg('cordova.svg'), title: "Cordova Projects", count:5, category: "FullStack Frameworks" },
  {to: skurl('aws'), src: skimg('aws.svg'), title: "AWS", count:1, category: "IAAS" },
  {to: skurl('digitalocean'), src: skimg('digitalocean.svg'), title: "Digital Ocean", count:1, category: "IAAS" },
  // {to: skurl('eslint'), src: skimg('eslint.svg'), title: "ESlint Projects", count:6, category: "ToolKits" },
  // {to: skurl('react-router'), src: skimg('react-router-light.svg'), title: " React Router Projects", count:6, category: "ToolKits" },
  {to: skurl('graphql'), src: skimg('graphql.svg'), title: "GraphQL", count:6, category: "Data Frameworks" },
  {to: skurl('socketio'), src: skimg('socketio.svg'), title: "Socket IO", count:6, category: "Data Frameworks" },
  {to: skurl('apollostack'), src: skimg('apollo-word.svg'), title: "Apollo Projects", count:6, category: "Data Frameworks" },
  {to: skurl('redux'), src: skimg('redux-light.svg'), title: "Redux Projects", count:1, category: "Data Frameworks" },
  {to: skurl('mocha'), src: skimg('mocha.svg'), title: "Mocha Testing", count:6, category: "Testing & Integration" },
  // {to: skurl('jasmine'), src: skimg('jasmine.svg'), title: "Jasmine Projects", count:6, category: "Testing & Integration" },
  {to: skurl('jenkins'), src: skimg('jenkins.svg'), title: "Jenkins CI", count:6, category: "Testing & Integration" },
  {to: skurl('strider'), src: skimg('strider-cd.svg'), title: "Strider CD Projects", count:6, category: "Testing & Integration" },
  {to: skurl('git'), src: skimg('git.svg'), title: "GIT", count:6, category: "Version Control" },
  {to: skurl('mercurial'), src: skimg('mercurial.svg'), title: "Mercurial", count:6, category: "Version Control" },
  {to: skurl('mongodb'), src: skimg('mongodb.svg'), title: "MongoDB", count:6, category: "Databases" },
  {to: skurl('mysql'), src: skimg('mysql-word.svg'), title: "MySQL", count:6, category: "Databases" },
  {to: skurl('neo4j'), src: skimg('neo4j-word.svg'), title: "Neo4j", count:6, category: "Databases" },
];


export {skurl, SkillsData}
