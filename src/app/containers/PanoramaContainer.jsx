import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AngularWrapper } from 'react-angular';
import {
closeStraatbeeld,
getHotspots,
getStraatbeeld
} from '../../shared/ducks/straatbeeld/straatbeeld';
import { isPrintMode } from '../../shared/ducks/ui/ui';

const mapStateToProps = (state) => ({
  straatbeeldState: getStraatbeeld(state),
  hotspots: getHotspots(state),
  isPrint: isPrintMode(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  doClose: closeStraatbeeld
}, dispatch);

const PanoramaContainer = ({
  straatbeeldState,
  doClose,
  hotspots,
  isFullscreen,
  isPrint
}) => (
  <AngularWrapper
    moduleName={'dpStraatbeeldWrapper'}
    component="dpStraatbeeld"
    dependencies={['atlas']}
    bindings={{
      state: straatbeeldState,
      doClose,
      hotspots,
      isFullscreen,
      // Todo: hack to trigger the resize, please fix when dpStraatbeeld component is
      // converted to react
      resize: isPrint
    }}
  />
);

PanoramaContainer.propTypes = {
  straatbeeldState: PropTypes.shape({}).isRequired,
  hotspots: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isFullscreen: PropTypes.bool.isRequired,
  doClose: PropTypes.func.isRequired,
  isPrint: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaContainer);
