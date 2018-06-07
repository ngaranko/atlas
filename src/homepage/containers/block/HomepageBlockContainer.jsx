import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomepageBlock from '../../components/block/HomepageBlock';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class HomepageBlockContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <HomepageBlock />
    );
  }
}

HomepageBlockContainer.contextTypes = {
};

HomepageBlockContainer.defaultProps = {
};

HomepageBlockContainer.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageBlockContainer);
