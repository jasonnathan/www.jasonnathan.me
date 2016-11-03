import React from 'react';
import {Link} from 'react-router';
import {Flex,Item} from 'react-flex';

const MainMenu = ({activePath}) => {

  let links = [
    {label: "Home", path: '', active: false, icon: '/Home.svg'},
    {label: "About", path: 'about', active: false, icon:null},
    {label: "Work", path: 'work', active: false, icon:null},
    {label: "Contact", path: 'contact', active: false, icon: null},
    // {label: "Blog", path: 'articles', active: false, icon: null},
  ].map(link => {
    if(link.label === activePath){
      link.active = true;
    }
    return link;
  });

  const linkByCondition = (link) => {
    if (link.active)
      return (
        <Item key={link.label}><span className="active">{link.label}</span></Item>
      );
    if (link.icon)
      return (
        <Item  key={link.label}>
          <Link to={`/${link.path}`}><img src={link.icon} role="presentation" /></Link>
        </Item>
      )
    if (!link.icon)
      return (
        <Item key={link.label}><Link to={`/${link.path}`}>{link.label}</Link></Item>
      )
  }

  return (
    <div className="fixed-menu">
      <nav role="navigation" className="mainNav">
        <Flex>{links.map(link => linkByCondition(link))}</Flex>
      </nav>
    </div>
  );
}
export default MainMenu;
