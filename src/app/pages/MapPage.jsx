import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapContainer from '../../map/containers/map/MapContainer';
import { isEmbedPreview } from '../../shared/ducks/ui/ui';
import { getIframeUrl } from '../../store/query-synchronization';

/* istanbul ignore next */ // TODO: refactor, test
const Map = ({ embedPreview }) => (
  <div style={{ height: '100%' }} className="c-map-page">
    <div
      className="c-dashboard__column u-col-sm--12 qa-dashboard__column--middle u-page-break-after"
    >
      {/* Note: map must not be unmounted when showing the iframe */}
      {/* as it will reset the map's state */}
      <div className="qa-map" style={{ display: embedPreview ? 'none' : 'block' }}>
        <MapContainer showPreviewPanel isFullscreen />
      </div>
      {embedPreview &&
      <iframe
        title="Grote kaart | Dataportaal"
        id="atlas-iframe-map"
        width="500"
        height="400"
        src={getIframeUrl()}
        frameBorder="0"
      />
      }
    </div>

  </div>
);

Map.defaultProps = {};

Map.propTypes = {
  embedPreview: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  embedPreview: isEmbedPreview(state)
});

export default connect(mapStateToProps, null)(Map);
