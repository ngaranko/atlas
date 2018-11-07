import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getActiveSuggestions, getAutoSuggestSuggestions, getDisplayQuery, getNumberOfSuggestions,
  getSuggestionsAction, getTypedQuery,
  setActiveSuggestionAction
} from '../../ducks/auto-suggest/auto-suggest';

import AutoSuggest from '../../components/auto-suggest/AutoSuggest';
import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';
import { emptyFilters } from '../../../shared/ducks/filters/filters';
import { isDatasetCurrentPage, isMapPage } from '../../../store/redux-first-router';
import {
  extractIdEndpoint,
  getPageActionEndpoint,
  routing, toDataSearch, toDatasetSearch
} from '../../../app/routes';

const mapStateToProps = (state) => ({
  activeSuggestion: getActiveSuggestions(state),
  displayQuery: getDisplayQuery(state),
  isDatasetView: isDatasetCurrentPage(state),
  isMapActive: isMapPage(state),
  numberOfSuggestions: getNumberOfSuggestions(state),
  pageName: state.page ? state.page.name : '',
  prefillQuery: state.search ? state.search.query : state.dataSelection ? state.dataSelection.query : '',
  suggestions: getAutoSuggestSuggestions(state),
  typedQuery: getTypedQuery(state)
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    onCleanDatasetOverview: emptyFilters,
    onGetSuggestions: getSuggestionsAction,
    onSuggestionActivate: setActiveSuggestionAction
  }, dispatch),
  onDatasetSearch: (query) => dispatch(toDatasetSearch(query)),
  onDataSearch: (query) => dispatch(toDataSearch(query)),
  openSuggestion: (suggestion) => {
    if (suggestion.uri.match(/^dcatd\//)) {
      // Suggestion of type catalog, a.k.a. "dataset"
      const id = extractIdEndpoint(suggestion.uri);
      return dispatch({ type: routing.datasetsDetail.type, payload: { id } });
    }
    return dispatch(getPageActionEndpoint(suggestion.uri));
  }
});

class HeaderSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
  }

  componentDidMount() {
    const { onGetSuggestions, prefillQuery } = this.props;

    if (prefillQuery) {
      onGetSuggestions(prefillQuery);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isMapActive,
      onGetSuggestions,
      pageName,
      prefillQuery
    } = this.props;

    const doResetQuery =
      prevProps.isMapActive !== isMapActive ||
      prevProps.pageName !== pageName;

    // on navigation, clear auto-suggest
    if (doResetQuery && !prefillQuery) {
      onGetSuggestions();
    }
  }

  // Opens suggestion on mouseclick or enter
  onSuggestionSelection(suggestion, shouldOpenInNewWindow) {
    const {
      typedQuery
    } = this.props;

    piwikTracker(['trackEvent', 'auto-suggest', suggestion.category, typedQuery]);

    if (shouldOpenInNewWindow) {
      // const newWindow = window.open(`${window.location.href}`, '_blank');
      // // setting uri to the window, as window.postMessage does not work for some reason
      // // (webpack overrides the data it seems)
      // newWindow.window.suggestionToLoadUri = suggestion.uri;
    } else {
      this.props.openSuggestion(suggestion);
    }
  }

  onFormSubmit() {
    const {
      activeSuggestion,
      isDatasetView,
      numberOfSuggestions,
      typedQuery,
      onCleanDatasetOverview,
      onDatasetSearch,
      onDataSearch
    } = this.props;

    piwikTracker(['trackSiteSearch', typedQuery, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (activeSuggestion.index === -1) {
      // Load the search results
      onCleanDatasetOverview(); // TODO, refactor: don't clean dataset on search
      if (isDatasetView) {
        onDatasetSearch(typedQuery);
      } else {
        onDataSearch(typedQuery);
      }
    }
  }

  onUserInput(query) {
    const {
      onGetSuggestions
    } = this.props;

    onGetSuggestions(query);
  }

  render() {
    const {
      activeSuggestion,
      displayQuery,
      numberOfSuggestions,
      onGetSuggestions,
      onSuggestionActivate,
      suggestions,
      typedQuery
    } = this.props;

    return (
      <AutoSuggest
        activeSuggestion={activeSuggestion}
        highlightQuery={typedQuery}
        legendTitle={'Data zoeken'}
        numberOfSuggestions={numberOfSuggestions}
        onSubmit={this.onFormSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={this.onSuggestionSelection}
        onTextInput={onGetSuggestions}
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        query={displayQuery || typedQuery}
        suggestions={suggestions}
      />
    );
  }
}

HeaderSearchContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

HeaderSearchContainer.defaultProps = {
  activeSuggestion: {
    index: -1
  },
  displayQuery: '',
  isDatasetView: false,
  numberOfSuggestions: 0,
  pageName: '',
  prefillQuery: '',
  suggestions: [],
  typedQuery: ''
};

HeaderSearchContainer.propTypes = {
  activeSuggestion: PropTypes.shape({
    category: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    uri: PropTypes.string
  }),
  displayQuery: PropTypes.string,
  isDatasetView: PropTypes.bool,
  isMapActive: PropTypes.bool.isRequired,
  numberOfSuggestions: PropTypes.number,
  onCleanDatasetOverview: PropTypes.func.isRequired,
  onDatasetSearch: PropTypes.func.isRequired,
  openSuggestion: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
  onDataSearch: PropTypes.func.isRequired,
  onSuggestionActivate: PropTypes.func.isRequired,
  pageName: PropTypes.string,
  prefillQuery: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  typedQuery: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchContainer);
