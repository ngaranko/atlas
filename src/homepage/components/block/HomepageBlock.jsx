import React from 'react';
import PropTypes from 'prop-types';

import './_homepage-block.scss';

const HomepageBlock = (props) => (
  <div
    className="homepage-block c-homepage__block c-homepage__block--tall"
  >

    {props.children}

    {!!props.onBlockLinkClick && (
      <button
        className={`c-homepage__block-button ${props.hasTallDescription ? 'c-homepage__block-button--tall' : ''}`}
        title={`Bekijk ${props.title}`}
        onClick={props.onBlockLinkClick}
      >
        <div className="o-btn--transparent">{props.title}</div>
        <div className="c-homepage__block-details">{props.description}</div>
      </button>
    )}
  </div>
);

HomepageBlock.propTypes = {
  onBlockLinkClick: PropTypes.func,
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
  onBlockLinkClick: undefined,
  children: '',
  description: '',
  hasTallDescription: false,
  title: ''
};

export default HomepageBlock;
