import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ label, count, onClick, isCurrentTab }) => (
  <li key={label} className={isCurrentTab ? 'is-active' : ''}>
    {!isCurrentTab &&
    <button
      type="button"
      onClick={onClick}
      className="o-tabs__tab o-tabs__tab--link"
    >
      {label} {(count) ? <span>({count})</span> : null}
    </button>
    }
    {isCurrentTab &&
    <span className="qa-tab-header__active o-tabs__tab o-tabs__tab--active">
      {label} {(count) ? <span>({count})</span> : null}
    </span>
    }
  </li>
);

Tab.defaultProps = {
  count: null,
  isCurrentTab: false
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
  isCurrentTab: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Tab;
