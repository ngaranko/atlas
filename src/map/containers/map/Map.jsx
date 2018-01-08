import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

const mapStateToProps = (state) => ({
  isFullscreen: state.map.isFullscreen
});

// TODO: Add method that checks whether layer is active and toggles accordingly
const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class MapPanelContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <section className="map">
        <ToggleFullscreen isFullscreen={this.props.isFullscreen} />
      </section>
    );
  }
}

MapPanelContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapPanelContainer.defaultProps = {
  // isFullscreen: false
};

MapPanelContainer.propTypes = {
  isFullscreen: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPanelContainer);
