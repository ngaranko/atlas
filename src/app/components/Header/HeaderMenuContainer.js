import { connect } from 'react-redux'
import HeaderMenu from './HeaderMenu'
import { authenticateRequest, getUser } from '../../../shared/ducks/user/user'
import { openFeedbackForm } from '../Modal/FeedbackModal'

/* istanbul ignore next */
const mapStateToProps = state => ({
  user: getUser(state),
})

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  showFeedbackForm: openFeedbackForm,
  login: () => {
    dispatch(authenticateRequest('inloggen'))
    window.auth.login()
  },
  logout: () => {
    dispatch(authenticateRequest('uitloggen'))
    window.auth.logout()
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
