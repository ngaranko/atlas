import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import { connect } from 'react-redux';
import Map from './pages/Map';
import Piwik from './components/Piwik/Piwik';
import ContentPage, { PAGE_NAMES, PAGE_TYPES } from './pages/ContentPage';
import PAGES from './pages';
// import DataSelection from './pages/DataSelection';

// TodoReactMigration: implement logic
const App = ({ hasMaxWidth, isFullHeight, pageType, visibilityError, columnSizes, currentPage }) => {
  const isHomePage = currentPage === PAGES.HOME;
  const rootClasses = classNames({
    'c-dashboard--max-width': hasMaxWidth,
    'c-dashboard--full-height': isFullHeight,
    'c-dashboard--homepage': isHomePage
  });
  const bodyClasses = classNames({
    'c-dashboard__body--error': visibilityError
  });
  return (
    <div className={`c-dashboard c-dashboard--page-type-${pageType} ${rootClasses}`}>
      <Piwik />
      <AngularWrapper
        moduleName={'dpHeaderWrapper'}
        component="dpHeader"
        dependencies={['atlas']}
        bindings={{
          isHomePage
        }}
        interpolateBindings={{
          hasMaxWidth
        }}
      />
      <AngularWrapper
        moduleName={'dpErrorWrapper'}
        component="dpError"
        dependencies={['atlas']}
        bindings={{
          isHomePage,
          visibilityError
        }}
        interpolateBindings={{
          hasMaxWidth
        }}
      />
      <div className={`c-dashboard__body ${bodyClasses}`}>
        <div className="u-grid u-full-height">
          <div className="u-row u-full-height">
            {currentPage === PAGES.HOME && (
              <ContentPage name={PAGE_NAMES.home} showFooter columnSizes={columnSizes} />
            )}

            {currentPage === PAGES.KAART && (
              <Map />
            )}

            {currentPage === PAGES.NIEUWS && (
              <ContentPage
                name={PAGE_NAMES.contentDetail}
                type={PAGE_TYPES.nieuws}
                item={'item0'}
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.HELP && (
              <ContentPage
                name={PAGE_NAMES.contentOverview}
                type={PAGE_TYPES.help}
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.PROCLAIMER && (
              <ContentPage
                name={PAGE_NAMES.contentOverview}
                type={PAGE_TYPES.proclaimer}
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.BEDIENING && (
              <ContentPage
                name={PAGE_NAMES.contentOverview}
                type={PAGE_TYPES.bediening}
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.GEGEVENS && (
              <ContentPage
                name={PAGE_NAMES.contentOverview}
                type={PAGE_TYPES.gegevens}
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.OVER_API && (
              <ContentPage
                name={PAGE_NAMES.contentOverview}
                type={PAGE_TYPES.over_api}
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.PRIVACY_BEVEILIGING && (
              <ContentPage
                name={PAGE_NAMES.contentDetail}
                type={PAGE_TYPES.beleid}
                item="item0"
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.BESCHIKBAAR_KWALITEIT && (
              <ContentPage
                name={PAGE_NAMES.contentDetail}
                type={PAGE_TYPES.beleid}
                item="item1"
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.BEHEER_WERKWIJZE && (
              <ContentPage
                name={PAGE_NAMES.contentDetail}
                type={PAGE_TYPES.beleid}
                item="item2"
                columnSizes={columnSizes}
              />
            )}
            {currentPage === PAGES.STATISTIEKEN && (
              <ContentPage
                name={PAGE_NAMES.contentOverview}
                type={PAGE_TYPES.statistieken}
                columnSizes={columnSizes}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

App.defaultProps = {
  hasMaxWidth: true,
  isFullHeight: true,
  pageType: '',
  visibilityError: false,
  columnSizes: { // determineColumnSizes in dashboard-columns
    right: 12,
    middle: 12
  }
};

App.propTypes = {
  hasMaxWidth: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  pageType: PropTypes.string, // state.page && state.page.type ? state.page.type : '',
  currentPage: PropTypes.string.isRequired,
  visibilityError: PropTypes.bool, // vm.visibility.error
  columnSizes: PropTypes.shape({
    right: PropTypes.number,
    middle: PropTypes.number
  })
};

const mapStateToProps = ({ currentPage }) => ({ currentPage });

const AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;
