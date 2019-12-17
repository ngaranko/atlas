import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchFilters from './SearchFilters'
import {
  addActiveFilter,
  getActiveFilters,
  removeActiveFilter,
  removeAllActiveFilters,
} from '../../pages/SearchPage/SearchPageDucks'

const mapStateToProps = state => ({
  activeFilters: getActiveFilters(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addActiveFilter,
      removeActiveFilter,
      removeAllActiveFilters,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFilters)
