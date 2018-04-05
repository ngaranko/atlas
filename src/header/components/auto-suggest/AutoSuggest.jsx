import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggestCategory from './AutoSuggestCategory';
import SearchIcon from '../../../../public/images/icon-search.svg';
import ClearIcon from '../../../../public/images/icon-clear.svg';

import './_auto-suggest.scss';

class AutoSuggest extends React.Component {
  static getSuggestionByIndex(searchResults, suggestionIndex) {
    return searchResults
      .reduce((flatResults, category) =>
        [...flatResults, ...category.content], [])
      .find((flatSuggestion) =>
        flatSuggestion.index === suggestionIndex
      );
  }

  constructor(props) {
    super(props);
    this.clearQuery = this.clearQuery.bind(this);
    this.navigateSuggestions = this.navigateSuggestions.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);

    this.state = {
      showSuggestions: false,
      setPrefillQuery: true
    };
  }

  componentDidUpdate() {
    const { activeSuggestion, query } = this.props;
    if (activeSuggestion.index > -1) {
      this.textInput.value = activeSuggestion.label;
    }

    if (this.state.setPrefillQuery && query.length) {
      /*
        if the prefillQuery is passed to the parent container
        a initial call is done.
        Because of that, the query in the state is being updated
        we need to update the input value according to this query
        this cannot be done in the componentWill/DidMount of Autosuggest, as
        is is being registred as an update.

        The setPrefillQuery in the componentstate is reset as soon
        as the user interacts with the inputfield
      */
      this.textInput.value = query;
    }
  }

  onBlur() {
    setTimeout(() => {
      this.setState({
        showSuggestions: false
      });
    }, 200);
  }

  onInput(event) {
    const { onTextInput } = this.props;
    event.persist();
    this.resetActiveSuggestion();
    onTextInput(event.target.value);

    this.setState({
      showSuggestions: true,
      setPrefillQuery: false
    });
  }

  onFocus() {
    const { onTextInput, suggestions, query } = this.props;
    this.setState({
      showSuggestions: true,
      setPrefillQuery: false
    });
    if (query.length && !suggestions.length) {
      onTextInput(query);
    }
  }

  onSuggestionSelection(suggestion, event) {
    const { onSuggestionSelection } = this.props;
    event.preventDefault();
    event.stopPropagation();
    let shouldOpenInNewWindow = false;
    if (event.ctrlKey || event.metaKey) {
      shouldOpenInNewWindow = true;
    }

    onSuggestionSelection(suggestion, shouldOpenInNewWindow);
    if (!shouldOpenInNewWindow) {
      this.clearQuery();
      this.textInput.blur();
    }
  }

  onFormSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      showSuggestions: false
    });

    this.resetActiveSuggestion();

    onSubmit();
  }

  navigateSuggestions(event) {
    const {
      activeSuggestion,
      numberOfSuggestions,
      onSuggestionActivate,
      query,
      suggestions
    } = this.props;
    const { showSuggestions } = this.state;

    switch (event.keyCode) {
      // Arrow up
      case 38:
        // By default the up arrow puts the cursor at the
        // beginning of the input, we don't want that!
        event.preventDefault();
        if (!showSuggestions || !numberOfSuggestions) {
          return;
        }

        if (activeSuggestion.index === 0) {
          // if user is on first suggestion and navigates up,
          // the user goes back to the inputfield
          this.textInput.value = query;
        }
        onSuggestionActivate(
          AutoSuggest.getSuggestionByIndex(
            suggestions,
            Math.max(activeSuggestion.index - 1, -1)
          )
        );
        break;
      // Arrow down
      case 40:
        if (!showSuggestions || !numberOfSuggestions) {
          return;
        }
        onSuggestionActivate(
          AutoSuggest.getSuggestionByIndex(
            suggestions,
            Math.min(activeSuggestion.index + 1, numberOfSuggestions - 1)
          )
        );
        break;
      // Escape
      case 27:
        this.textInput.value = query;
        this.setState({
          showSuggestions: false
        });
        this.textInput.blur();
        break;
      // Enter
      case 13:
        if (activeSuggestion.index > -1) {
          this.onSuggestionSelection(activeSuggestion, event);
        }
        break;
      default:
        break;
    }
  }

  clearQuery() {
    const { onTextInput } = this.props;
    this.textInput.value = '';
    this.textInput.focus();
    this.resetActiveSuggestion();
    this.setState({
      showSuggestions: false
    });
    onTextInput();
  }

  resetActiveSuggestion() {
    // wrapper function to improve readability
    const { onSuggestionActivate } = this.props;
    onSuggestionActivate();
  }

  render() {
    const {
      activeSuggestion,
      legendTitle,
      placeHolder,
      query,
      suggestions,
    } = this.props;
    const { showSuggestions } = this.state;

    return (
      <form id="header-search" onSubmit={this.onFormSubmit} className={`c-search-form ${showSuggestions && suggestions.length ? 'c-auto-suggest__backdrop' : ''}`}>
        <fieldset>
          {legendTitle && <legend className="u-sr-only">legendTitle</legend>}
          <div className="c-search-form-container">
            <label htmlFor="auto-suggest-input" className="u-sr-only">zoektekst</label>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="c-search-form-input"
              id="auto-suggest-input"
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onInput={this.onInput}
              onKeyDown={this.navigateSuggestions}
              placeholder={placeHolder}
              ref={(input) => { this.textInput = input; }}
              spellCheck="false"
              type="text"
            />

            {query &&
              <button
                type="button"
                className="qa-search-form__clear c-search-form__clear"
                onClick={this.clearQuery}
                title="Wis zoektekst"
              >
                <ClearIcon />
                <span className="u-sr-only">Wis zoektekst</span>
              </button>
            }
          </div>
          {suggestions.length > 0 && showSuggestions &&
            <div className="c-auto-suggest">
              <h3 className="c-auto-suggest__tip">Enkele suggesties</h3>
              {suggestions.map((category) => (
                <AutoSuggestCategory
                  activeSuggestion={activeSuggestion}
                  category={category}
                  key={category.label + category.index}
                  onSuggestionSelection={this.onSuggestionSelection}
                  query={query}
                />)
              )}
            </div>
          }
          <button
            className="c-search-form__submit qa-search-form-submit"
            disabled={!query}
            title="Zoeken"
            type="submit"
          >
            <SearchIcon />
            <span className="u-sr-only">Zoeken</span>
          </button>
        </fieldset>
      </form>
    );
  }
}

AutoSuggest.propTypes = {
  activeSuggestion: PropTypes.shape({
    uri: PropTypes.string,
    label: PropTypes.string,
    index: PropTypes.number,
    category: PropTypes.string
  }).isRequired,
  legendTitle: PropTypes.string,
  numberOfSuggestions: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onSuggestionSelection: PropTypes.func.isRequired,
  onTextInput: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  query: PropTypes.string,
  onSuggestionActivate: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object)
};

AutoSuggest.defaultProps = {
  legendTitle: '',
  numberOfSuggestions: 0,
  placeHolder: '',
  query: '',
  suggestions: []
};

export default AutoSuggest;
window.AutoSuggest = AutoSuggest;
