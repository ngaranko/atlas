import React from 'react';
import { AngularWrapper } from 'react-angular';

const PanoramaPreview = ({ panoramaPreview, isLoading }) => (
  <div className="c-search-results__thumbnail-container">
    <div className="c-search-results__thumbnail">
      <AngularWrapper
        moduleName={'dpStraatbeeldThumbnailWrapper'}
        component="dpStraatbeeldThumbnail"
        dependencies={['atlas']}
        bindings={{
          panorama: panoramaPreview,
          isLoading
        }}
      />
    </div>
  </div>
);

export default PanoramaPreview
