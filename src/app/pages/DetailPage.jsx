import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import MapContainer from '../../map/containers/map/MapContainer';
import DetailContainer from '../containers/DetailContainer';
import {
DETAIL_VIEW,
getDetailEndpoint,
getDetailGeometry,
getDetailView
} from '../../shared/ducks/detail/detail';
import { getPageActionEndpoint as endpointActionCreator } from '../routes';

/* istanbul ignore next */ // TODO: refactor, test
const DetailPage = ({ view: routeView, hasGeometry, endpoint, getPageActionEndpoint }) => {
  let view;
  if (view === DETAIL_VIEW.DETAIL) {
    view = hasGeometry ? routeView : DETAIL_VIEW.DETAIL;
  } else {
    view = routeView;
  }
  const toMap = () => getPageActionEndpoint(endpoint, DETAIL_VIEW.MAP);

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
              <MapContainer isFullscreen={false} toggleFullscreen={toMap} />
            </div>
          </div>
          <div
            className={`c-dashboard__column c-dashboard__content u-col-sm--${sizeDetail} u-overflow--y-auto qa-dashboard__column--right`}
          >
            <DetailContainer />
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  hasGeometry: Boolean(getDetailGeometry(state)),
  view: getDetailView(state),
  endpoint: getDetailEndpoint(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPageActionEndpoint: endpointActionCreator
}, dispatch);

DetailPage.propTypes = {
  hasGeometry: PropTypes.bool.isRequired,
  view: PropTypes.oneOf(Object.keys(DETAIL_VIEW)).isRequired,
  endpoint: PropTypes.string.isRequired,
  getPageActionEndpoint: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
