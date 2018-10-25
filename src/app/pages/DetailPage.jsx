import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import MapContainer from '../../map/containers/map/MapContainer';
import DetailContainer from '../containers/DetailContainer';
import { DETAIL_VIEW, getDetailView } from '../../shared/ducks/detail/detail';

const DetailPage = ({ view }) => {
  switch (view) {
    case DETAIL_VIEW.DETAIL:
      return (
        <DetailContainer />
      );
    case DETAIL_VIEW.MAP:
      return <MapContainer isFullscreen showPreviewPanel />;
    default: {
      const sizeMap = 4;
      const sizeDetail = 8;
      return (
        <div style={{ height: '100%' }}>
          <div
            className={`c-dashboard__column u-col-sm--${sizeMap} qa-dashboard__column--middle u-page-break-after`}
          >
            <div className="qa-map">
              <MapContainer isFullscreen={false} toggleFullscreen={() => {}} />
            </div>
          </div>
          <div
            className={`c-dashboard__column c-dashboard__content u-col-sm--${sizeDetail} qa-dashboard__column--right`}
          >
            <DetailContainer />
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  view: getDetailView(state)
});

DetailPage.propTypes = {
  view: PropTypes.oneOf(Object.keys(DETAIL_VIEW)).isRequired
};

export default connect(mapStateToProps, null)(DetailPage);
