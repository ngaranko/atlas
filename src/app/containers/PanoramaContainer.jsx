import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import { getStraatbeeld } from '../../shared/ducks/straatbeeld/straatbeeld';

const mapStateToProps = (state) => ({
  straatbeeldState: getStraatbeeld(state)
});

const PanoramaContainer = ({
  straatbeeldState
}) => (
  <AngularWrapper
    moduleName={'dpStraatbeeldWrapper'}
    component="dpStraatbeeld"
    dependencies={['atlas']}
    bindings={{
      state: straatbeeldState
    }}
  />
);

PanoramaContainer.propTypes = {
  straatbeeldState: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, null)(PanoramaContainer);
