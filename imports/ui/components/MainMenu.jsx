/**
 * @function MainMenu
 * @description Main site Navigation
 */
import React from 'react';
import {Link, IndexLink} from 'react-router';

const MainMenu = () => {

  let links = [
    {
      label: "Home",
      path: '',
      img: true
    }, {
      label: "About",
      path: 'about'
    }, {
      label: "Work",
      path: 'work'
    }, {
      label: "Contact",
      path: 'contact'
    },
    {label: "Blog", path: 'articles'},
  ];

  function HomeIcon(){
    return (
      <svg width="100%" height="100%">
        <title>Home</title>
        <desc>Back to JasonNathan.com&apos;s home page</desc>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path d="M12.1263525,1.27025677 L0.28125,14.0623847 L1.59104499,15.4768988 L2.75847096,14.2161362 L2.75847096,24.6097402 L2.75847096,25.59375 L3.66963269,25.59375 L10.0477648,25.59375 L10.9589265,25.59375 L10.9589265,24.6097402 L10.9589265,15.7536516 L14.6035735,15.7536516 L14.6035735,24.6097402 L14.6035735,25.59375 L15.5147352,25.59375 L21.8928673,25.59375 L22.804029,25.59375 L22.804029,24.6097402 L22.804029,14.2161362 L23.971455,15.4768988 L25.28125,14.0623847 L13.4361475,1.27025677 L12.78125,0.59375 L12.1263525,1.27025677 Z M20.9817056,12.2481165 L20.9817056,23.6257303 L16.4258969,23.6257303 L16.4258969,14.7696418 L16.4258969,13.7856319 L15.5147352,13.7856319 L10.0477648,13.7856319 L9.13660308,13.7856319 L9.13660308,14.7696418 L9.13660308,23.6257303 L4.58079442,23.6257303 L4.58079442,12.2481165 L12.78125,3.39202798 L20.9817056,12.2481165 Z" />
        </g>
      </svg>
    )
  }

  const labelOrImg = (link, i) => {
    const {img=false, label, path} = link;
    return img ? (
      <IndexLink key={i} activeClassName="active" to={`/${path}`}><HomeIcon /></IndexLink>
    ) : (
      <Link key={i} activeClassName="active" to={`/${path}`}>{label}</Link>
    )
  }

  return (
    <nav role="navigation" className="mainNav">
        {links.map((link, i) => labelOrImg(link, i))}
    </nav>
  );
}
export default MainMenu;
