import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import {
  getApiSpecificationData,
  getAuthError,
  getPage,
  getResults
} from '../../shared/ducks/datasets/datasets';
import { getActiveFilters } from '../../shared/ducks/filters/filters';
import { setPage as setPageAction } from '../../shared/ducks/datasets/data/data';
import Dataset from '../components/Dataset/Dataset';

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
  page: getPage(state),
  activeFilters: getActiveFilters(state),
  results: getResults(state),
  apiSpecification: getApiSpecificationData(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPage: setPageAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dataset);
