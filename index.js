import { Meteor } from 'meteor/meteor';
import React from 'react';
import App from '/imports/ui/App.jsx';
import Home from '/imports/ui/Home.jsx';
import About from '/imports/ui/About.jsx';
import { Route, IndexRoute } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import ReactHelmet from 'react-helmet';

const AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="*" component={App} />
    {/* ... */}
  </Route>
);

Meteor.startup(() => ReactRouterSSR.Run(AppRoutes, {
  props: {
    onUpdate() {
      // Notify the page has been changed to Google Analytics
      Meteor.isClient && ga('send', 'pageview');
    },
  }
}, {
  htmlHook(html) {
    const head = ReactHelmet.rewind();
    return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
  },
  preRender: () => {}
}));

if(Meteor.isClient){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXXX-X', 'auto');
}
