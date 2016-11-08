import React, {PropTypes} from 'react';
import {lightestBlue, lightestCyan} from '/imports/api/colors'
import tinycolor from 'tinycolor2'

const panelStyles = {
  padding:'.5rem',
  boxSizing:"border-box",
  backgroundColor: 'rgba(100,100,100,.5)',
  border: '2px solid rgba(0,0,0,.5)',
  boxShadow: `0 0 1px 0 ${tinycolor(lightestBlue).setAlpha(.8).toRgbString()}, 0 0 1px ${tinycolor(lightestCyan).setAlpha(.8).toRgbString()}`
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
