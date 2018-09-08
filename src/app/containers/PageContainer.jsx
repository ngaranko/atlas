import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { AngularWrapper } from 'react-angular';

const mapStateToProps = (state) => ({
  item: state.page.item || []
});

const PageContainer = ({ name, item, type }) => (
  <AngularWrapper
    moduleName="dpPageWrapper"
    component={'dpPage'}
    dependencies={['atlas']}
    interpolateBindings={{
      name,
      type,
      item
    }}
  />
);

PageContainer.defaultProps = {
  type: ''
};

PageContainer.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  item: PropTypes.any.isRequired
};

export default connect(mapStateToProps, null)(PageContainer);
