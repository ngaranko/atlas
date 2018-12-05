import connect from 'react-redux/es/connect/connect';
import { getUser } from '../../shared/ducks/user/user';
import { getSearchQueryResults } from '../../shared/ducks/data-search/selectors';
import DataSearch from '../components/DataSearch/DataSearch';

const mapStateToProps = (state) => ({
  user: getUser(state),
  searchResults: getSearchQueryResults(state)
});

export default connect(mapStateToProps, null)(DataSearch);
