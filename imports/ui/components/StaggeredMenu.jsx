import React, {Component} from 'react';
import {Flex, Item} from 'react-flex';
import {Link} from 'react-router';
import {spring, presets, StaggeredMotion, Motion} from 'react-motion';

class TransitionedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      isClicked: false
    }
  }

  getColor(v){
    return v === .4 ? 'rgb(0,255,255)' : `rgba(151, 218, 255, ${v})`;
  }

  getBorderColour(v){
    return `0 0 1px 0 rgba(100, 200, 255, ${v}), 0 0 3px rgba(151, 218, 255, ${v})`;
  }

  handleHover(active){(this.setState({isHover: active}))}

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
        {tween => {
          return(
            <span
              onMouseOver={() => this.handleHover(true)}
              onMouseLeave={() => this.handleHover(false)}
              style={{boxShadow: this.getBorderColour(tween.percent), color: this.getColor(tween.percent)}}
            >
              {this.props.label}
            </span>
          )
        }}
      </Motion>
    )
  }
}

export default function StaggeredMenu() {
  const items = [
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
    }, {
      label: "Blog",
      route:'/articles',
      title: "Articles, Articles, Articles!"
    }
  ];
  return (
    <StaggeredMotion
      defaultStyles={[...items].map(() => {return {s: .9, o:0.1}})}
      styles={prevStyles => prevStyles.map((_, i) => { return {
        s: spring(i === 0 ? 1 : prevStyles[i - 1].s, {precision:.1}),
        o: spring(i === 0 ? 1 : prevStyles[i - 1].o, { precision:.01 })
      }})}
    >
      {interpolatingStyles => <Flex>
        {interpolatingStyles.map(({s,o}, i) => { return(
          <Item wrap role="menuitem" key={`${i}Button`}>
            <Link
              role="menuitem"
              to={items[i].route}
              style={{ transform: `scale3d(${s}, ${s}, 1)`, opacity: o}}
            >
              <TransitionedButton label={items[i].label} title={items[i].title} />
            </Link>
          </Item>
        )})}
      </Flex>
    }
    </StaggeredMotion>
  );
}
