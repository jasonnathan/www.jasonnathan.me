import { Meteor } from 'meteor/meteor';
import React from 'react';
import App from '/imports/ui/App.jsx';
import Home from '/imports/ui/Home.jsx';
import About from '/imports/ui/About.jsx';
import Work from '/imports/ui/Work.jsx';
import Contact from '/imports/ui/Contact.jsx';
import Blog from '/imports/ui/Blog.jsx';
import { Route, IndexRoute } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import ReactHelmet from 'react-helmet';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

let client = new ApolloClient();

// Create the client as outlined above
const AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="work" component={Work} />
    <Route path="contact" component={Contact} />
    <Route path="articles" component={Blog} />
    <Route path="*" component={App} />
    {/* ... */}
  </Route>
);

const wrapperHook = app => <ApolloProvider client={client}>{app}</ApolloProvider>

const htmlHook = html => {
  const head = ReactHelmet.rewind();
  return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
}

const props = {onUpdate: () => Meteor.isClient && ga('send', 'pageview')}

const clientOptions = { props, wrapperHook };
const serverOptions = { htmlHook };

Meteor.startup( () => ReactRouterSSR.Run(AppRoutes, clientOptions, serverOptions))

if(Meteor.isClient){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXXX-X', 'auto');
}
