import React, {PureComponent, PropTypes} from 'react';
import {Flex, Item} from 'react-flex';
import {Link} from 'react-router';
import {spring, presets, StaggeredMotion, Motion} from 'react-motion';
import GlowingLine from './GlowingLine.jsx';

class TransitionedButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      isClicked: false
    }
  }

  getColor(v){
    return v === .4 ? 'rgb(0,200,200)' : `rgba(151, 218, 255, ${v})`;
  }

  getScale(v){
    return `scale3d(${v},${v},1)`;
  }

  getTranslateAndWidth(isTop, scale){
    const m = isTop ? '5%' : '-5%'
    return {
      width: this.isHover ? '90%' : '100%',
      transform: `translateX(${this.isHover ? m : 0}) ` + scale
    }
  }

  getHRStyle(v, isTop){
    let s = this.getTranslateAndWidth(isTop, this.getScale(v));
    s[isTop ? "top" : "bottom"] = '-1px';
    return s;
  }

  getHRClassName(){
    return this.state.isHover ? "hovering" : "";
  }

  handleHover(active){
    this.setState({isHover: active})
  }

  get springProps() {
    const {wobbly} = presets;
    return {
      defaultStyle: { percent: 1 },
      style:{ percent: spring(this.state.isHover ? 1 : 0.4, {...wobbly, precision:.1}).val},
    };
  }

  render(){
    return(
      <Motion {... this.springProps}>
        {({percent}) => {
          return(
            <div
              onMouseOver={() => this.handleHover(true)}
              onMouseLeave={() => this.handleHover(false)}
            >
              <GlowingLine className={this.getHRClassName()} style={{top:'1px'}} />
              <span
                itemProp="name"
                style={{
                  color: this.getColor(percent),
                  textShadow: '-1px -1px 3px rgba(0,0,0,.5)'
                }}
              >
                {this.props.label}
              </span>
              <GlowingLine className={this.getHRClassName()} style={{bottom:'1px'}} />
            </div>
          )
        }}
      </Motion>
    )
  }
}

TransitionedButton.propTypes = {
  label: PropTypes.string
}

export default function StaggeredMenu({items}) {
  const defaultStyles = [...items].map( () => ({s: .9, o:0.1}));
  const style = prevStyles => prevStyles.map((_, i) => ({
    s: spring(i === 0 ? 1 : prevStyles[i - 1].s, {precision:.1}),
    o: spring(i === 0 ? 1 : prevStyles[i - 1].o, { precision:.01 })
  }));
  const menuItem = ({s,o}, i) => (
    <Item wrap role="menuitem" key={`${i}Button`} itemProp="url">
      <Link
        role="menuitem"
        to={items[i].route}
        style={{ transform: `scale3d(${s}, ${s}, 1)`, opacity: o}}
      >
        <TransitionedButton label={items[i].label} title={items[i].title} />
      </Link>
    </Item>
  )
  return (
    <StaggeredMotion defaultStyles={defaultStyles} styles={style}>
      {interpolatingStyles => <Flex>{interpolatingStyles.map(menuItem)}</Flex>}
    </StaggeredMotion>
  );
}

StaggeredMenu.defaultProps = {
  items: [
    {
      label: "About",
      route:'/about',
      title: "Find out more about what kind of work I do"
    }, {
      label: "Work",
      route:'/work',
      title: "A few examples of my past work"
    }, {
      label: "Contact",
      route:'/contact',
      title: "Get in Touch!"
    },
    {
      label: "Blog",
      route:'/articles',
      title: "Articles, Articles, Articles!"
    }
  ]
}

StaggeredMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    title: PropTypes.string
  }))
}
