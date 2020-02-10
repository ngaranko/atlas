import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import styled from '@datapunt/asc-core'
import Helmet from 'react-helmet'
import { useSelector } from 'react-redux'
import EmbedIframeComponent from './components/EmbedIframe/EmbedIframe'
import GeneralErrorMessage from './components/PanelMessages/ErrorMessage/ErrorMessageContainer'
import { FeedbackModal, InfoModal } from './components/Modal'
import PAGES, { isMapSplitPage, isSearchPage } from './pages'
import LoadingIndicator from '../shared/components/loading-indicator/LoadingIndicator'
import { getQuery } from './pages/SearchPage/SearchPageDucks'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const ActualityContainer = React.lazy(() => import('./containers/ActualityContainer'))
const DatasetDetailContainer = React.lazy(() =>
  import('./containers/DatasetDetailContainer/DatasetDetailContainer'),
)
const ConstructionFilesContainer = React.lazy(() =>
  import('./containers/ConstructionFilesContainer/ConstructionFilesContainer'),
)
const ArticleDetailPage = React.lazy(() => import('./pages/ArticleDetailPage'))
const PublicationDetailPage = React.lazy(() => import('./pages/PublicationDetailPage'))
const SpecialDetailPage = React.lazy(() => import('./pages/SpecialDetailPage'))
const MapSplitPage = React.lazy(() => import('./pages/MapSplitPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))
const MovedPage = React.lazy(() => import('./pages/MovedPage'))
const SearchPage = React.lazy(() => import('./pages/SearchPage/index'))

// The Container from @datapunt/asc-ui isnt used here as the margins added do not match the ones in the design
const AppContainer = styled.div`
  flex-grow: 1;
  min-height: 50vh; // IE11: Makes sure the loading indicator is displayed in the Container
`

const AppBody = ({
  visibilityError,
  bodyClasses,
  hasGrid,
  homePage,
  currentPage,
  embedPreviewMode,
}) => {
  const query = useSelector(getQuery)
  return hasGrid ? (
    <>
      <AppContainer id="main" className="main-container">
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
        </Helmet>

        <Suspense fallback={<LoadingIndicator style={{ top: '200px' }} />}>
          {homePage && <HomePage />}
          {currentPage === PAGES.ARTICLE_DETAIL && <ArticleDetailPage />}
          {currentPage === PAGES.SPECIAL_DETAIL && <SpecialDetailPage />}
          {currentPage === PAGES.PUBLICATION_DETAIL && <PublicationDetailPage />}
          {currentPage === PAGES.ACTUALITY && <ActualityContainer />}
          {currentPage === PAGES.MOVED && <MovedPage />}
          {currentPage === PAGES.NOT_FOUND && <NotFoundPage />}
          {isSearchPage(currentPage) && <SearchPage currentPage={currentPage} query={query} />}
        </Suspense>
      </AppContainer>
      <FeedbackModal id="feedbackModal" />
      <InfoModal id="infoModal" open />
    </>
  ) : (
    <>
      <Helmet>
        {/* The viewport must be reset for "old" pages that don't incorporate the grid.
        1024 is an arbirtrary number as the browser doesn't actually care about the exact number,
        but only needs to know it's significantly bigger than the actual viewport */}
        <meta name="viewport" content="width=1024, user-scalable=yes" />
      </Helmet>
      <Suspense fallback={<LoadingIndicator style={{ top: '200px' }} />}>
        <div className={`c-dashboard__body ${bodyClasses}`}>
          {visibilityError && (
            <GeneralErrorMessage hasMaxWidth={hasGrid} {...{ isHomePage: homePage }} />
          )}
          {embedPreviewMode ? (
            <EmbedIframeComponent />
          ) : (
            <div className="u-grid u-full-height">
              <div className="u-row u-full-height">
                {isMapSplitPage(currentPage) && <MapSplitPage />}

                {currentPage === PAGES.CONSTRUCTION_FILE && <ConstructionFilesContainer />}

                {currentPage === PAGES.DATASET_DETAIL && <DatasetDetailContainer />}
              </div>
            </div>
          )}
        </div>
        <FeedbackModal id="feedbackModal" />
        <InfoModal id="infoModal" open />
      </Suspense>
    </>
  )
}

AppBody.propTypes = {
  visibilityError: PropTypes.bool.isRequired,
  bodyClasses: PropTypes.string.isRequired,
  hasGrid: PropTypes.bool.isRequired,
  homePage: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  embedPreviewMode: PropTypes.bool.isRequired,
}

export default AppBody
