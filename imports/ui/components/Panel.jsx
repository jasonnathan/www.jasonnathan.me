/**
 * @function Panel
 * @description A Panel Component used in About
 */
import React, {PropTypes} from 'react';

const panelStyles = {
  padding:'.5rem',
  marginRight:'1px',
  boxSizing:"border-box",
  textShadow:"-1px -1px 0 rgba(0,0,0,.5)",
  backgroundImage:"url(/skill-bg.svg)",
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
