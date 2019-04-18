import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPanoramaRequestExternal, setPanoramaTags } from '../../ducks/actions';
import PanoramaToggleComponent from './PanoramaToggleComponent';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPanoramaTags,
  openPanoramaExternal: fetchPanoramaRequestExternal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaToggleComponent);
