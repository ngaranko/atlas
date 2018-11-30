import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ children: childrenProp, noResults, tip, currentTab }) => {
  let childIndex = 0;
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    const childValue = child.props.label === undefined ? childIndex : child.props.label;
    const selected = childValue === currentTab;

    childIndex += 1;
    return React.cloneElement(child, {
      isCurrentTab: selected
    });
  });
  return (
    <div>
      <div className="o-tabs qa-tabs u-margin__bottom--2">
        <ul>
          {children}
        </ul>
      </div>

      {noResults ? (
        <div>
          <div className="u-margin__bottom--1">Geen resultaten van deze soort</div>
          <div>Tip: {tip}</div>
        </div>
      ) : null}
    </div>
  );
};

Tabs.defaulProps = {
  currentTab: false
};

Tabs.propTypes = {
  children: PropTypes.node,
  tip: PropTypes.string,
  currentTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  noResults: PropTypes.bool
};

export default Tabs;
