import { connect } from 'react-redux'
import { getLocationPayload } from '../../store/redux-first-router/selectors'
import ArticlePage from './ArticlePage'

const mapStateToProps = state => ({
  id: getLocationPayload(state).id,
})

export default connect(
  mapStateToProps,
  null,
)(ArticlePage)
