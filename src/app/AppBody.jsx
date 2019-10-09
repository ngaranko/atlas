import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import styled from '@datapunt/asc-core'
import EmbedIframeComponent from './components/EmbedIframe/EmbedIframe'
import GeneralErrorMessage from './components/PanelMessages/ErrorMessage/ErrorMessageContainer'
import { FeedbackModal, InfoModal } from './components/Modal'
import PAGES, {
  isMapSplitPage,
  isEditorialPage,
  isEditorialOverviewPage,
  isQuerySearchPage,
  isContentPage,
} from './pages'
import LoadingIndicator from '../shared/components/loading-indicator/LoadingIndicator'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const DataSearchQuery = React.lazy(() => import('./components/DataSearch/DataSearchQuery'))
const QuerySearchPage = React.lazy(() => import('./pages/QuerySearchPage'))
const DatasetPage = React.lazy(() => import('./pages/DatasetPage'))
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
const EditorialOverviewPage = React.lazy(() => import('./pages/EditorialOverviewPage'))
const MapSplitPage = React.lazy(() => import('./pages/MapSplitPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))
const MovedPage = React.lazy(() => import('./pages/MovedPage'))

// The Container from @datapunt/asc-ui isnt used here as the margins added do not match the ones in the design
const Container = styled.div`
  min-height: 50vh; // Makes sure the loading indicator is displayed in the Container
`

const AppBody = ({
  visibilityError,
  bodyClasses,
  hasMaxWidth,
  homePage,
  currentPage,
  embedPreviewMode,
}) => {
  const hasGrid = homePage || isEditorialPage(currentPage) || isContentPage(currentPage)

  return hasGrid ? (
    <Container id="main" className="main-container">
      <Suspense fallback={<LoadingIndicator style={{ top: '200px' }} />}>
        {homePage && <HomePage />}
        {currentPage === PAGES.ARTICLE_DETAIL && <ArticleDetailPage />}
        {currentPage === PAGES.SPECIAL_DETAIL && <SpecialDetailPage />}
        {currentPage === PAGES.PUBLICATION_DETAIL && <PublicationDetailPage />}

        {isEditorialOverviewPage(currentPage) && <EditorialOverviewPage type={currentPage} />}

        {currentPage === PAGES.ACTUALITY && <ActualityContainer />}
        {currentPage === PAGES.MOVED && <MovedPage />}
        {currentPage === PAGES.NOT_FOUND && <NotFoundPage />}

        <FeedbackModal id="feedbackModal" />
        <InfoModal id="infoModal" open />
      </Suspense>
    </Container>
  ) : (
    <Suspense fallback={<LoadingIndicator style={{ top: '200px' }} />}>
      <div className={`c-dashboard__body ${bodyClasses}`}>
        {visibilityError && <GeneralErrorMessage {...{ hasMaxWidth, isHomePage: homePage }} />}
        {embedPreviewMode ? (
          <EmbedIframeComponent />
        ) : (
          <div className="u-grid u-full-height">
            <div className="u-row u-full-height">
              {isQuerySearchPage(currentPage) && <QuerySearchPage />}

              {/* Todo: DP-6391 */}
              {currentPage === PAGES.DATA_SEARCH_CATEGORY && (
                <div className="c-search-results u-grid">
                  <DataSearchQuery />
                </div>
              )}

              {isMapSplitPage(currentPage) && <MapSplitPage />}

              {currentPage === PAGES.CONSTRUCTION_FILE && <ConstructionFilesContainer />}

              {currentPage === PAGES.DATASET_DETAIL && <DatasetDetailContainer />}
              {currentPage === PAGES.DATASETS && <DatasetPage />}
            </div>
          </div>
        )}
      </div>
      <FeedbackModal id="feedbackModal" />
      <InfoModal id="infoModal" open />
    </Suspense>
  )
}

AppBody.propTypes = {
  visibilityError: PropTypes.bool.isRequired,
  bodyClasses: PropTypes.string.isRequired,
  hasMaxWidth: PropTypes.bool.isRequired,
  homePage: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  embedPreviewMode: PropTypes.bool.isRequired,
}

export default AppBody
