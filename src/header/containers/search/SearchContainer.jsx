import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSearchQuery } from '../../ducks/search/search-query';
import Search from '../../components/search/Search';


const mapStateToProps = (state) => ({
  searchQuery: state.autoSuggest.searchQuery
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSearchInput: setSearchQuery
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
  // onToggleFullscreen: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
