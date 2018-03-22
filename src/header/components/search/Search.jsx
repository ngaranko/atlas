import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggestWrapper from '../../wrappers/auto-suggest/AutoSuggestWrapper';
import getSharedConfig from '../../../shared/services/shared-config/shared-config';
import ACTIONS from '../../../shared/actions';
import autoSuggestService from '../../services/auto-suggest/auto-suggest-service';
import getState from '../../../shared/services/redux/get-state';
import piwik from '../../../shared/services/piwik/piwik';

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
  }

  onTextInput(event) {
    const { onSearchInput } = this.props;
    if (!event || event.target.value === '') {
      // clear
      this.setState({
        query: '',
        suggestions: []
      });
    } else {
      onSearchInput(event.target.value);
      // timeout to ensure the state has been set before the getSuggestions fn is called
      setTimeout(this.getSuggestions, 0, true);
    }
  }

  onSuggestSelection(suggestion) {
    this.context.store.dispatch({
      type: ACTIONS.FETCH_DETAIL,
      payload: `${getSharedConfig().API_ROOT}${suggestion.uri}`
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const currentViewState = getState();
    const isDatasetView = currentViewState.dataSelection && currentViewState.dataSelection.view === 'CARDS';

    piwik.push(['trackSiteSearch', this.state.query, isDatasetView ? 'datasets' : 'data', this.state.numberOfSuggestions]);

    if (this.state.activeSuggestionIndex === -1) {
      // Load the search results
      this.context.store.dispatch({
        type: ACTIONS.EMPTY_FILTERS
      });

      this.context.store.dispatch({
        type: isDatasetView ? ACTIONS.FETCH_DATA_SELECTION : ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: this.state.query
      });
      this.clearSuggestions();
    } else {
      const activeSuggestion = autoSuggestService.getSuggestionByIndex(
        this.state.suggestions,
        this.state.activeSuggestionIndex
      );

      this.onSuggestSelection(activeSuggestion);
    }
  }

  getSuggestions() {
    const { searchQuery } = this.props;

    this.setState({
      activeSuggestionIndex: -1,
      originalQuery: this.state.query
    });

    if (searchQuery.length > 1) {
      autoSuggestService.search(searchQuery).then((suggestions) => {
        if (suggestions && suggestions.query === searchQuery) {
          // Only load suggestions if they are still relevant.
          this.setState({
            suggestions: suggestions.data,
            numberOfSuggestions: suggestions.count
          });
        }
      });
    } else {
      this.setState({
        suggestions: [],
        numberOfSuggestions: 0
      });
    }
  }

  clearSuggestions() {
    this.setState({
      suggestions: [],
      numberOfSuggestions: 0,
      activeSuggestionIndex: -1,
      // originalQuery: '' // TODO: scope._display
    });
  }

  render() {
    return (
      <div id="header-search">
        <form className="c-search-form" onSubmit={this.onFormSubmit}>
          <fieldset>
            <AutoSuggestWrapper
              placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
              classNames={'c-search-form__input js-search-input qa-search-form-input'}
              uniqueId={'global-search'}
              legendTitle={'Data zoeken'}
              onTextInput={this.onTextInput}
              suggestions={this.state.suggestions}
              query={this.state.query}
              onSuggestSelection={this.onSuggestSelection}
            />
            <button
              disabled={!this.state.query}
              className="c-search-form__submit qa-search-form-submit"
              type="submit"
              title="Zoeken"
            >
              <span className="u-sr-only">Zoeken</span>
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchQuery: PropTypes.string,
  onSearchInput: PropTypes.func.isRequired
};

Search.defaultProps = {
  searchQuery: ''
};


Search.contextTypes = {
  store: PropTypes.object.isRequired
};

export default Search;
