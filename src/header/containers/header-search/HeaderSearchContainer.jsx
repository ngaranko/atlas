import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setShowSuggestions,
  setActiveSuggestion,
  getSuggestions
} from '../../ducks/auto-suggest/auto-suggest';
import { fetchDetail } from '../../../reducers/details';
import { fetchDataSelection, fetchSearchResultsByQuery } from '../../../reducers/search';
import emptyFilters from '../../../shared/ducks/filters/filters';

import AutoSuggest from '../../components/auto-suggest/AutoSuggest';
import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';
import getSharedConfig from '../../../shared/services/shared-config/shared-config';

import './_search.scss';

const mapStateToProps = (state) => ({
  suggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.data : [],
  query: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.query : '',
  numberOfSuggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.count : 0,
  isDatasetView: state.dataSelection && state.dataSelection.view === 'CARDS',
  activeSuggestion: state.autoSuggest.activeSuggestion,
  showSuggestions: state.autoSuggest.showSuggestions
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchAll: fetchSearchResultsByQuery,
  searchDatasets: fetchDataSelection,
  toggleActiveSuggestion: setActiveSuggestion,
  toggleShowSuggestions: setShowSuggestions,
  goToDetail: fetchDetail,
  onTextInput: getSuggestions
}, dispatch);

class HeaderSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSuggestSelection = this.onSuggestSelection.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    if (window.opener && window.suggestionToLoadUri) {
      this.openDetailOnLoad();
    }
  }


  onSuggestSelection(suggestion, event) {
    const { suggestions } = this.props;
    event.preventDefault();
    event.stopPropagation();

    piwikTracker(['trackEvent', 'search', 'auto-suggest', suggestions.query , suggestion._display]);

    if (event.ctrlKey || event.metaKey) {
      const newWindow = window.open(`${window.location.href}`, '_blank');
      // setting uri to the window, as window.postMessage does not work for some reason
      // (webpack overrides the data it seems)
      newWindow.window.suggestionToLoadUri = suggestion.uri;
    } else {
      fetchDetail(`${getSharedConfig().API_ROOT}${suggestion.uri}`);
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      isDatasetView,
      activeSuggestion,
      numberOfSuggestions,
      query,
      searchAll,
      searchDatasets
    } = this.props;

    piwikTracker(['trackSiteSearch', query, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (!Object.keys(activeSuggestion).length) {
      // Load the search results
      emptyFilters();
      if (isDatasetView) {
        searchDatasets(query);
      } else {
        searchAll(query);
      }
    }
  }

  openDetailOnLoad() {
    const suggestionUri = window.suggestionToLoadUri;
    fetchDetail(`${getSharedConfig().API_ROOT}${suggestionUri}`);
    window.suggestionToLoadUri = undefined;
  }

  render() {
    const {
      suggestions,
      showSuggestions,
      numberOfSuggestions,
      activeSuggestion,
      onTextInput,
      query,
      toggleShowSuggestions,
      toggleActiveSuggestion
    } = this.props;

    return (
      <AutoSuggest
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        classNames={'c-search-form__input js-search-input qa-search-form-input'}
        uniqueId={'global-search'}
        legendTitle={'Data zoeken'}
        suggestions={suggestions}
        numberOfSuggestions={numberOfSuggestions}
        query={query}
        onTextInput={onTextInput}
        onSuggestSelection={this.onSuggestSelection}
        onKeyboardNavigation={toggleActiveSuggestion}
        activeSuggestion={activeSuggestion}
        showSuggestions={showSuggestions}
        setShowSuggestions={toggleShowSuggestions}
        onSubmit={this.onFormSubmit}
      />
    );
  }
}

HeaderSearchContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

HeaderSearchContainer.defaultProps = {
  searchQuery: '',
  suggestions: [],
  isDatasetView: false,
  numberOfSuggestions: 0,
  activeSuggestionIndex: -1,
  showSuggestions: false,
  activeSuggestion: {}
};

HeaderSearchContainer.propTypes = {
  query: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  numberOfSuggestions: PropTypes.number,
  isDatasetView: PropTypes.bool,
  showSuggestions: PropTypes.bool,
  activeSuggestionIndex: PropTypes.number,
  activeSuggestion: PropTypes.object, //eslint-disable-line
  onTextInput: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchContainer);
