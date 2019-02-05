import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSearchQueryResults } from '../../../shared/ducks/data-search/selectors';
import SearchList from './SearchList';
import { fetchMoreResults } from '../../../shared/ducks/data-search/actions';
import { getUserScopes } from '../../../shared/ducks/user/user';

const mapStateToProps = (state) => ({
  userScopes: getUserScopes(state),
  searchResults: getSearchQueryResults(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMoreResults
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
