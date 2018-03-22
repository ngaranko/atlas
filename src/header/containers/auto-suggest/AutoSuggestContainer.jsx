import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AutoSuggest from '../../components/auto-suggest/AutoSuggest';


const mapStateToProps = (state) => ({
  // isFullscreen: state.ui.isMapFullscreen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // onToggleFullscreen: toggleMapFullscreen
}, dispatch);

const AutoSuggestContainer = (props) => (
  <AutoSuggest {...props} />
);


AutoSuggestContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

AutoSuggestContainer.defaultProps = {
  // geometry: null
};

AutoSuggestContainer.propTypes = {
  // isFullscreen: PropTypes.bool.isRequired,
  // onToggleFullscreen: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoSuggestContainer);
