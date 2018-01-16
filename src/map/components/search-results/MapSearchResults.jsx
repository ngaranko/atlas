import React from 'react';
import PropTypes from 'prop-types';

import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';
import MapSearchResultsItem from './MapSearchResultsItem';
import Notification from '../../../shared/components/notification/Notification';

const MapSearchResults = ({ count, location, missingLayers, onItemClick, panoUrl, results }) => {
  const rdCoordinates = wgs84ToRd(location);

  return (
    <section className="map-search-results">
      <header
        className={`
          map-search-results__header
          map-search-results__header--${panoUrl ? 'pano' : 'no-pano'}
        `}
      >
        {panoUrl && (
          <img
            alt="Panoramabeeld"
            className="map-search-results__header-pano"
            src={panoUrl}
          />
        )}
        <div className="map-search-results__header-container">
          <h1 className="map-search-results__header-title">Resultaten ({count})</h1>
          <h2 className="map-search-results__header-subtitle">
            locatie {rdCoordinates.x.toFixed(2)}, {rdCoordinates.y.toFixed(2)}
          </h2>
        </div>
      </header>
      <ul className="map-search-results__list">
        {missingLayers && (
          <li>
            <Notification>Geen details beschikbaar van: {missingLayers}</Notification>
          </li>
        )}
        {
          results.map((mainCategory) => (
            <li key={mainCategory.categoryLabel}>
              <ul className="main-category">
                <li>{ mainCategory.categoryLabel }</li>
                {
                  mainCategory.subCategoryItems && mainCategory.subCategoryItems.length ?
                  mainCategory.subCategoryItems.map((subCategory) => (
                    <li key={subCategory.categoryLabel}>
                      <ul className="sub-category">
                        <li>{ subCategory.categoryLabel }</li>
                        { subCategory && subCategory.results &&
                          subCategory.results.map((result) => (
                            <li key={result.uri}>
                              <MapSearchResultsItem
                                item={result}
                                onClick={() => {
                                  onItemClick(result.uri);
                                }}
                              />
                            </li>
                        ))}
                        {subCategory.showMore && (
                          <li>More results...</li>
                        )}
                      </ul>
                    </li>
                  )) : ''
                }
                {
                  mainCategory.subCategoryItems && !mainCategory.subCategoryItems.length &&
                  mainCategory.results.map((result) => (
                    <li key={result.uri}>
                      <MapSearchResultsItem
                        item={result}
                        onClick={() => {
                          onItemClick(result.uri);
                        }}
                      />
                    </li>
                  ))
                }
                { mainCategory.showMore && (
                  <li>More results...</li>
                )}
              </ul>
            </li>
          ))
        }
      </ul>
    </section>
  );
};

MapSearchResults.propTypes = {
  count: PropTypes.number, // eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
  onItemClick: PropTypes.func.isRequired,
  panoUrl: PropTypes.string, // eslint-disable-line
  missingLayers: PropTypes.string, // eslint-disable-line
  results: PropTypes.array // eslint-disable-line
};

export default MapSearchResults;
