import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { AngularWrapper } from 'react-angular';
import { bindActionCreators } from 'redux';
import { getImageDataById } from '../../shared/services/straatbeeld-api/straatbeeld-api';
import {
  getStraatbeeld,
  getStraatbeeldHistory,
  getStraatbeeldId,
  isStraatbeeldInitiated,
  showStraatbeeldInitial,
  showStraatbeeldSubsequent
} from '../../shared/ducks/straatbeeld/straatbeeld';

const mapStateToProps = (state) => ({
  straatbeeldState: getStraatbeeld(state),
  id: getStraatbeeldId(state),
  history: getStraatbeeldHistory(state),
  isInitiated: isStraatbeeldInitiated(state),
  isPrintMode: state.ui.isPrintMode,
  isEmbedPreview: state.ui.isEmbedPreview,
  isEmbed: state.ui.isEmbed
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onShowStraatbeeldInitial: showStraatbeeldInitial,
  onShowStraatbeeldSubsequent: showStraatbeeldSubsequent
}, dispatch);

class PanoramaContainer extends Component {
  constructor(...options) {
    super(...options);

    this.state = {
      showPanorama: false
    };
  }


  render() {
    const {
      straatbeeldState,
      isPrintMode,
      isEmbedPreview,
      isEmbed,
      visibility,
      columnSizes
    } = this.props;

    return (
      <AngularWrapper
        moduleName={'dpStraatbeeldWrapper'}
        component="dpStraatbeeld"
        dependencies={['atlas']}
        bindings={{
          state: straatbeeldState,
          resize: [
            isPrintMode,
            isEmbedPreview,
            isEmbed,
            visibility.error,
            visibility.straatbeeld,
            columnSizes.right
          ]
        }}
      />
    );
  }
}

PanoramaContainer.defaultProps = {
  columnSizes: {
    right: 4
  },
  visibility: {
    error: false,
    straatbeeld: true
  }
};

PanoramaContainer.propTypes = {
  straatbeeldState: PropTypes.shape({}).isRequired,
  onShowStraatbeeldInitial: PropTypes.func.isRequired,
  onShowStraatbeeldSubsequent: PropTypes.func.isRequired,
  isPrintMode: PropTypes.bool.isRequired,
  isEmbedPreview: PropTypes.bool.isRequired,
  isEmbed: PropTypes.bool.isRequired,
  columnSizes: PropTypes.shape({
    right: PropTypes.number
  }),
  visibility: PropTypes.shape({
    error: PropTypes.bool,
    straatbeeld: PropTypes.bool
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaContainer);
