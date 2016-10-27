/* global document*/
import React from 'react';
import { RouteTransition } from 'react-router-transitioner';

const App = ({children}) => {
  return <RouteTransition style={{height:'100%'}}>{children}</RouteTransition>
}
export default App;
