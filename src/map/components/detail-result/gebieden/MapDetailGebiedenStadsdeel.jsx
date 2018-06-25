import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';
import MapDetailResultItem from '../MapDetailResultItem';

const MapDetailGebiedenStadsdeel = ({ panoUrl, stadsdeel, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={stadsdeel.label}
    title="Stadsdeel"
  >
    { stadsdeel.grexStadsdeel && (
      <ul className="map-detail-result__list">
        { stadsdeel.grexStadsdeel.totaal_baten_display && <MapDetailResultItem
          label="Totale begroting baten"
          value={stadsdeel.grexStadsdeel.totaal_baten_display}
        /> }
        { stadsdeel.grexStadsdeel.totaal_kosten_display && <MapDetailResultItem
          label="Totale begroting kosten"
          value={stadsdeel.grexStadsdeel.totaal_kosten_display}
        /> }
        { stadsdeel.grexStadsdeel.totaal_resultaat_display && <MapDetailResultItem
          label="Verschil"
          value={stadsdeel.grexStadsdeel.totaal_resultaat_display}
        /> }
      </ul>
    )
  }
  </MapDetailResultWrapper>
);

MapDetailGebiedenStadsdeel.propTypes = {
  stadsdeel: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailGebiedenStadsdeel;
