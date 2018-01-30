import React from 'react';
import PropTypes from 'prop-types';

import MapSearchResultsItem from './MapSearchResultsItem';

import categoryLabelsByType from '../../services/map-search/category-labels-by-type';

const getStatusLabel = (result) => (
  result.statusLabel && result.statusLabel.length > 0 ? `(${result.statusLabel})` : '');

const getPluralLabel = (result) => categoryLabelsByType[result.type].plural;

const MapSearchResultsCategory = ({ category, onClick }) => (
  <li className="map-search-results__category">
    <h4 className="map-search-results__category-header">
      {
        category.results.length > 1 ?
        `${getPluralLabel(category)}` : `${category.categoryLabel}`
      }
    </h4>
    <ul className="map-search-results__category-list">
      {
        category.results.map((result) => (
          <MapSearchResultsItem
            key={result.uri}
            label={result.label}
            statusLabel={getStatusLabel(result)}
            onClick={() => {
              onClick(result.uri);
            }}
          />
        ))
      }
      {
        category.showMore && (
          <li className="map-search-results__category-showmore">
            ...
          </li>
        )
      }
      {
        category.subCategories && category.subCategories.length ?
        category.subCategories.map((subCategory) => (
          <MapSearchResultsCategory
            key={subCategory.categoryLabel}
            category={subCategory}
            onClick={onClick}
          />
        )) : ''
      }
    </ul>
  </li>
);

MapSearchResultsCategory.propTypes = {
  category: PropTypes.shape({
    categoryLabel: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    subCategories: PropTypes.isRequired,
    type: PropTypes.string.isRequired,
    parent: PropTypes.string,
    uri: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default MapSearchResultsCategory;
