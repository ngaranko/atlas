import React from 'react';
import PropTypes from 'prop-types';
import MoreResultsWhenLoggedIn from '../PanelMessages/MoreResultsWhenLoggedIn';
import SearchList from '../../containers/SearchListContainer';

const DataSearch = ({ user, searchResults }) => (
  <div className="c-search-results u-grid">
    <div className="qa-search-results-content">
      <div className="qa-search-result">
        <SearchList {...{ searchResults }} />

        {(!user.scopes.includes('HR/R') || !user.scopes.includes('BRK/RS')) &&
        <MoreResultsWhenLoggedIn />
        }
      </div>
    </div>
  </div>
);

DataSearch.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DataSearch;
