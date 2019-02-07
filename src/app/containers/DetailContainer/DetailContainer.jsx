import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../../shared/ducks/user/user';
import {
  getPanoramaPreview,
  isPanoramaPreviewLoading
} from '../../../panorama/ducks/preview/panorama-preview';
import Detail from './Detail';
import { fetchDetailRequest } from '../../../shared/ducks/detail/actions';
import {
  getDetailEndpoint,
  isDetailLoading,
  getDetailTemplateUrl,
  getDetailData,
  getDetailFilterSelection
} from '../../../shared/ducks/detail/selectors';


const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  user: getUser(state),
  endpoint: getDetailEndpoint(state),
  previewPanorama: getPanoramaPreview(state),
  isPreviewPanoramaLoading: isPanoramaPreviewLoading(state),
  detailTemplateUrl: getDetailTemplateUrl(state),
  detailData: getDetailData(state),
  detailFilterSelection: getDetailFilterSelection(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onFetchDetailRequest: fetchDetailRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
