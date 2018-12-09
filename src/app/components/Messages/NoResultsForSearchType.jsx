import React from 'react';
import PropTypes from 'prop-types';

const NoResultsForSearchType = ({ tip }) => (
  <div>
    <div className="u-margin__bottom--1">Geen resultaten van deze soort</div>
    {tip && <div>Tip: {tip}</div>}
  </div>
);

NoResultsForSearchType.propTypes = {
  tip: PropTypes.string.isRequired
};

export default NoResultsForSearchType;
