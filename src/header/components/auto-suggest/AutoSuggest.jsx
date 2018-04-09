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
      lastActionIsFormSubmit: false,
      showSuggestions: false,
      setPrefillQuery: true
    };
  }

  componentDidUpdate(prevProps) {
    const {
      activeSuggestion,
      isMapFullscreen,
      pageName,
      query
    } = this.props;

    // navigating from Home to the Map does not change the pageName
    // thats why we do an extra check for isMapFullscreen
    const isPageNavigation =
      prevProps.pageName !== pageName ||
      prevProps.isMapFullscreen !== isMapFullscreen;

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

    if (!this.state.lastActionIsFormSubmit && isPageNavigation) {
      this.clearQuery(false);
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
      lastActionIsFormSubmit: false,
      showSuggestions: true,
      setPrefillQuery: false
    });
  }

  onFocus() {
    const {
      onTextInput,
      suggestions,
      query
    } = this.props;

    this.setState({
      lastActionIsFormSubmit: false,
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
    const shouldOpenInNewWindow = event.ctrlKey || event.metaKey;

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
      lastActionIsFormSubmit: true,
      showSuggestions: false
    }, () => {
      this.resetActiveSuggestion();
      onSubmit();
    });

    setTimeout(() => {
      // reset the value of "lastActionIsFormSubmit"
      // to ensure that the inputfield is reset if the user navigates away
      // without interacting
      this.setState({
        lastActionIsFormSubmit: false
      });
    }, 200);
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

  clearQuery(shouldFocus = true) {
    const { onTextInput } = this.props;
    this.textInput.value = '';
    if (shouldFocus) {
      this.textInput.focus();
    }
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
      <form
        id="header-search"
        onSubmit={this.onFormSubmit}
        className={
          `auto-suggest__input
          ${showSuggestions && suggestions.length ? 'auto-suggest__backdrop' : ''}`
        }
      >
        <fieldset>
          {legendTitle && <legend className="u-sr-only">legendTitle</legend>}
          <div className="auto-suggest__input-container">
            <label htmlFor="auto-suggest-textinput" className="u-sr-only">zoektekst</label>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="auto-suggest__input-textinput"
              id="auto-suggest-textinput"
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
                className="qa-search-form__clear auto-suggest__input__clear"
                onClick={this.clearQuery}
                title="Wis zoektekst"
              >
                <ClearIcon />
                <span className="u-sr-only">Wis zoektekst</span>
              </button>
            }
          </div>
          {suggestions.length > 0 && showSuggestions &&
            <div className="auto-suggest__dropdown">
              <h3 className="auto-suggest__dropdown__tip">Enkele suggesties</h3>
              {suggestions.map((category) => (
                <AutoSuggestCategory
                  activeSuggestion={activeSuggestion}
                  category={category}
                  key={category.label}
                  onSuggestionSelection={this.onSuggestionSelection}
                  query={query}
                />)
              )}
            </div>
          }
          <button
            className="auto-suggest__input__submit qa-search-form-submit"
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
    category: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    uri: PropTypes.string
  }).isRequired,
  isMapFullscreen: PropTypes.bool.isRequired,
  legendTitle: PropTypes.string,
  numberOfSuggestions: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onSuggestionActivate: PropTypes.func.isRequired,
  onSuggestionSelection: PropTypes.func.isRequired,
  onTextInput: PropTypes.func.isRequired,
  pageName: PropTypes.string,
  placeHolder: PropTypes.string,
  query: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object)
};

AutoSuggest.defaultProps = {
  legendTitle: '',
  numberOfSuggestions: 0,
  pageName: '',
  placeHolder: '',
  query: '',
  suggestions: []
};

export default AutoSuggest;
window.AutoSuggest = AutoSuggest;
