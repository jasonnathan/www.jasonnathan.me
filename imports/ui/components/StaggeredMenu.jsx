import React, {Component} from 'react';
import {Flex, Item} from 'react-flex';
import {Link} from 'react-router';
import {spring, StaggeredMotion, Motion} from 'react-motion';

class TransitionedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      isClicked: false
    }
  }

  handleHover(active){(this.setState({isHover: active}))}

  get springProps() {
    const conf = { stiffness:300, damping:20};
    return {
      defaultStyle: { scale: 1 },
      style:{ scale: spring(this.state.isHover ? 1.1 : 1, {...conf, precision:.001}).val},
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
              style={{transform: `scale3d(${tween.scale},${tween.scale},1)`}}
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
