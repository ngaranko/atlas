import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TYPES } from '../../../shared/config/cms.config'
import { emptyFilters } from '../../../shared/ducks/filters/filters'
import { getViewMode, isMapPage } from '../../../shared/ducks/ui/ui'
import PARAMETERS from '../../../store/parameters'
import {
  toArticleDetail,
  toArticleSearch,
  toDataSearch,
  toDatasetDetail,
  toDatasetSearch,
  toDataSuggestion,
  toPublicationDetail,
  toPublicationSearch,
  toSearch,
  toSpecialSearch,
} from '../../../store/redux-first-router/actions'
import {
  isArticlePage,
  isDataPage,
  isDatasetPage,
  isPublicationPage,
  isSpecialPage,
} from '../../../store/redux-first-router/selectors'
import {
  getActiveSuggestions,
  getAutoSuggestSuggestions,
  getDisplayQuery,
  getNumberOfSuggestions,
  getSuggestionsAction,
  getTypedQuery,
  setActiveSuggestionAction,
} from '../../ducks/auto-suggest/auto-suggest'
import HeaderSearch from './HeaderSearch'

const mapStateToProps = state => ({
  activeSuggestion: getActiveSuggestions(state),
  displayQuery: getDisplayQuery(state),
  isDataPage: isDataPage(state),
  isDatasetPage: isDatasetPage(state),
  isArticlePage: isArticlePage(state),
  isPublicationPage: isPublicationPage(state),
  isSpecialsPage: isSpecialPage(state),
  view: getViewMode(state),
  isMapActive: isMapPage(state),
  numberOfSuggestions: getNumberOfSuggestions(state),
  pageName: state.page ? state.page.name : '',
  // eslint-disable-next-line no-nested-ternary
  prefillQuery: state.search
    ? state.search.query
    : state.dataSelection
    ? state.dataSelection.query
    : '',
  suggestions: getAutoSuggestSuggestions(state),
  typedQuery: getTypedQuery(state),
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      onCleanDatasetOverview: emptyFilters,
      onGetSuggestions: getSuggestionsAction,
      onSuggestionActivate: setActiveSuggestionAction,
    },
    dispatch,
  ),
  onSearch: query =>
    dispatch(
      toSearch(
        {
          [PARAMETERS.QUERY]: query,
        },
        false,
        true,
      ),
    ),
  onDatasetSearch: query =>
    dispatch(
      toDatasetSearch(
        {
          [PARAMETERS.QUERY]: query,
        },
        false,
        true,
      ),
    ),
  onDataSearch: query =>
    dispatch(
      toDataSearch(
        {
          [PARAMETERS.QUERY]: query,
        },
        false,
        true,
      ),
    ),
  onArticleSearch: query =>
    dispatch(
      toArticleSearch(
        {
          [PARAMETERS.QUERY]: query,
        },
        false,
        true,
      ),
    ),
  onPublicationSearch: query =>
    dispatch(
      toPublicationSearch(
        {
          [PARAMETERS.QUERY]: query,
        },
        false,
        true,
      ),
    ),
  onSpecialsSearch: query =>
    dispatch(
      toSpecialSearch(
        {
          [PARAMETERS.QUERY]: query,
        },
        false,
        true,
      ),
    ),
  openDataSuggestion: (suggestion, view) => dispatch(toDataSuggestion(suggestion, view)),
  openDatasetSuggestion: suggestion => dispatch(toDatasetDetail(suggestion)),
  openEditorialSuggestion: (suggestion, type) =>
    type === TYPES.ARTICLE
      ? dispatch(toArticleDetail(suggestion.id, suggestion.slug))
      : dispatch(toPublicationDetail(suggestion.id, suggestion.slug)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)
