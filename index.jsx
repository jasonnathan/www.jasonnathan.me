/*globals ga*/
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactRouterSSR} from 'meteor/reactrouter:react-router-ssr';
import ReactHelmet from 'react-helmet';
import {AppRoutes, preRender, client} from '/imports/routes.jsx';

const dehydrateHook = () => client.store ? client.store.getState() : null;


const htmlHook = html => {
  const head = ReactHelmet.rewind();
  return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
}

const props = {onUpdate: () => Meteor.isClient && ga('send', 'pageview')}

const clientOptions = {props};
const serverOptions = {htmlHook, preRender, dehydrateHook};

ReactRouterSSR.Run(AppRoutes, clientOptions, serverOptions);
