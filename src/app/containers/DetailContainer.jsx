import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AngularWrapper } from 'react-angular';
import {
  getDetailEndpoint,
  isDetailLoading,
  getDetailTemplateUrl,
  getDetailData,
  getDetailFilterSelection
} from '../../shared/ducks/detail/selectors';
import { getUser } from '../../shared/ducks/user/user';
import {
  getPanoramaPreview,
  isPanoramaPreviewLoading
} from '../../panorama/ducks/preview/panorama-preview';
import { fetchDetailRequest } from '../../shared/ducks/detail/actions';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  user: getUser(state),
  endpoint: getDetailEndpoint(state),
  previewPanorama: getPanoramaPreview(state),
  isPreviewPanoramaLoading: isPanoramaPreviewLoading(state),
  detailTemplateUrl: getDetailTemplateUrl(state),
  detailData: getDetailData(state),
  detailFilterSelection: getDetailFilterSelection(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onFetchDetailRequest: fetchDetailRequest
}, dispatch);

class DetailContainer extends React.Component {

  componentDidMount() {
    const { endpoint, onFetchDetailRequest } = this.props;
    onFetchDetailRequest({ endpoint });
  }

  render() {
    const {
      isLoading,
      user,
      endpoint,
      previewPanorama,
      isPreviewPanoramaLoading,
      detailTemplateUrl,
      detailData,
      detailFilterSelection
    } = this.props;
    return (<div className="qa-detail">
      <AngularWrapper
        moduleName={'dpDetailWrapper'}
        component="dpDetail"
        dependencies={['atlas']}
        bindings={{
          isLoading,
          user,
          previewPanorama,
          isPreviewPanoramaLoading,
          detailTemplateUrl,
          detailData,
          detailFilterSelection
        }}
        interpolateBindings={{
          endpoint
        }}
      />
    </div>
    );
  }
}

DetailContainer.defaultProps = {
  previewPanorama: undefined,
  isPreviewPanoramaLoading: undefined,
  detailTemplateUrl: undefined,
  detailData: undefined,
  detailFilterSelection: undefined
};

DetailContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired,
  previewPanorama: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isPreviewPanoramaLoading: PropTypes.bool,
  detailTemplateUrl: PropTypes.string,
  detailData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  detailFilterSelection: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onFetchDetailRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
