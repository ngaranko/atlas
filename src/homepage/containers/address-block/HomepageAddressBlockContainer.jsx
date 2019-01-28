import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDataSelection } from '../../../header/ducks/search/search';

import HomepageAddressBlock from '../../components/address-block/HomepageAddressBlock';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onfetchDataSelection: fetchDataSelection
}, dispatch);

const HomepageAddressBlockContainer = (props) => (
  <HomepageAddressBlock
    onLinkClick={props.onfetchDataSelection}
  />
);

HomepageAddressBlockContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

HomepageAddressBlockContainer.propTypes = {
  onfetchDataSelection: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(HomepageAddressBlockContainer);
