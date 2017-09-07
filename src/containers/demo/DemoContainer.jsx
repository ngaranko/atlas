import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  atlas: state.atlas
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const DemoContainer = props => (
  <pre>
    {JSON.stringify(props.atlas, null, 2)}
  </pre>
);

DemoContainer.defaultProps = {
  atlas: {}
};

DemoContainer.propTypes = {
  atlas: PropTypes.object // eslint-disable-line
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemoContainer);
