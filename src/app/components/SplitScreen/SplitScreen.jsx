import React from 'react';
import PropTypes from 'prop-types';
import ShareBarContainer from '../../components/ShareBar/ShareBarContainer';

/* istanbul ignore next */ // TODO: refactor, test
const SplitScreen = ({ leftComponent, rightComponent, printMode }) => (
  <div className="c-dashboard__column-holder">
    <div
      className={`
        c-dashboard__column
        u-col-sm--${(printMode) ? '12' : '4'}
        qa-dashboard__column--middle

      `}
    >
      {leftComponent}
    </div>
    <div
      className={`
        c-dashboard__column
        c-dashboard__content
        u-overflow--y-auto
        u-col-sm--${(printMode) ? '12' : '8'}
        qa-dashboard__column--right
      `}
    >
      {rightComponent}
      {printMode ? '' : <div className="u-row">
        <div className="u-col-sm--12">
          <div className="u-margin__left--2 u-margin__bottom--2"><ShareBarContainer /></div>
        </div>
      </div>
      }
    </div>
  </div>
);

SplitScreen.propTypes = {
  leftComponent: PropTypes.node.isRequired,
  rightComponent: PropTypes.node.isRequired,
  printMode: PropTypes.bool.isRequired
};

export default SplitScreen;
