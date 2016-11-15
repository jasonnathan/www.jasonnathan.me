import React, {PropTypes} from 'react';
import {lightestBlue, lightestCyan} from '/imports/api/colors'
import tinycolor from 'tinycolor2'

const panelStyles = {
  padding:'.5rem',
  boxSizing:"border-box",
  backgroundImage:"url(/brands/skill-bg.svg)",
}

const panelHeaderStyles = {
  textAlign:'center'
}

export default function Panel({header, children}){
  return (
    <section className="panel item" style={panelStyles}>
      {(header) && <header className="panel-header" style={panelHeaderStyles}><h4>{header}</h4></header>}
      {children}
    </section>
  )
}

Panel.propTypes = {
  header: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
