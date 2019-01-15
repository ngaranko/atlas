import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPanoramaView } from '../../panorama/ducks/selectors';
import MapContainer from '../../map/containers/map/MapContainer';
import SplitScreen from '../components/SplitScreen/SplitScreen';
import { setView } from '../../panorama/ducks/actions';
import PanoramaContainer from '../../panorama/containers/PanoramaContainer';
import { VIEWS } from '../../panorama/ducks/constants';

/* istanbul ignore next */ // TODO: refactor, test
const PanoramaPage = ({ view, setPanoramaView }) => {
  const openPanoView = (newView) => setPanoramaView(newView);

  switch (view) {
    case VIEWS.PANO:
      return (
        <PanoramaContainer isFullscreen />
      );
    case VIEWS.MAP:
      return (
        <MapContainer
          isFullscreen
          toggleFullscreen={() => openPanoView(VIEWS.MAP_PANO)}
        />
      );
    default: {
      return (
        <SplitScreen
          leftComponent={(
            <MapContainer
              isFullscreen={false}
              toggleFullscreen={() => openPanoView(VIEWS.MAP)}
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
  view: PropTypes.oneOf(Object.values(VIEWS)).isRequired,
  setPanoramaView: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  view: getPanoramaView(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPanoramaView: setView
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaPage);
