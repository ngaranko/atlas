import React from 'react';
import PropTypes from 'prop-types';

import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';
import MapSearchResultsCategory from './MapSearchResultsCategory';
import Notification from '../../../shared/components/notification/Notification';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';

export const previewPanelResultLimit = 3;

const MapSearchResults = ({
  count,
  location,
  missingLayers,
  onItemClick,
  panoUrl,
  results,
  onMaximize,
  onPanoPreviewClick
}) => {
  const rdCoordinates = wgs84ToRd(location);

  return (
    <section className="map-search-results">
      <header
        className={`
          map-search-results__header
          map-search-results__header--${panoUrl ? 'pano' : 'no-pano'}
        `}
      >
        <button
          className="map-search-results__header-pano-button"
          onClick={onPanoPreviewClick}
          title="Panoramabeeld"
        >
          {panoUrl && (
            <img
              alt="Panoramabeeld"
              width="438"
              height="292"
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
        </button>
      </header>
      <div className="map-search-results__scroll-wrapper">
        <ul className="map-search-results__list">
          {missingLayers && (
            <li>
              <Notification>Geen details beschikbaar van: {missingLayers}</Notification>
            </li>
          )}
          {
            results.map((mainCategory) => (
              <MapSearchResultsCategory
                key={mainCategory.categoryLabel}
                category={mainCategory}
                onClick={onItemClick}
              />
            ))
          }
        </ul>
        <footer className="map-search-results__footer">
          <button onClick={onMaximize} className="map-search-results__button">
            <MaximizeIcon className="map-search-results__button-icon" />
            Volledig weergeven
          </button>
        </footer>
      </div>
    </section>
  );
};

MapSearchResults.propTypes = {
  count: PropTypes.number, // eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
  missingLayers: PropTypes.string, // eslint-disable-line
  onItemClick: PropTypes.func.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
  panoUrl: PropTypes.string, // eslint-disable-line
  results: PropTypes.array // eslint-disable-line
};

export default MapSearchResults;
