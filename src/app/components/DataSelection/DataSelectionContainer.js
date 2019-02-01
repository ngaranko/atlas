import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPage as setDatasetPage } from '../../../shared/ducks/data-selection/actions';
import { getUser, getUserScopes } from '../../../shared/ducks/user/user';
import { getFilters } from '../../../shared/ducks/filters/filters';
import {
  getDataSelection,
  getDataSelectionResult,
  getGeometryFilter
} from '../../../shared/ducks/data-selection/selectors';
import { getViewMode } from '../../../shared/ducks/ui/ui';
import DataSelection from './DataSelection';

const mapStateToProps = (state) => {
  const { isLoading, dataset, authError, page } = getDataSelection(state);
  return ({
    isLoading,
    dataset,
    authError,
    page,
    view: getViewMode(state),
    geometryFilter: getGeometryFilter(state),
    activeFilters: getFilters(state),
    results: getDataSelectionResult(state),
    user: getUser(state),
    userScopes: getUserScopes(state)
  });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPage: setDatasetPage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DataSelection);
