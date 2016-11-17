const skurl = (path) => `/work/skills/${path}`;
const skimg = (path) => `/brands/${path}`;

const SkillsData = [
  {to: skurl('reactjs'), src: skimg('reactjs.svg'), title: "ReactJS", count:1, category:"UI Frameworks", overview:`
    I have only recently started to work with ReactJS and have come to really enjoy it. ES6 & JSX are wonderful to write in
    and React's Component level abstraction is refreshing. <br />
    More than that, server generated markup with all content preloaded is very hard to resist.
    You still get all the CSS/JS animations baked in on the client and your markup is not littered with bizzare attributes.
    This site is written with React and serves as an example: <br />
    If you cURLed this URL, you'd see the generated markup does not differ from what is in the browser. <br />
    Add a little data with <a href="/work/skills/graphql">GraphQL</a>,
    a central state management tool like <a href="/work/skills/redux">Redux</a>
    and you have all you need to build complex data-driven user experiences that is driven by any back-end you prefer.
  `, projects:[{name: 'DocViser', path:skurl('reactjs/docviser')}, {name:'Bella Feed Timer', path: skurl('reactjs/bella-feed-timer')}] },
  {to: skurl('d3'), src: skimg('d3.svg'), title: "D3", count:6, category: "UI Frameworks", overview:"" },
  {to: skurl('knockout'), src: skimg('knockout.svg'), title: "Knockout Projects", count:6, category: "UI Frameworks", overview:"" },
  // {to: skurl('handlebars'), src: skimg('handlebars.svg'), title: "Handlebars Projects", count:6, category: "UI Frameworks" },
  // {to: skurl('jquery'), src: skimg('jquery.svg'), title: "jQuery Projects", count:6, category: "UI Frameworks" },
  {to: skurl('less'), src: skimg('less.svg'), title: "LESS", count:6, category: "UI Frameworks", overview:"" },
  {to: skurl('javascript'), src: skimg('JS.svg'), title: "JavaScript Projects", count:3, category:"Languages", overview:"" },
  {to: skurl('php'), src: skimg('php.svg'), title: "PHP Projects", count:3, category:"Languages", overview:"" },
  // {to: skurl('perl'), src: skimg('perl-logo.svg'), title: "Perl Projects", count:3, category:"Languages" },
  {to: skurl('nodejs'), src: skimg('nodejs-light.svg'), title: "NodeJS", count:6, category: "Server Frameworks", overview:"" },
  {to: skurl('codeigniter'), src: skimg('codeigniter.svg'), title: "Codeigniter PHP", count:6, category: "Server Frameworks", overview:"" },
  {to: skurl('kohana'), src: skimg('kohana.svg'), title: "Kohana PHP", count:6, category: "Server Frameworks", overview:"" },
  // {to: skurl('xampp'), src: skimg('xampp.svg'), title: "XAMPP Projects", count:5, category: "Server Frameworks" },
  {to: skurl('meteor'), src: skimg('meteor-light.svg'), title: "Meteor Projects", count:5, category: "FullStack Frameworks", overview:"" },
  {to: skurl('sailsjs'), src: skimg('sailsjs-light.svg'), title: "SailsJS Projects", count:5, category: "FullStack Frameworks", overview:"" },
  {to: skurl('cordova'), src: skimg('cordova.svg'), title: "Cordova Projects", count:5, category: "FullStack Frameworks", overview:"" },
  {to: skurl('aws'), src: skimg('aws.svg'), title: "AWS", count:1, category: "IAAS", overview:"" },
  {to: skurl('digitalocean'), src: skimg('digitalocean.svg'), title: "Digital Ocean", count:1, category: "IAAS", overview:"" },
  // {to: skurl('eslint'), src: skimg('eslint.svg'), title: "ESlint Projects", count:6, category: "ToolKits" },
  // {to: skurl('react-router'), src: skimg('react-router-light.svg'), title: " React Router Projects", count:6, category: "ToolKits" },
  {to: skurl('graphql'), src: skimg('graphql.svg'), title: "GraphQL", count:6, category: "Data Frameworks", overview:"" },
  {to: skurl('socketio'), src: skimg('socketio.svg'), title: "Socket IO", count:6, category: "Data Frameworks", overview:"" },
  {to: skurl('apollostack'), src: skimg('apollo-word.svg'), title: "Apollo Projects", count:6, category: "Data Frameworks", overview:"" },
  {to: skurl('redux'), src: skimg('redux-light.svg'), title: "Redux Projects", count:1, category: "Data Frameworks", overview:"" },
  {to: skurl('mocha'), src: skimg('mocha.svg'), title: "Mocha Testing", count:6, category: "Testing & Integration", overview:"" },
  // {to: skurl('jasmine'), src: skimg('jasmine.svg'), title: "Jasmine Projects", count:6, category: "Testing & Integration" },
  {to: skurl('jenkins'), src: skimg('jenkins.svg'), title: "Jenkins CI", count:6, category: "Testing & Integration", overview:"" },
  {to: skurl('strider'), src: skimg('strider-cd.svg'), title: "Strider CD Projects", count:6, category: "Testing & Integration", overview:"" },
  {to: skurl('git'), src: skimg('git.svg'), title: "GIT", count:6, category: "Version Control", overview:"" },
  {to: skurl('mercurial'), src: skimg('mercurial.svg'), title: "Mercurial", count:6, category: "Version Control", overview:"" },
  {to: skurl('mongodb'), src: skimg('mongodb.svg'), title: "MongoDB", count:6, category: "Databases", overview:"" },
  {to: skurl('mysql'), src: skimg('mysql-word.svg'), title: "MySQL", count:6, category: "Databases", overview:"" },
  {to: skurl('neo4j'), src: skimg('neo4j-word.svg'), title: "Neo4j", count:6, category: "Databases", overview:"" },
];


export {skurl, SkillsData}
