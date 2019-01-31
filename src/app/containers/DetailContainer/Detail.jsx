import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';

const Detail = ({
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

Detail.defaultProps = {
  previewPanorama: undefined,
  isPreviewPanoramaLoading: undefined
};

Detail.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired,
  previewPanorama: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isPreviewPanoramaLoading: PropTypes.bool
};

export default Detail;
