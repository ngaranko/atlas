import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isMapPanelActive } from '../../../map/ducks/map/selectors';
import {
  hasEmbedMode,
  hasPrintMode,
  sharePage,
  showEmbedPreview,
  showPrintMode
} from '../../../shared/ducks/ui/ui';

const mapStateToProps = (state) => ({
  isMapPanelVisible: isMapPanelActive(state),
  hasPrintButton: hasPrintMode(state),
  hasEmbedButton: hasEmbedMode(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  openSharePage: sharePage,
  openPrintMode: showPrintMode,
  openEmbedPreview: showEmbedPreview
}, dispatch);

export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
