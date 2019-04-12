import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContextMenuComponent from './ContextMenuComponent';
import { sharePage, showPrintMode } from '../../../shared/ducks/ui/ui';
import { isMapPanelActive } from '../../../map/ducks/map/selectors';
import getShareUrl from '../../../shared/services/share-url/share-url';

export const handlePageShare = (target, fn) => {
  fn(target);
  const link = getShareUrl(target, window);

  if (link) {
    window.open(link.url, link.target);
  }
};

export const handlePrintMode = (openPrintMode) => {
  openPrintMode();
};

const mapStateToProps = (state) => ({
  isMapPanelVisible: isMapPanelActive(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sharePage,
  handlePageShare,
  handlePrintMode,
  showPrintMode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenuComponent);
