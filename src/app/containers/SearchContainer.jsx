import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import { getShortSelectedLocation } from '../../map/ducks/map/map-selectors';

const mapStateToProps = (state) => ({
  isLoading: false,
  query: null,
  location: getShortSelectedLocation(state) || {},
  category: null,
  numberOfResults: (state.search) ? state.search.numberOfResults : 0,
  user: state.user
});

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
  category: null
};

SearchContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  query: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  category: PropTypes.string,
  numberOfResults: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired // eslint-disable-line
};

export default connect(mapStateToProps, null)(SearchContainer);
