import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import { getHotspots, getStraatbeeld } from '../../shared/ducks/straatbeeld/straatbeeld';

const mapStateToProps = (state) => ({
  straatbeeldState: getStraatbeeld(state),
  hotspots: getHotspots(state)
});

const PanoramaContainer = ({
  straatbeeldState,
  hotspots
}) => (
  <AngularWrapper
    moduleName={'dpStraatbeeldWrapper'}
    component="dpStraatbeeld"
    dependencies={['atlas']}
    bindings={{
      state: straatbeeldState,
      hotspots
    }}
  />
);

PanoramaContainer.propTypes = {
  straatbeeldState: PropTypes.shape({}).isRequired,
  hotspots: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, null)(PanoramaContainer);
