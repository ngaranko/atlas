import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import {
  getDataSearchLocation,
  getNumberOfResults
} from '../../shared/ducks/data-search/data-search';
import { getUser } from '../../shared/ducks/user/user';

const mapStateToProps = (state) => ({
  isLoading: false,
  query: null,
  location: getDataSearchLocation(state),
  category: null,
  numberOfResults: getNumberOfResults(state),
  user: getUser(state)
});

// TODO refactor, rename GeoSearchContainer
const SearchContainer = ({
  isLoading,
  query,
  location,
  category,
  user,
  numberOfResults
}) => (
  <div className="qa-search-results">
    <AngularWrapper
      moduleName={'dpMapSearchWrapper'}
      component="dpSearchResults"
      dependencies={['atlas']}
      bindings={{
        isLoading,
        location: [location.latitude, location.longitude],
        user,
        numberOfResults
      }}
      interpolateBindings={{
        query,
        category
      }}
    />
  </div>
);

SearchContainer.defaultProps = {
  query: '',
  category: null,
  numberOfResults: undefined
};

SearchContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  query: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired,
  category: PropTypes.string,
  numberOfResults: PropTypes.number,
  user: PropTypes.object.isRequired // eslint-disable-line
};

export default connect(mapStateToProps, null)(SearchContainer);
