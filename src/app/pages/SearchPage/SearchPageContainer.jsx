import { connect } from 'react-redux'
import { getSearchQuery } from '../../../shared/ducks/data-search/selectors'
import SearchPage from './SearchPage'
import { getPage } from '../../../store/redux-first-router/selectors'

const mapStateToProps = state => ({
  query: getSearchQuery(state),
  currentPage: getPage(state),
})

export default connect(
  mapStateToProps,
  null,
)(SearchPage)
