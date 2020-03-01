import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './components/MainMenu.jsx';

export default function App({children}){
  return (
    <section className="page">
      <header className="fixed header"><MainMenu /></header>
      <section className="fixed content with-header">{children}</section>
    </section>
  )
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
