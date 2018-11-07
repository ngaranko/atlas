import React from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import has from 'lodash.has';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';
import CloseIcon from '../../../../public/images/icon-cross-big.svg';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';
import MapDetailResult from '../../components/detail-result/MapDetailResult';
import MapSearchResults from '../../components/search-results/MapSearchResults';
import { getMapDetail } from '../../ducks/detail/map-detail';
import { getPanoPreview } from '../../../pano/ducks/preview/pano-preview';

const previewPanelSearchResultLimit = 3;

const isUpdated = (props, prevProps, paths) => {
  if (typeof paths === 'string') {
    const newValue = get(props, paths);
    const oldValue = get(prevProps, paths);
    return newValue && oldValue !== newValue;
  }

  // Every path must exist in props
  return paths.every((path) => has(props, path)) &&
    // Some paths must have been updated
    paths.some((path) => isUpdated(props, prevProps, path));
};

const update = (dispatch, props, prevProps = {}) => {
  // Don't just copy this. It's an anti-pattern.
  if (isUpdated(props, prevProps, 'detailEndpoint')) {
    dispatch(getMapDetail(props.detailEndpoint, props.user));
  } else if (isUpdated(props, prevProps, 'detailResult.location')) {
    dispatch(getPanoPreview(props.detailResult.location));
  }
};

class MapPreviewPanel extends React.Component {
  constructor() {
    super();
    this.onPanoPreviewClick = this.onPanoPreviewClick.bind(this);
  }

  componentDidMount() {
    // Don't just copy this. It's an anti-pattern.
    update(this.context.store.dispatch, this.props);
  }

  componentDidUpdate(prevProps) {
    // Don't just copy this. It's an anti-pattern.
    update(this.context.store.dispatch, this.props, prevProps);
  }

  onPanoPreviewClick() {
    const { openPano, searchLocationId, pano } = this.props;
    const selectedPano = pano.previews[searchLocationId];
    if (!selectedPano) {
      return;
    }
    openPano(selectedPano);
  }

  render() {
    const props = this.props;
    const detailLocationId = get(props, 'detailResult.location') && Object
      .keys(props.detailResult.location)
      .map((key) => props.detailResult.location[key])
      .toString();
    const panoSearchPreview = get(props, `pano.previews['${props.searchLocationId}']`, {});
    const panoDetailPreview = get(props, `pano.previews['${detailLocationId}']`, {});
    const isLoading = get(props, 'dataSearch.isLoading') || get(props, 'mapDetail.isLoading');
    const isDetailLoaded = !isLoading && props.detail && props.mapDetail && props.detailResult;
    const hidden = false; // TODO: refactor, toggle visibility or remove logic all together

    const openDetailEndpoint = () => props.openDetail(props.detailEndpoint);

    return !props.isEmbed && (
      <div className="map-preview-panel-wrapper">
        <section className={`
          map-preview-panel
          map-preview-panel--${hidden ? 'hidden' : 'visible'}
        `}
        >
          <div className="map-preview-panel__heading">
            <button
              className="map-preview-panel__button"
              onClick={props.isSearchPreview ? props.onSearchMaximize : openDetailEndpoint}
              title="Volledige weergave tonen"
            >
              <MaximizeIcon className="map-preview-panel__button-icon" />
            </button>
            <button
              className="map-preview-panel__button"
              onClick={props.closePanel}
              title="Sluiten"
            >
              <CloseIcon className="map-preview-panel__button-icon" />
            </button>
          </div>
          <div
            className={`
              map-preview-panel__body
              map-preview-panel__body--${isLoading ? 'loading' : 'loaded'}
            `}
          >
            {isLoading && (
              <LoadingIndicator />
            )}
            {!props.isSearchPreview && isDetailLoaded && (
              <MapDetailResult
                panoUrl={panoDetailPreview.url}
                onMaximize={openDetailEndpoint}
                onPanoPreviewClick={this.onPanoPreviewClick}
                result={props.detailResult}
              />
            )}
            {props.isSearchPreview && props.isSearchLoaded && props.searchLocation && (
              <MapSearchResults
                location={props.searchLocation}
                missingLayers={props.missingLayers}
                onItemClick={props.openPreviewDetail}
                onMaximize={props.onSearchMaximize}
                onPanoPreviewClick={this.onPanoPreviewClick}
                panoUrl={panoSearchPreview.url}
                resultLimit={previewPanelSearchResultLimit}
                results={props.searchResults}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
}

MapPreviewPanel.contextTypes = {
  store: PropTypes.object.isRequired
};

MapPreviewPanel.defaultProps = {
  detail: {},
  detailResult: {},
  detailEndpoint: undefined,
  isEmbed: false,
  mapDetail: {},
  missingLayers: '',
  pano: {},
  searchResults: [],
  search: {},
  searchLocation: null,
  searchLocationId: '',
  user: {}
};

/* eslint-disable react/no-unused-prop-types */
MapPreviewPanel.propTypes = {
  detail: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  detailResult: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  detailEndpoint: PropTypes.string,
  isEmbed: PropTypes.bool,
  mapDetail: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  missingLayers: PropTypes.string,
  closePanel: PropTypes.func.isRequired,
  openDetail: PropTypes.func.isRequired,
  // onMapPreviewPanelMaximizeSearch: PropTypes.func.isRequired,
  // onMapSearchResultsItemClick: PropTypes.func.isRequired,
  openPano: PropTypes.func.isRequired,
  pano: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchResults: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchLocation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  searchLocationId: PropTypes.string,
  user: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

export default MapPreviewPanel;
