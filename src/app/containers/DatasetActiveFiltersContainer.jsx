import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeFilter as removeActiveFilter, selectDatasetFilters } from '../../shared/ducks/filters/filters';
import ActiveFilters from '../components/ActiveFilters/ActiveFilters';

const DatasetActiveFilters = ({ filters, removeFilter }) => (
  <ActiveFilters filters={filters} removeFilter={removeFilter} />
);

DatasetActiveFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFilter: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  filters: selectDatasetFilters(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  removeFilter: removeActiveFilter
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DatasetActiveFilters);
