import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import {
  getDataSearchLocation,
  getNumberOfResults
} from '../../shared/ducks/data-search/data-search';
import { getUser } from '../../shared/ducks/user/user';
import { getPanoramaPreview, isPanoramaPreviewLoading } from '../../shared/ducks/panorama/preview/panorama-preview';

const mapStateToProps = (state) => ({
  isLoading: false,
  query: null,
  location: getDataSearchLocation(state),
  category: null,
  numberOfResults: getNumberOfResults(state),
  user: getUser(state),
  previewPanorama: getPanoramaPreview(state),
  isPreviewPanoramaLoading: isPanoramaPreviewLoading(state)
});

const SearchContainer = ({
  isLoading,
  query,
  location,
  category,
  user,
  numberOfResults,
  previewPanorama,
  isPreviewPanoramaLoading
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
        numberOfResults,
        previewPanorama,
        isPreviewPanoramaLoading
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
  numberOfResults: undefined,
  previewPanorama: undefined,
  isPreviewPanoramaLoading: undefined
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
  user: PropTypes.object.isRequired, // eslint-disable-line
  previewPanorama: PropTypes.object, // eslint-disable-line
  isPreviewPanoramaLoading: PropTypes.bool
};

export default connect(mapStateToProps, null)(SearchContainer);
