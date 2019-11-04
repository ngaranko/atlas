import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  hasPrintMode,
  hideEmbedMode,
  hidePrintMode,
  isMapActive,
} from '../../../shared/ducks/ui/ui'
import Header from './Header'
import { getUser } from '../../../shared/ducks/user/user'

/* istanbul ignore next */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hidePrintMode,
      hideEmbedMode,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  user: getUser(state),
  hasPrintButton: hasPrintMode(state),
  hasEmbedButton: isMapActive(state),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
