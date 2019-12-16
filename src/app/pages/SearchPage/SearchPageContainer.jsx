import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchPage from './SearchPage'
import { getPage } from '../../../store/redux-first-router/selectors'
import { getQuery, setQuery, getActiveFilters, setActiveFilters } from './SearchPageDucks'

const mapStateToProps = state => ({
  currentPage: getPage(state),
  query: getQuery(state),
  activeFilters: getActiveFilters(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setQuery,
      setActiveFilters,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage)
