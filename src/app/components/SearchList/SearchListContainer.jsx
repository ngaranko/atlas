import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getSearchCategory,
  getSearchQueryResults
} from '../../../shared/ducks/data-search/selectors';
import SearchList from './SearchList';
import { fetchMoreResults } from '../../../shared/ducks/data-search/actions';

const mapStateToProps = (state) => ({
  category: getSearchCategory(state),
  searchResults: getSearchQueryResults(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMoreResults
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
