import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPanoramaRequestExternal, fetchPanoramaRequestToggle } from '../../ducks/actions';
import PanoramaToggle from './PanoramaToggle';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchPanoramaRequest: fetchPanoramaRequestToggle,
  openPanoramaExternal: fetchPanoramaRequestExternal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PanoramaToggle);
