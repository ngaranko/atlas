import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {
getStraatbeeldHeading,
getStraatbeeldId,
getStraatbeeldView
} from '../../shared/ducks/straatbeeld/straatbeeld';
import PANORAMA_VIEW from '../../shared/ducks/straatbeeld/panorama-view';
import PanoramaContainer from '../containers/PanoramaContainer';
import MapContainer from '../../map/containers/map/MapContainer';
import { toPanorama as toPanoramaActionCreator } from '../routes';

const PanoramaPage = ({ id, heading, view, toPanorama }) => {
  const openPanoView = (newView) => toPanorama(id, heading, newView);

  switch (view) {
    case PANORAMA_VIEW.PANO:
      return (
        <PanoramaContainer isFullscreen />
      );
    case PANORAMA_VIEW.MAP:
      return (
        <MapContainer
          isFullscreen
          toggleFullscreen={() => openPanoView(PANORAMA_VIEW.MAP_PANO)}
        />
      );
    default: {
      const sizeMap = 4;
      const sizePano = 8;
      return (
        <div style={{ height: '100%' }}>
          <div
            className={`c-dashboard__column u-col-sm--${sizeMap} qa-dashboard__column--middle u-page-break-after`}
          >
            <div className="qa-map">
              <MapContainer
                isFullscreen={false}
                toggleFullscreen={() => openPanoView(PANORAMA_VIEW.MAP)}
              />
            </div>
          </div>
          <div
            className={`c-dashboard__column c-dashboard__content u-col-sm--${sizePano} qa-dashboard__column--right`}
          >
            <PanoramaContainer isFullscreen={false} />
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  heading: getStraatbeeldHeading(state),
  id: getStraatbeeldId(state),
  view: getStraatbeeldView(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toPanorama: toPanoramaActionCreator
}, dispatch);

PanoramaPage.propTypes = {
  view: PropTypes.oneOf(Object.keys(PANORAMA_VIEW)).isRequired,
  id: PropTypes.string.isRequired,
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  toPanorama: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaPage);
