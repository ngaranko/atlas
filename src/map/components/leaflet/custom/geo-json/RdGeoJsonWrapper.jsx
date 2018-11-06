import React from 'react';
import PropTypes from 'prop-types';
import RdGeoJson from './index';

const getRandomInt = () => Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));

/**
 * Wrapper that recreates child component whenever data geometry changes, because underlying
 * component can't handle updates to data prop.
 * See: https://react-leaflet.js.org/docs/en/components.html#geojson
 */
class RdGeoJsonWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: getRandomInt() };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.data.geometry !== this.props.data.geometry) {
      // Force recreate of dom elements
      this.setState({ key: getRandomInt() }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  render() {
    return (
      <RdGeoJson
        key={this.state.key}
        data={this.props.data}
        ref={this.props.setActiveElement}
      />
    );
  }
}

RdGeoJsonWrapper.propTypes = {
  data: PropTypes.shape({
    geometry: PropTypes.object.isRequired,
    label: PropTypes.string
  }).isRequired,
  setActiveElement: PropTypes.func.isRequired
};

export default RdGeoJsonWrapper;
