import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setActiveSuggestion,
  getSuggestions
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
  query: state.autoSuggest.query,
  queryFromUrl:
    state.search ?
      state.search.query :
      state.dataSelection ?
        state.dataSelection.query :
        null,
  suggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.data : []
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onCleanDatasetOverview: emptyFilters,
  onDatasetSearch: fetchDataSelection,
  onDetailLoad: fetchDetail,
  onSearch: fetchSearchResultsByQuery,
  onSuggestionActivate: setActiveSuggestion,
  onTextInput: getSuggestions
}, dispatch);

class HeaderSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    if (window.opener && window.suggestionToLoadUri) {
      // if user is sent here with a ctrl+click action
      // open the detail page
      this.openDetailOnLoad();
    }
  }

  componentWillMount() {
    const {
      onTextInput,
      prefillQuery
    } = this.props;
    /*
      if there is a query passed along the component
      (from url to state)
      do the initial call to set the state with this query
      this only needs to happen when the page is loaded, therefore in te componentWillMount()
    */
    if (prefillQuery.length) {
      onTextInput(prefillQuery);
    }
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
      query
    } = this.props;

    piwikTracker(['trackSiteSearch', query, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (activeSuggestion.index === -1) {
      // Load the search results
      onCleanDatasetOverview();
      if (isDatasetView) {
        onDatasetSearch(query);
      } else {
        onSearch(query);
      }
    }
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
      onSuggestionActivate,
      onTextInput,
      queryFromUrl,
      query,
      suggestions
    } = this.props;

    return (
      <AutoSuggest
        activeSuggestion={activeSuggestion}
        legendTitle={'Data zoeken'}
        numberOfSuggestions={numberOfSuggestions}
        onSubmit={this.onFormSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={this.onSuggestionSelection}
        onTextInput={onTextInput}
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        query={query}
        queryFromUrl={queryFromUrl}
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
  isDatasetView: false,
  numberOfSuggestions: 0,
  prefillQuery: '',
  query: '',
  queryFromUrl: '',
  suggestions: []
};

HeaderSearchContainer.propTypes = {
  activeSuggestion: PropTypes.shape({
    category: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    uri: PropTypes.string
  }),
  isDatasetView: PropTypes.bool,
  numberOfSuggestions: PropTypes.number,
  onCleanDatasetOverview: PropTypes.func.isRequired,
  onDatasetSearch: PropTypes.func.isRequired,
  onDetailLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSuggestionActivate: PropTypes.func.isRequired,
  onTextInput: PropTypes.func.isRequired,
  prefillQuery: PropTypes.string,
  query: PropTypes.string,
  queryFromUrl: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchContainer);
