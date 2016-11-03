import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
  App, Home, About, Work, Contact, Blog,
  Article, PostsByCategory, PostWithComments
} from '/imports/ui/index.jsx';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {getDataFromTree} from "react-apollo/server";
import {InjectData} from 'meteor/meteorhacks:inject-data';
import {Promise} from 'meteor/promise';

let opts = { ssrMode: Meteor.isServer}, client;

if (Meteor.isServer) {
  opts.networkInterface = createNetworkInterface('http://localhost:3000/graphql', {credentials: 'same-origin'});
  client = new ApolloClient(opts);
} else {

  InjectData.getData("dehydrated-initial-data", (state) => {
      client = new ApolloClient({...opts, initialState: JSON.parse(state)});
  });
}


const BlogWithApollo = () => ( <ApolloProvider client={client}><Blog /></ApolloProvider>);
const ArticleWithApollo = (p) => (<ApolloProvider client={client}><Article {...p} /></ApolloProvider>);

const preRender = (req) => {
    const segments = req.originalUrl.split('/').filter(p => p),
          controller = segments[0],
          category = segments[1],
          slug = segments[2],
          props = {
            routeParams: {category, slug}
          };

    switch(controller){
      case 'articles': return Promise.await(getDataFromTree(<BlogWithApollo />));
      case 'article': return Promise.await(getDataFromTree(<ArticleWithApollo {...props} />));
    }
}

const AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="work" component={Work} />
    <Route path="contact" component={Contact} />
    <Route path="articles">
      <IndexRoute component={BlogWithApollo} />
      <Route path=":category" component={PostsByCategory} />
    </Route>
    <Route path="article">
      <Route path=":category/:slug" component={ArticleWithApollo} />
    </Route>
  </Route>
);


export  {AppRoutes, preRender, client};
