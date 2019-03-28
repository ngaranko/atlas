import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShareBar from './ShareBar';
import { hasPrintMode, showPrintMode, sharePage } from '../../../shared/ducks/ui/ui';
import getShareUrl from '../../../shared/services/share-url/share-url';

export const handlePageShare = (target, fn) => {
  fn(target);
  const redirectUrl = getShareUrl(target, window);

  if (redirectUrl) {
    window.open(redirectUrl, '_blank');
  }
};

export const handlePrintMode = (openPrintMode) => {
  openPrintMode();
};

const mapStateToProps = (state) => ({
  hasPrintButton: hasPrintMode(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sharePage,
  showPrintMode,
  handlePageShare,
  handlePrintMode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShareBar);
