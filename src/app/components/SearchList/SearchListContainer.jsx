import { connect } from 'react-redux'
import SearchList from './SearchList'
import { getUserScopes } from '../../../shared/ducks/user/user'

const mapStateToProps = state => ({
  userScopes: getUserScopes(state),
})

export default connect(mapStateToProps)(SearchList)
