/**
 * @class Page
 * @extends React.PureComponent
 * @description Global container used for page transisionts
 */
import React, {PureComponent, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Page extends PureComponent{
  constructor(props){
    super(props);
    const {params} = props;
    this.key = params.slug || params.skill || 'ROOT';
  }
  cloneChildren(){
    if (this.props.children) {
      return React.cloneElement(this.props.children, { key: this.key })
    }
  }

  render(){
    const name = "fade";
    const timeout = 500;
    return (
      <ReactCSSTransitionGroup
        // transitionAppear
        // transitionLeave
        transitionName={name}
        transitionAppearTimeout={timeout}
        transitionEnterTimeout={timeout}
        transitionLeaveTimeout={timeout}
      >
        {this.cloneChildren()}
      </ReactCSSTransitionGroup>
    )
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
