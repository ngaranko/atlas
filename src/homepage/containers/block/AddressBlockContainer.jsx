import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddressBlock from '../../components/block/AddressBlock';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class AddressBlockContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <AddressBlock
      />
    );
  }
}

AddressBlockContainer.contextTypes = {
};

AddressBlockContainer.defaultProps = {
};

AddressBlockContainer.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressBlockContainer);
