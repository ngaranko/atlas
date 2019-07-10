import { connect } from 'react-redux'
import { getMessage, resetGlobalError } from '../../../../shared/ducks/error/error-message'
import ErrorMessage from './ErrorMessage'

const mapStateToProps = state => ({
  errorMessage: getMessage(state),
})

const mapDispatchToProps = dispatch => ({
  dismissError: () => dispatch(resetGlobalError()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorMessage)
