import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from '../../shared/components/autosuggest/AutoSuggest';
import getSharedConfig from '../../shared/services/shared-config/shared-config';
import ACTIONS from '../../shared/actions';
import autosuggestDataService from './autosuggest-service';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      suggestions: ''
    };
    this.onTextInput = this.onTextInput.bind(this);
    this.onSuggestSelection = this.onSuggestSelection.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
  }

  onTextInput(event) {
    if (!event || event.target.value === '') {
      // clear
      this.setState({
        suggestions: [],
        query: ''
      });
    } else {
      this.setState({
        query: event.target.value
      }, this.getSuggestions);
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

    if (this.state.activeSuggestionIndex === -1) {
      // Load the search results
      this.context.store.dispatch({
        type: ACTIONS.EMPTY_FILTERS
      });

      this.context.store.dispatch({
        // TODO do correct implementation of type
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: this.state.query.trim()
      });

      this.clearSuggestions();

    } else {
      const activeSuggestion = autosuggestDataService.getSuggestionByIndex(
        this.state.suggestions,
        this.state.activeSuggestionIndex
      );

      this.onSuggestSelection(activeSuggestion);
    }
  }

  getSuggestions() {
    this.setState({
      activeSuggestionIndex: -1,
      originalQuery: this.state.query
    });

    if (this.state.query.length > 1) {
      autosuggestDataService.search(this.state.query).then((suggestions) => {
        if (suggestions && suggestions.query === this.state.query) {
          // Only load suggestions if they are still relevant.
          this.setState({
            suggestions: suggestions.data
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
      <div id={'header-search'}>
        <form className="c-search-form" onSubmit={this.onFormSubmit}>
          <fieldset>
            <AutoSuggest
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
              disabled={!this.state.query.trim()}
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
  query: PropTypes.string
};

Search.defaultProps = {
  query: ''
};


Search.contextTypes = {
  store: PropTypes.object.isRequired
};

export default Search;
