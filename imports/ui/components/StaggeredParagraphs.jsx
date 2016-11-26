import React, {PureComponent} from 'react';
import {StaggeredMotion, spring} from 'react-motion';

export default class StaggeredParagraphs extends PureComponent{
  constructor(props){
    super(props);
  }
  splitOnBreak(content){
    return content.split("<br />");
  }

  staggeredProps(contentArr){
    const p = [...contentArr];
    const _s = { stiffness: 900, damping: 50, precision:.1 }
    return {
      defaultStyles: p.map(() => ({t:50, o:0.1})),
      styles: prevInterpolatedStyles => prevInterpolatedStyles.map((_,i) => {
        return i === 0
              ? {t: spring(0, _s), o:spring(1, _s)}
              : {t: spring(prevInterpolatedStyles[i - 1].t, _s), o:spring(prevInterpolatedStyles[i - 1].o)}
      })
    }
  }

  containerProps(){
    const {containerProps = {
      className: "single-post skill-description",
      style:{backgroundImage: "url(/green-bg.svg)"}
    }} = this.props;
    return containerProps;
  }

  staggeredStyle({t,o}){
    return {transform:`translate3d(0,${t}%,0)`, margin:"1rem auto 0 auto", opacity:o}
  }

  render(){
    const paragraphs = this.splitOnBreak(this.props.description)
    return (
      <StaggeredMotion {...this.staggeredProps(paragraphs)}>
        {interpolatedStyles =>
          <article {...this.containerProps()}>
            {interpolatedStyles.map((style, i) => (
              <p
                key={i}
                style={this.staggeredStyle(style)}
                dangerouslySetInnerHTML={{__html: paragraphs[i]}}
              />
            ))}
          </article>
        }
      </StaggeredMotion>
    )
  }
}
