import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  Home,
  About,
  Work,
  Skill,
  Contact,
  Blog,
  Article,
  PostsByCategory
} from '/imports/ui/index.jsx';


const AppRoutes = () => (
  <Route name="App" path="/" component={App} breadcrumbIgnore>
    <IndexRoute name="Home" component={Home} />
    <Route name="About" path="about" component={About} />
    <Route name="Work" path="work" breadcrumbIgnore>
      <IndexRoute name="Skills" component={Work} />
      <Route name="skill" path=":skill" component={Skill} breadcrumbName=":skill">
        <Route name="project" path=":project" component={Skill} breadcrumbName=":project" />
      </Route>
    </Route>
    <Route name="Contact" path="contact" component={Contact} />
    <Route name="Articles" path="articles" breadcrumbIgnore>
      <IndexRoute name="Articles" component={Blog} />
      <Route name="Posts By Category" path=":category" component={PostsByCategory} breadcrumbName=":category" />
    </Route>
    <Route name="Article" path="article" breadcrumbName="Articles" breadCrumbLink="/articles" breadcrumbIgnore>
      <Route name="Posts By Category" path=":category" component={Article} breadcrumbName=":category">
        <Route path=":slug" component={Article} breadcrumbName=":slug" />
      </Route>
    </Route>
  </Route>
);

export default AppRoutes;
