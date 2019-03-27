import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import ShareBar from './ShareBar';
import { hasPrintMode } from '../../../shared/ducks/ui/ui';

const mapStateToProps = (state) => ({
  hasPrintButton: hasPrintMode(state)
});

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   closeModalAction,
//   reportFeedbackAction,
//   reportProblemAction
// }, dispatch);

export default connect(mapStateToProps, null)(ShareBar);
