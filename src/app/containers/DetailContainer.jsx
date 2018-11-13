import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import {
  getDetailEndpoint,
  isDetailLoading
} from '../../shared/ducks/detail/detail';
import { getUser } from '../../shared/ducks/user/user';
import { getPanoPreview, isPanoPreviewLoading } from '../../pano/ducks/preview/pano-preview';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  user: getUser(state),
  endpoint: getDetailEndpoint(state),
  previewPanorama: getPanoPreview(state),
  isPreviewPanoramaLoading: isPanoPreviewLoading(state)
});

const DetailContainer = ({
  isLoading,
  user,
  endpoint,
  previewPanorama,
  isPreviewPanoramaLoading
}) => (
  <div className="qa-detail">
    <AngularWrapper
      moduleName={'dpDetailWrapper'}
      component="dpDetail"
      dependencies={['atlas']}
      bindings={{
        isLoading,
        user,
        previewPanorama,
        isPreviewPanoramaLoading
      }}
      interpolateBindings={{
        endpoint
      }}
    />
  </div>
);

DetailContainer.defaultProps = {
  previewPanorama: undefined,
  isPreviewPanoramaLoading: undefined
};

DetailContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired,
  previewPanorama: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isPreviewPanoramaLoading: PropTypes.bool
};

export default connect(mapStateToProps, null)(DetailContainer);
