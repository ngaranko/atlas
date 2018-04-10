import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getSuggestions,
  setActiveSuggestion,
  setQuery
} from '../../ducks/auto-suggest/auto-suggest';
import { fetchDetail } from '../../../reducers/details';
import { fetchDataSelection, fetchSearchResultsByQuery } from '../../../reducers/search';
import emptyFilters from '../../../shared/ducks/filters/filters';

import AutoSuggest from '../../components/auto-suggest/AutoSuggest';
import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';
import getSharedConfig from '../../../shared/services/shared-config/shared-config';

const mapStateToProps = (state) => ({
  activeSuggestion: state.autoSuggest.activeSuggestion,
  isDatasetView: state.dataSelection && state.dataSelection.view === 'CARDS',
  numberOfSuggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.count : 0,
  displayQuery: state.autoSuggest.displayQuery,
  typedQuery: state.autoSuggest.typedQuery,
  suggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.data : []
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onCleanDatasetOverview: emptyFilters,
  onDatasetSearch: fetchDataSelection,
  onDetailLoad: fetchDetail,
  onSearch: fetchSearchResultsByQuery,
  onSuggestionActivate: setActiveSuggestion,
  onGetSuggestions: getSuggestions,
  onSetQuery: setQuery
}, dispatch);

class HeaderSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
    this.onSuggestionActivate = this.onSuggestionActivate.bind(this);
    if (window.opener && window.suggestionToLoadUri) {
      // if user is sent here with a ctrl+click action
      // open the detail page
      this.openDetailOnLoad();
    }
  }

  componentWillMount() {
    const {
      onSetQuery,
      prefillQuery
    } = this.props;
    /*
      if there is a query passed along the component
      (from url to state)
      do the initial call to set the state with this query
      this only needs to happen when the page is loaded, therefore in te componentWillMount()
    */
    if (prefillQuery.length) {
      onSetQuery(prefillQuery);
    }
  }

  onSuggestionActivate(suggestion) {
    const { onSuggestionActivate, onSetQuery, typedQuery } = this.props;

    if (suggestion && suggestion.index === -1) {
      onSetQuery(typedQuery);
    }
    onSuggestionActivate(suggestion);
  }

  onSuggestionSelection(suggestion, shouldOpenInNewWindow) {
    const {
      onDetailLoad,
      query
    } = this.props;
    piwikTracker(['trackEvent', 'auto-suggest', suggestion.category, query]);

    if (shouldOpenInNewWindow) {
      const newWindow = window.open(`${window.location.href}`, '_blank');
      // setting uri to the window, as window.postMessage does not work for some reason
      // (webpack overrides the data it seems)
      newWindow.window.suggestionToLoadUri = suggestion.uri;
    } else {
      onDetailLoad(`${getSharedConfig().API_ROOT}${suggestion.uri}`);
    }
  }

  onFormSubmit() {
    const {
      activeSuggestion,
      isDatasetView,
      numberOfSuggestions,
      onCleanDatasetOverview,
      onDatasetSearch,
      onSearch,
      typedQuery
    } = this.props;

    piwikTracker(['trackSiteSearch', typedQuery, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (activeSuggestion.index === -1) {
      // Load the search results
      onCleanDatasetOverview();
      if (isDatasetView) {
        onDatasetSearch(typedQuery);
      } else {
        onSearch(typedQuery);
      }
    }
  }

  onUserInput(query) {
    const { onSetQuery, onGetSuggestions } = this.props;

    onSetQuery(query);
    onGetSuggestions(query);
  }

  openDetailOnLoad() {
    const { onDetailLoad } = this.props;
    // if user is sent here with a ctrl+click action
    // open the detail page
    const suggestionUri = window.suggestionToLoadUri;
    onDetailLoad(`${getSharedConfig().API_ROOT}${suggestionUri}`);
    window.suggestionToLoadUri = undefined;
  }

  render() {
    const {
      activeSuggestion,
      numberOfSuggestions,
      typedQuery,
      displayQuery,
      suggestions
    } = this.props;

    return (
      <AutoSuggest
        activeSuggestion={activeSuggestion}
        legendTitle={'Data zoeken'}
        numberOfSuggestions={numberOfSuggestions}
        onSubmit={this.onFormSubmit}
        onSuggestionActivate={this.onSuggestionActivate}
        onSuggestionSelection={this.onSuggestionSelection}
        onTextInput={this.onUserInput}
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        query={displayQuery || typedQuery}
        highlightQuery={typedQuery}
        suggestions={suggestions}
      />
    );
  }
}

HeaderSearchContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

HeaderSearchContainer.defaultProps = {
  activeSuggestion: {},
  displayQuery: '',
  isDatasetView: false,
  numberOfSuggestions: 0,
  prefillQuery: '',
  query: '',
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
  numberOfSuggestions: PropTypes.number,
  onCleanDatasetOverview: PropTypes.func.isRequired,
  onDatasetSearch: PropTypes.func.isRequired,
  onDetailLoad: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSetQuery: PropTypes.func.isRequired,
  onSuggestionActivate: PropTypes.func.isRequired,
  prefillQuery: PropTypes.string,
  query: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  typedQuery: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchContainer);
