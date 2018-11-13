import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
closeStraatbeeld,
getHotspots,
getStraatbeeld
} from '../../shared/ducks/straatbeeld/straatbeeld';
import AngularWrapper from '../../react-angular/AngularWrapper';

const mapStateToProps = (state) => ({
  straatbeeldState: getStraatbeeld(state),
  hotspots: getHotspots(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  doClose: closeStraatbeeld
}, dispatch);

const PanoramaContainer = ({
  straatbeeldState,
  doClose,
  hotspots,
  isFullscreen
}) => (
  <AngularWrapper
    moduleName={'dpStraatbeeldWrapper'}
    component="dpStraatbeeld"
    dependencies={['atlas']}
    bindings={{
      state: straatbeeldState,
      doClose,
      hotspots,
      isFullscreen
    }}
  />
);

PanoramaContainer.propTypes = {
  straatbeeldState: PropTypes.shape({}).isRequired,
  hotspots: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isFullscreen: PropTypes.bool.isRequired,
  doClose: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaContainer);
