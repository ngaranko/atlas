import { connect } from 'react-redux';
import { isDetailLoading, getDetailTemplateUrl, getDetailData } from '../../../shared/ducks/detail/selectors';
import { getUser } from '../../../shared/ducks/user/user';
import { getApiSpecificationData } from '../../../shared/ducks/datasets/datasets';
import { getLocationPayload } from '../../../store/redux-first-router/selectors';
import { API_ROOT } from '../../../shared/services/auth/auth';
import DatasetDetail from './DatasetDetail';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  catalogFilters: getApiSpecificationData(state),
  user: getUser(state),
  endpoint: `${API_ROOT}dcatd/datasets/${getLocationPayload(state).id}`,
  detailTemplateUrl: getDetailTemplateUrl(state),
  detailData: getDetailData(state)
});

export default connect(mapStateToProps, null)(DatasetDetail);