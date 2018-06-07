import React from 'react';
import PropTypes from 'prop-types';

import RouteLinkWrapper from '../../../shared/wrappers/route-link/RouteLinkWrapper';

import './_homepage-block.scss';

const HomepageBlock = (props) => (
  <div
    className="homepage-block c-homepage__block c-homepage__block--tall"
  >

    {props.children}

    <RouteLinkWrapper
      inline={false}
      tagName={'a'}
      className={`c-homepage__block-button ${props.hasTallDescription ? 'c-homepage__block-button--tall' : ''}`}
      hoverText={`Bekijk ${props.title}`}
      type={props.blockLink.type}
      payload={props.blockLink.payload}
    >
      <div className="o-btn--transparent">{props.title}</div>
      <div className="c-homepage__block-details">{props.description}</div>
    </RouteLinkWrapper>
  </div>
);

HomepageBlock.propTypes = {
  blockLink: PropTypes.shape({
    payload: PropTypes.object,
    type: PropTypes.string
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
    PropTypes.node
  ]),
  description: PropTypes.string,
  hasTallDescription: PropTypes.bool,
  title: PropTypes.string
};

HomepageBlock.defaultProps = {
  blockLink: {
    payload: {},
    type: ''
  },
  children: '',
  description: '',
  hasTallDescription: false,
  title: ''
};

export default HomepageBlock;
