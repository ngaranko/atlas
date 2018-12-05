import React from 'react';
import { AngularWrapper } from 'react-angular';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';
import PanoramaPreview from '../../containers/PanoramaPreviewContainer';
import MoreResultsWhenLoggedIn from '../PanelMessages/MoreResultsWhenLoggedIn';
import SearchList from '../SearchList/SearchList';
import NoDetailsAvailable from '../PanelMessages/NoDetailsAvailable';

const LocationSearch = ({
  isLoading,
  layerWarning,
  searchResults,
  user,
  numberOfResults,
  location,
  panoramaPreview
}) => (
  <div className="c-search-results u-grid">
    {(isLoading) && <LoadingIndicator />}

    {(!isLoading) && (
      <div className="qa-search-results-content">
        <div className="qa-search-result">
          <div>
            <AngularWrapper
              moduleName={'dpSearchResultsHeaderWrapper'}
              component="dpSearchResultsHeader"
              dependencies={['atlas']}
              bindings={{
                numberOfResults,
                user,
                location
              }}
            />

            <NoDetailsAvailable {...{ layerWarning }} />

            {panoramaPreview && (
              <PanoramaPreview />
            )}

            <SearchList {...{ searchResults }} />

            {(!user.scopes.includes('HR/R') || !user.scopes.includes('BRK/RS')) &&
            <MoreResultsWhenLoggedIn />
            }
          </div>
        </div>
      </div>
    )}
  </div>
);

LocationSearch.propTypes = {
  panoramaPreview: PropTypes.func.isRequired,
  numberOfResults: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LocationSearch;

