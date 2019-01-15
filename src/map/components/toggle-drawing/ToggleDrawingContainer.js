import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShapeDistanceTxt, isDrawingEnabled } from '../../ducks/map/map-selectors';
import { getNumberOfDrawMarkers } from '../../../shared/ducks/data-selection/selectors';
import {
  cancelDrawing,
  endDataSelection,
  resetDrawing,
  startDrawing
} from '../../../shared/ducks/data-selection/actions';
import ToggleDrawing from './ToggleDrawing';

const mapStateToProps = (state) => ({
  isEnabled: isDrawingEnabled(state),
  shapeMarkers: getNumberOfDrawMarkers(state),
  shapeDistance: getShapeDistanceTxt(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onStart: startDrawing,
  onReset: resetDrawing,
  onEnd: endDataSelection,
  onCancel: cancelDrawing
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ToggleDrawing);
