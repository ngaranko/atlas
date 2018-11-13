import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import Footer from '../components/Footer/Footer';

/* istanbul ignore next */ // TODO: refactor, test
const ContentPage = ({ name, item, type, showFooter }) => (
  <div
    style={{ display: 'block' }}
    className="c-dashboard__column c-dashboard__content u-col-sm--12 qa-dashboard__column--right"
  >
    <div className="c-dashboard__page o-max-width">
      <div className="c-dashboard__page-inner o-max-width__inner u-gutter">
        <div className="qa-page">
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
        </div>
      </div>
      {showFooter &&
      <Footer />
      }
    </div>
  </div>
);

ContentPage.defaultProps = {
  type: '',
  showFooter: false,
  item: []
};

ContentPage.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  item: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  showFooter: PropTypes.bool
};

export default ContentPage;
