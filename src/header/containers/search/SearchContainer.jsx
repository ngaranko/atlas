import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSearchQuery, setSuggestions } from '../../ducks/auto-suggest/auto-suggest';
import { fetchDetail } from '../../../reducers/details';
import { fetchDataSelection, fetchSearchResultsByQuery } from '../../../reducers/search';
import { emptyFilters } from '../../../reducers/filters';

import Search from '../../components/search/Search';


const mapStateToProps = (state) => ({
  searchQuery: state.autoSuggest.searchQuery,
  suggestions: state.autoSuggest.suggestions,
  numberOfSuggestions: state.autoSuggest.numberOfSuggestions,
  isDatasetView: state.dataSelection && state.dataSelection.view === 'CARDS'
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSearchInput: setSearchQuery,
  setSuggestions,
  fetchDetail,
  fetchDataSelection,
  fetchSearchResultsByQuery,
  emptyFilters
}, dispatch);

const SearchContainer = (props) => (
  <Search {...props} />
);


SearchContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

SearchContainer.defaultProps = {
  searchQuery: ''
};

SearchContainer.propTypes = {
  searchQuery: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
