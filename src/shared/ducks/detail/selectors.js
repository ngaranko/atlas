import { createSelector } from 'reselect';
import { REDUCER_KEY } from './constants';
import { pageTypeToEndpoint } from '../../../map/services/map-detail';
import { getViewMode, VIEW_MODE } from '../ui/ui';
import PAGES from '../../../app/pages';
import { getPage } from '../../../store/redux-first-router/selectors';

export const getDetail = (state) => state[REDUCER_KEY];
export const getDetailGeometry = createSelector(getDetail, (detail) => detail && detail.geometry);
export const getDetailEndpoint = createSelector(getDetail, (detail) => {
  if (detail && detail.type && detail.subtype && detail.id) {
    return pageTypeToEndpoint(detail.type, detail.subtype, detail.id);
  }
  return undefined;
});
export const getDetailDisplay = createSelector(getDetail, (detail) => detail && detail.display);
export const isDetailLoading = createSelector(getDetail, (detail) => detail && detail.isLoading);

export const getView = createSelector(getDetail, (detail) => detail && detail.view);

export const getDetailObject = createSelector(
  getDetail,
  (detail) => detail && detail.detaiObject
);

export const getDetailTemplateUrl = createSelector(
  getDetailObject,
  (detailObject) => detailObject && detailObject.includeSrc
);
export const getDetailData = createSelector(
  getDetailObject,
  (detailObject) => detailObject && detailObject.data
);

export const getDetailFilterSelection = createSelector(
  getDetailObject,
  (detailObject) => detailObject && detailObject.filterSelection
);

// Todo: DP-6571
export const shouldShowFullScreen = createSelector(
  getDetailGeometry,
  getViewMode,
  isDetailLoading,
  getPage,
  (geometry, viewMode, isLoading, currentPage) => (
    !isLoading && (viewMode === VIEW_MODE.SPLIT || viewMode === VIEW_MODE.MAP) &&
    !geometry && currentPage === PAGES.DATA_DETAIL)
);
