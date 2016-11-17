/*globals ga, document*/
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactRouterSSR} from 'meteor/jasonnathan:react-router-ssr';
import ReactHelmet from 'react-helmet';
import AppRoutes from '/imports/routes.jsx';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {getDataFromTree} from "react-apollo/server";

// const url = process.env.NODE_ENV === 'production' ? "dev.jasonnathan.com" : "localhost"
let url = "localhost";
if(Meteor.isClient && process.env.NODE_ENV === 'production'){
  url = "dev.jasonnathan.com";
}

let opts = {
  ssrMode: Meteor.isServer,
  networkInterface: createNetworkInterface({credentials: 'same-origin', uri: `http://${url}:3000/graphql`})
}, client, initialState, history;


const rehydrateHook = state => initialState = state;
const historyHook = newHistory => history = newHistory;
// the dumbest thing, to put wrapperHook in clientOptions, infering it only runs on the client
const wrapperHook = app => {
  opts.initialState = initialState;
  client = new ApolloClient(opts);
  return <ApolloProvider client={client}>{app}</ApolloProvider>
};
const preRender = (req, res, app) => Promise.await(getDataFromTree(app));
const dehydrateHook = () => ({apollo:{data:client.store.getState().apollo.data}})
const htmlHook = html => {
  const head = ReactHelmet.rewind();
  return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
}

// const props = {onUpdate: () => Meteor.isClient && ga('send', 'pageview')}

const clientOptions = {historyHook, wrapperHook, rehydrateHook};
const serverOptions = {historyHook, htmlHook, preRender, dehydrateHook};

ReactRouterSSR.Run(AppRoutes(), clientOptions, serverOptions);
