import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggestWrapper from '../../wrappers/auto-suggest/AutoSuggestWrapper';
import getSharedConfig from '../../../shared/services/shared-config/shared-config';
import autoSuggestService from '../../services/auto-suggest/auto-suggest-service';

import './_search.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.searchQuery,
      suggestions: []
    };

    this.onTextInput = this.onTextInput.bind(this);
    this.onSuggestSelection = this.onSuggestSelection.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    if (window.opener && window.suggestionToLoadUri) {
      this.openDetailOnLoad();
    }
  }

  onTextInput(event) {
    const { onSearchInput, setSuggestions } = this.props;
    if (!event || event.target.value === '') {
      // clear
      onSearchInput();
      setSuggestions();
    } else {
      onSearchInput(event.target.value);
      // timeout to ensure the state has been set before the getSuggestions fn is called
      setTimeout(this.getSuggestions, 0, false);
    }
  }

  onSuggestSelection(suggestion, event) {
    const { fetchDetail, searchQuery } = this.props;
    event.preventDefault();
    event.stopPropagation();

    // eslint-disable-next-line no-underscore-dangle
    window._paq.push(['trackEvent', 'search', 'auto-suggest', searchQuery, suggestion._display]);

    if (event.ctrlKey || event.metaKey) {
      const newWindow = window.open(`${window.location.href}`, '_blank');
      // setting uri to the window, as window.postMessage does not work for some reason
      // (webpack overrides the data it seems)
      newWindow.window.suggestionToLoadUri = suggestion.uri;
    } else {
      fetchDetail(`${getSharedConfig().API_ROOT}${suggestion.uri}`);
      this.clearSuggestions();
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const { fetchDataSelection,
      fetchSearchResultsByQuery,
      isDatasetView,
      searchQuery,
      emptyFilters,
      numberOfSuggestions,
      activeSuggestionIndex
    } = this.props;

    // eslint-disable-next-line no-underscore-dangle
    window._paq.push(['trackSiteSearch', searchQuery, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (activeSuggestionIndex === -1) {
      // Load the search results
      emptyFilters();
      if (isDatasetView) {
        fetchDataSelection(searchQuery);
      } else {
        fetchSearchResultsByQuery(searchQuery);
      }
    }
    this.clearSuggestions();
  }

  getSuggestions() {
    const { searchQuery, setSuggestions, setActiveSuggestionIndex } = this.props;
    setActiveSuggestionIndex();

    this.setState({
      originalQuery: this.state.query
    });

    if (searchQuery.length > 1) {
      autoSuggestService.search(searchQuery).then((suggestions) => {
        if (suggestions && suggestions.query === searchQuery) {
          // Only load suggestions if they are still relevant.
          setSuggestions(suggestions.data, suggestions.count);
        }
      });
    } else {
      setSuggestions();
    }
  }

  clearSuggestions() {
    const { onSearchInput, setSuggestions, setActiveSuggestionIndex } = this.props;

    onSearchInput();
    setSuggestions();
    setActiveSuggestionIndex();
  }

  openDetailOnLoad() {
    const { fetchDetail } = this.props;
    const suggestionUri = window.suggestionToLoadUri;
    fetchDetail(`${getSharedConfig().API_ROOT}${suggestionUri}`);
    window.suggestionToLoadUri = null;
  }

  render() {
    const {
      suggestions,
      searchQuery,
      setActiveSuggestionIndex,
      activeSuggestionIndex,
      showSuggestions,
      setShowSuggestions,
      numberOfSuggestions,
      setActiveSuggestion,
      activeSuggestion
    } = this.props;

    return (
      <AutoSuggestWrapper
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        classNames={'c-search-form__input js-search-input qa-search-form-input'}
        uniqueId={'global-search'}
        legendTitle={'Data zoeken'}
        onTextInput={this.onTextInput}
        suggestions={suggestions}
        numberOfSuggestions={numberOfSuggestions}
        query={searchQuery}
        onSuggestSelection={this.onSuggestSelection}
        setActiveSuggestionIndex={setActiveSuggestionIndex}
        setActiveSuggestion={setActiveSuggestion}
        activeSuggestionIndex={activeSuggestionIndex}
        activeSuggestion={activeSuggestion}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        onSubmit={this.onFormSubmit}
      />
    );
  }
}

Search.propTypes = {
  searchQuery: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  numberOfSuggestions: PropTypes.number,
  onSearchInput: PropTypes.func.isRequired,
  setSuggestions: PropTypes.func.isRequired,
  fetchDetail: PropTypes.func.isRequired,
  fetchDataSelection: PropTypes.func.isRequired,
  fetchSearchResultsByQuery: PropTypes.func.isRequired,
  emptyFilters: PropTypes.func.isRequired,
  isDatasetView: PropTypes.bool,
  showSuggestions: PropTypes.bool,
  activeSuggestionIndex: PropTypes.number,
  setActiveSuggestionIndex: PropTypes.func.isRequired,
  setActiveSuggestion: PropTypes.func.isRequired,
  setShowSuggestions: PropTypes.func.isRequired,
  activeSuggestion: PropTypes.object //eslint-disable-line
};

Search.defaultProps = {
  searchQuery: '',
  suggestions: [],
  isDatasetView: false,
  numberOfSuggestions: 0,
  activeSuggestionIndex: -1,
  showSuggestions: false,
  activeSuggestion: {}
};


Search.contextTypes = {
  store: PropTypes.object.isRequired
};

export default Search;
