import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserScopes, userIsAuthenticated } from '../../../shared/ducks/user/user'
import { getNumberOfResults } from '../../../shared/ducks/data-search/selectors'
import DataSearch from './DataSearch'
import { toDetailFromEndpoint } from '../../../store/redux-first-router/actions'

const mapStateToProps = state => ({
  userAuthenticated: userIsAuthenticated(state),
  userScopes: getUserScopes(state),
  numberOfResults: getNumberOfResults(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toDetail: toDetailFromEndpoint,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataSearch)
