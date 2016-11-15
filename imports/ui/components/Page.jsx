import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Page extends Component{
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
    const {className="", style={}} = this.props;
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
