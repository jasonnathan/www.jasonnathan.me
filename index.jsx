/*globals ga, document*/
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactRouterSSR} from 'meteor/jasonnathan:react-router-ssr';
import ReactHelmet from 'react-helmet';
import AppRoutes from '/imports/routes.jsx';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import {ApolloProvider} from 'react-apollo';
import {getDataFromTree} from "react-apollo/server";

// let url = "http://localhost:3000";
// if(Meteor.isClient && process.env.NODE_ENV === 'production'){
//   url = "https://dev.jasonnathan.com";
// }

let opts = {
  ssrMode: Meteor.isServer,
  networkInterface: createNetworkInterface({
    credentials: 'same-origin', uri: `/graphql`
  })
},
client, initialState, history;


Meteor.startup(() => {
  const rehydrateHook = state => initialState = state;
  const historyHook = newHistory => history = newHistory;
  // the dumbest thing, to put wrapperHook in clientOptions, inferring it only
  // runs on the client
  const wrapperHook = app => {
    opts.initialState = initialState;
    if(Meteor.isClient){
      client = new ApolloClient(meteorClientConfig());
    } else {
      client = new ApolloClient(opts);
    }
    return <ApolloProvider client={client}>{app}</ApolloProvider>
  };
  const preRender = (req, res, app) => Promise.await(getDataFromTree(app));
  const dehydrateHook = () => ({apollo:{data:client.store.getState().apollo.data}})
  const htmlHook = html => {
    const h = ReactHelmet.rewind();
    return html
      .replace('<head>', '<head>' + h.title + h.base + h.meta + h.link + h.script);
  }

  // const props = {onUpdate: () => Meteor.isClient && ga('send', 'pageview')}

  const clientOptions = {historyHook, wrapperHook, rehydrateHook};
  const serverOptions = {historyHook, htmlHook, preRender, dehydrateHook};

  ReactRouterSSR.Run(AppRoutes(), clientOptions, serverOptions);
});

export default client;
