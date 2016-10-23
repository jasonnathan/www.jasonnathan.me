/* global document*/
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import App from '/imports/ui/App.jsx';
import 'react-flex/index.css';


Meteor.startup(() => {
  render(<App />, document.getElementById('app'))}
);
