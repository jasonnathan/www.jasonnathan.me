import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {App, Home, About, Work, Contact, Blog} from '/imports/ui/index.jsx';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {getDataFromTree} from "react-apollo/server";
import {InjectData} from 'meteor/meteorhacks:inject-data';

let opts = { ssrMode: Meteor.isServer}, client

if (Meteor.isServer) {
  opts.networkInterface = createNetworkInterface('http://localhost:3000/graphql', {credentials: 'same-origin'});
  client = new ApolloClient(opts);
} else {

  InjectData.getData("dehydrated-initial-data", (state) => {
    client = new ApolloClient({...opts, initialState: JSON.parse(state)});
  });
}


const BlogWithApollo = () => ( <ApolloProvider client={client}><Blog /></ApolloProvider>);

const preRender = (req) => {
  if (req.originalUrl === '/articles')
    return Promise.await(getDataFromTree(<BlogWithApollo />));
}

const AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="work" component={Work} />
    <Route path="contact" component={Contact} />
    <Route path="articles" component={BlogWithApollo} />
    {/* ... */}
  </Route>
);


export  {AppRoutes, preRender, client};
