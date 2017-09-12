import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  atlas: state.atlas,
  layerSelection: state.layerSelection,
  map: state.map
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const MapPanelContainer = props => (
  props.layerSelection.isEnabled &&
    <section style={{ position: 'fixed', left: '20px', bottom: '20px', width: '300px', height: '800px', zIndex: '100', backgroundColor: '#FFF' }}>
      <pre>
        {JSON.stringify(props.map, null, 2)}
      </pre>
    </section>
);

MapPanelContainer.defaultProps = {
  atlas: {},
  layerSelection: {},
  map: {}
};

MapPanelContainer.propTypes = {
  atlas: PropTypes.object, // eslint-disable-line
  layerSelection: PropTypes.object, // eslint-disable-line
  map: PropTypes.object // eslint-disable-line
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPanelContainer);
