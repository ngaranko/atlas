import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import { reportProblemAction } from '../../../header/ducks/actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  reportProblemAction
}, dispatch);

export default connect(null, mapDispatchToProps)(Modal);
