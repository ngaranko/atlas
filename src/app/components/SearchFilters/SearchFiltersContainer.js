import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchFilters from './SearchFilters'
import {
  addActiveFilter,
  removeActiveFilter,
  removeAllActiveFilters,
} from '../../pages/SearchPage/SearchPageDucks'

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
  null,
  mapDispatchToProps,
)(SearchFilters)
