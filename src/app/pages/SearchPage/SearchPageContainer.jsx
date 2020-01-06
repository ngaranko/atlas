import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchPage from './SearchPage'
import { getPage } from '../../../store/redux-first-router/selectors'
import { getQuery, setQuery, getActiveFilters } from './SearchPageDucks'

const mapStateToProps = (state, { currentPage, query, isOverviewPage }) => ({
  currentPage: currentPage || getPage(state),
  query: query ? query.toString() : getQuery(state), // this value must be a string
  activeFilters: getActiveFilters(state),
  isOverviewPage,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setQuery,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage)
