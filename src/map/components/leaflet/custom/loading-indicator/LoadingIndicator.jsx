// import { Control, DomUtil } from 'leaflet';
import { MapControl } from 'react-leaflet';
import createLoadingIndicator from './LoadingInicatorHelper';
import './LoadingIndicator.scss';

export default class LoadingIndicator extends MapControl {

  constructor(props) {
    super(props);
    this.state = {
      map: this.props.map
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading && this.state.map) {
      if (nextProps.loading) {
        this.state.map.fire('dataloading');
      } else {
        this.state.map.fire('dataload');
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    super.componentDidMount();
  }

  createLeafletElement(props) { // eslint-disable-line class-methods-use-this
    const LoadingIndicatorControl = createLoadingIndicator();
    return new LoadingIndicatorControl(props);
  }
}
