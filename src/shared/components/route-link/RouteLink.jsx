import React, { Component } from 'react';
import PropTypes from 'prop-types';

import applicationState from '../../../../src/shared/services/redux/application-state';
import ACTIONS from '../../../../src/shared/actions';


const getHref = (actionType, payload) => {
  // create the action
  const action = { type: ACTIONS[actionType] || actionType };
  if (payload) {
    action.payload = payload;
  }

  // Remove state properties that do not relate to the url
  // by converting the state to a url and back
  // This prevents deep copying of large state objects in the reducer (eg dataSelection.markers)
  const reducer = applicationState.getReducer();
  const state = applicationState.getStore().getState();
  const params = applicationState.getStateUrlConverter().state2params(state);
  const sourceState = applicationState.getStateUrlConverter().params2state({}, params);
  const targetState = reducer(sourceState, action);

  return applicationState.getStateUrlConverter().state2url(targetState);
};


class RouteLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      href: getHref(props.type, props.payload)
    };

    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate() {
    window.location.href = this.state.href;
  }

  render() {
    return (
      <span className={`c-link__wrapper ${this.props.inline ? 'c-link__wrapper--inine-block' : ''}`}>
        {/* {
            this.props.tagName === 'button' ?
              <button onClick={this.handleNavigate} className={`${this.props.className} qa-dp-link`} title={this.props.hoverText}>{this.props.children}</button>
              :
              <a href={this.state.href} className={`${this.props.className} qa-dp-link`} title={this.props.hoverText}>{this.props.children}</a>
          }! */}
        <a href={this.state.href} className={`${this.props.className} qa-dp-link`} title={this.props.hoverText}>{this.props.children}</a>
      </span>
    );
  }
}

RouteLink.propTypes = {
  inline: PropTypes.bool,
  tagName: PropTypes.oneOf(['a', 'button']).isRequired,
  className: PropTypes.string,
  hoverText: PropTypes.string,
  type: PropTypes.string.isRequired,
  payload: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object
  ])
};

RouteLink.defaultProps = {
  inline: false,
  tagName: 'button',
  className: '',
  hoverText: '',
  payload: '',
  children: ''
};

export default RouteLink;
