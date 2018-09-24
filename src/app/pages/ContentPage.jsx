import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { AngularWrapper } from 'react-angular';
import Footer from '../components/Footer/Footer';

const mapStateToProps = (state) => ({
  item: state.page.item || []
});

export const PAGE_NAMES = {
  home: 'home',
  contentOverview: 'content-overzicht'
};

export const PAGE_TYPES = {
  help: 'help',
  howTo: 'snelwegwijs',
  apis: 'apis',
  info: 'info'
};

const ContentPage = ({ name, item, type, columnSizes, showFooter }) => (
  <div
    style={{ display: (columnSizes.right) ? 'block' : 'none' }}
    className={`c-dashboard__column c-dashboard__content u-col-sm--${columnSizes.right} qa-dashboard__column--right`}
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
  showFooter: false
};

ContentPage.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  item: PropTypes.any.isRequired,
  showFooter: PropTypes.bool,
  columnSizes: PropTypes.shape({
    right: PropTypes.number,
    middle: PropTypes.number
  }).isRequired
};

export default connect(mapStateToProps, null)(ContentPage);
