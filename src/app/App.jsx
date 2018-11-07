import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import { connect } from 'react-redux';
import MapPage from './pages/MapPage';
import Piwik from './components/Piwik/Piwik';
import ContentPage from './pages/ContentPage';
import PAGES, { isCmsPage as pageIsCmsPage } from './pages';
import DataSelection from './pages/DataSelection';
import './_app.scss';
import CatalogDetailContainer from './containers/DatasetsDetailContainer';
import QuerySearchContainer from './containers/QuerySearchContainer';
import {
  isEmbedded,
  isEmbedPreview,
  isInPrintorEmbedMode,
  isPrintMode,
  isPrintModeLandscape
} from '../shared/ducks/ui/ui';
import { CMS_PAGE_MAPPING } from './pages/CMSPageMapping';
import PanoramaPage from './pages/PanoramaPage';
import DetailPage from './pages/DetailPage';
import Home from './pages/Home';
import { getUser } from '../shared/ducks/user/user';
import MapSearchPage from './pages/MapSearchPage';
import { getCurrentPage } from '../store/redux-first-router';
import Dataset from './components/Dataset/Dataset';

// TodoReactMigration: implement logic
const App = ({
  isFullHeight,
  pageType,
  visibilityError,
  currentPage,
  embedMode,
  printMode,
  embedPreviewMode,
  printModeLandscape,
  printOrEmbedMode,
  user
}) => {
  const isHomePage = currentPage === PAGES.HOME;
  const isCmsPage = pageIsCmsPage(currentPage);
  let cmsPageData;
  if (isCmsPage) {
    cmsPageData = CMS_PAGE_MAPPING[currentPage];
  }
  const hasMaxWidth = isHomePage || isCmsPage;

  const rootClasses = classNames({
    'c-dashboard--max-width': hasMaxWidth,
    'c-dashboard--full-height': isFullHeight,
    'c-dashboard--homepage': isHomePage
  });
  const bodyClasses = classNames({
    'c-dashboard__body--error': visibilityError
  });

  const printEmbedModeClasses = classNames({
    'is-print-mode': printMode,
    'is-print-mode--landscape': printModeLandscape, // Todo: implement
    'is-embed': embedMode,
    'is-embed-preview': embedPreviewMode
  });

  return (
    <div
      className={`c-dashboard c-dashboard--page-type-${pageType} ${rootClasses} ${printEmbedModeClasses}`}
    >
      <Piwik />
      <AngularWrapper
        moduleName={'dpHeaderWrapper'}
        component="dpHeader"
        dependencies={['atlas']}
        bindings={{
          isHomePage,
          hasMaxWidth,
          user,
          isEmbed: embedMode,
          isPrintMode: printMode,
          isEmbedPreview: embedPreviewMode,
          isPrintOrEmbedOrPreview: printOrEmbedMode
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
              <Home
                showFooter
              />
            )}

            {currentPage === PAGES.SEARCH_DATA && <QuerySearchContainer />}

            {currentPage === PAGES.KAART && <MapPage />}

            {currentPage === PAGES.KAART_SEARCH && <MapSearchPage />}

            {currentPage === PAGES.DATA_DETAIL && <DetailPage />}

            {currentPage === PAGES.PANORAMA && <PanoramaPage />}

            {currentPage === PAGES.DATASETS && <Dataset />}

            {currentPage === PAGES.DATASETS_DETAIL && (
              <CatalogDetailContainer />
            )}

            {(currentPage === PAGES.ADDRESSES
            || currentPage === PAGES.ESTABLISHMENTS
            || currentPage === PAGES.CADASTRAL_OBJECTS)
            && (
              <DataSelection />
            )}

            {isCmsPage && (
              <ContentPage
                name={cmsPageData.template}
                type={cmsPageData.type}
                item={cmsPageData.item}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

App.defaultProps = {
  isFullHeight: false,
  pageType: '',
  visibilityError: false
};

App.propTypes = {
  isFullHeight: PropTypes.bool,
  pageType: PropTypes.string, // state.page && state.page.type ? state.page.type : '',
  currentPage: PropTypes.string.isRequired,
  visibilityError: PropTypes.bool, // vm.visibility.error
  embedMode: PropTypes.bool.isRequired,
  printMode: PropTypes.bool.isRequired,
  printOrEmbedMode: PropTypes.bool.isRequired,
  printModeLandscape: PropTypes.bool.isRequired,
  embedPreviewMode: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => ({
  currentPage: getCurrentPage(state),
  embedMode: isEmbedded(state),
  printMode: isPrintMode(state),
  printModeLandscape: isPrintModeLandscape(state),
  embedPreviewMode: isEmbedPreview(state),
  printOrEmbedMode: isInPrintorEmbedMode(state),
  user: getUser(state)
});

const AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;
