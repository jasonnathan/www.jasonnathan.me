/*globals ga, document*/
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactRouterSSR} from 'meteor/jasonnathan:react-router-ssr';
import ReactHelmet from 'react-helmet';
import AppRoutes from '/imports/routes.jsx';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {getDataFromTree} from "react-apollo/server";
import accountMiddleware from '/imports/apolloAccountMiddleWare';

let url = "http://localhost:3000";
if(Meteor.isClient && process.env.NODE_ENV === 'production'){
  url = "https://www.jasonnathan.com";
}

let opts = {
    ssrMode: Meteor.isServer,
    networkInterface: createNetworkInterface({credentials: 'same-origin', uri: `${url}/graphql`}),
    dataIdFromObject: (result) => {
      const tn = result.__typename;
      if(tn){
        // first find _id for mongodb, slug for most else and id as last resort
        const id = result._id || result.slug || result.id;
        if(id){
          return result.__typename + id
        }
      }
      return null;
    }
  },
  client,
  initialState,
  history;

const rehydrateHook = state => initialState = state;
const historyHook = newHistory => history = newHistory;

// the dumbest thing, to put wrapperHook in clientOptions, inferring it only
// runs on the client
const wrapperHook = app => {
  opts.initialState = initialState;
  if(Meteor.isClient){
    opts.networkInterface = accountMiddleware(opts.networkInterface);
  }
  client = new ApolloClient(opts);
  return <ApolloProvider client={client}>{app}</ApolloProvider>
};
const preRender = (req, res, app) => {
  try{
    Promise.await(getDataFromTree(app));
  } catch(e){
    console.error(e)
  }
};
const dehydrateHook = () => ({
  apollo: {
    data: client.store.getState().apollo.data
  }
})
const htmlHook = html => {
  const h = ReactHelmet.rewind();
  return html.replace('<head>', '<head>' + h.title + h.base + h.meta + h.link + h.script);
}

const props = {onUpdate: () => ga('send', 'pageview')}

const clientOptions = {
  props,
  historyHook,
  wrapperHook,
  rehydrateHook
};
const serverOptions = {
  historyHook,
  htmlHook,
  preRender,
  dehydrateHook
};

ReactRouterSSR.Run(AppRoutes(), clientOptions, serverOptions);

export default client;
