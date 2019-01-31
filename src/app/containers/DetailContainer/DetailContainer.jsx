import { connect } from 'react-redux';
import { getDetailEndpoint, isDetailLoading } from '../../../shared/ducks/detail/selectors';
import { getUser } from '../../../shared/ducks/user/user';
import {
  getPanoramaPreview,
  isPanoramaPreviewLoading
} from '../../../panorama/ducks/preview/panorama-preview';
import Detail from './Detail';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  user: getUser(state),
  endpoint: getDetailEndpoint(state),
  previewPanorama: getPanoramaPreview(state),
  isPreviewPanoramaLoading: isPanoramaPreviewLoading(state)
});

export default connect(mapStateToProps, null)(Detail);
