import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getStraatbeeldHeading,
  getStraatbeeldId,
  getStraatbeeldView
} from '../../shared/ducks/straatbeeld/straatbeeld';
import PANORAMA_VIEW from '../../shared/ducks/straatbeeld/panorama-view';
import PanoramaContainer from '../containers/PanoramaContainer';
import MapContainer from '../../map/containers/map/MapContainer';
import { toPanorama as toPanoramaActionCreator } from '../../store/redux-first-router';
import SplitScreen from '../components/SplitScreen/SplitScreen';

/* istanbul ignore next */ // TODO: refactor, test
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
      return (
        <SplitScreen
          leftComponent={(
            <MapContainer
              isFullscreen={false}
              toggleFullscreen={() => openPanoView(PANORAMA_VIEW.MAP)}
            />
          )}
          rightComponent={(
            <PanoramaContainer isFullscreen={false} />
          )}
        />
      );
    }
  }
};

PanoramaPage.propTypes = {
  view: PropTypes.oneOf(Object.keys(PANORAMA_VIEW)).isRequired,
  id: PropTypes.string.isRequired,
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  toPanorama: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  heading: getStraatbeeldHeading(state),
  id: getStraatbeeldId(state),
  view: getStraatbeeldView(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toPanorama: toPanoramaActionCreator
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaPage);
