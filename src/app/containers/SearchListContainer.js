import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../shared/ducks/user/user';
import { getSearchCategory } from '../../shared/ducks/data-search/selectors';
import { setCategory } from '../../shared/ducks/data-search/actions';
import { fetchDetail } from '../../shared/ducks/detail/detail';
import SearchList from '../components/SearchList/SearchList';

const mapStateToProps = (state) => ({
  user: getUser(state),
  category: getSearchCategory(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setSearchCategory: setCategory,
  fetchDetailPage: fetchDetail
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
