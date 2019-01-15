import { connect } from 'react-redux';
import { getShapeDistanceTxt } from '../../ducks/map/map-selectors';
import ShapeSummary from './ShapeSummary';
import { resetDrawing } from '../../../shared/ducks/data-selection/actions';

const mapStateToProps = (state) => ({
  shapeDistanceTxt: getShapeDistanceTxt(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClearDrawing: () => dispatch(resetDrawing(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShapeSummary);
