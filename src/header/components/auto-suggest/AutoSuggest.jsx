import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggestCategory from './AutoSuggestCategory';
import returnPromise from '../../../shared/services/return-promise/return-promise'
import SearchIcon from '../../../../public/images/icon-search.svg';
import ClearIcon from '../../../../public/images/icon-clear.svg';

import './_auto-suggest.scss';

class AutoSuggest extends React.Component {
  static getSuggestionByIndex(searchResults, suggestionIndex) {
    return searchResults.reduce((flatResults, category) =>
      [...flatResults, ...category.content], [])
      .filter((suggestion, index) =>
        index === suggestionIndex
      )[0];
  }

  constructor(props) {
    super(props);
    this.clearQuery = this.clearQuery.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.navigateSuggestions = this.navigateSuggestions.bind(this);
    this.setSuggestedQuery = this.setSuggestedQuery.bind(this);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);
  }

  onBlur() {
    const { setShowSuggestions } = this.props;
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  }

  onInput(event) {
    const { setShowSuggestions, onTextInput } = this.props;
    onTextInput(event);
    setShowSuggestions(true);
  }

  onFocus(event) {
    const { setShowSuggestions, onTextInput, suggestions } = this.props;
    setShowSuggestions(true);
    if (!suggestions.length) {
      onTextInput(event);
    }
  }

  onSuggestionSelection(suggestion, event) {
    const { onSuggestSelection } = this.props;

    onSuggestSelection(suggestion, event, this.clearQuery);
  }

  setSuggestedQuery() {
    const { suggestions, activeSuggestionIndex, setActiveSuggestion } = this.props;
    const thisActiveSuggestion = AutoSuggest.getSuggestionByIndex(
      suggestions,
      activeSuggestionIndex
    );

    setActiveSuggestion(thisActiveSuggestion);

    this.textInput.value = thisActiveSuggestion._display;
  }

  clearQuery() {
    const { onTextInput } = this.props;
    this.textInput.value = '';
    this.textInput.focus();
    onTextInput();
  }

  navigateSuggestions(event) {
    const {
      setActiveSuggestionIndex,
      activeSuggestionIndex,
      numberOfSuggestions,
      setShowSuggestions,
      query,
      onSuggestSelection,
      activeSuggestion,
      showSuggestions
    } = this.props;

    switch (event.keyCode) {
      // Arrow up
      case 38:
        // By default the up arrow puts the cursor at the
        // beginning of the input, we don't want that!
        event.preventDefault();

        if (!showSuggestions || !numberOfSuggestions) {
          return;
        }

        returnPromise(setActiveSuggestionIndex, Math.max(activeSuggestionIndex - 1, -1))
          .then((setValue) => {
            if (setValue.index === -1) {
              this.textInput.value = query;
            } else {
              this.setSuggestedQuery();
            }
          });
        break;

      // Arrow down
      case 40:
        if (!showSuggestions || !numberOfSuggestions) {
          return;
        }
        returnPromise(
          setActiveSuggestionIndex,
          Math.min(activeSuggestionIndex + 1, numberOfSuggestions - 1)
        )
          .then(this.setSuggestedQuery);
        break;

      // Escape
      case 27:
        this.textInput.value = query;
        setShowSuggestions(false);
        this.textInput.blur();
        break;

      // Enter
      case 13:
        if (activeSuggestionIndex > -1) {
          onSuggestSelection(activeSuggestion, event, this.clearQuery);
        }
        break;

      default:
        break;
    }
  }

  render() {
    const {
      placeHolder,
      legendTitle,
      uniqueId,
      classNames,
      suggestions,
      query,
      showSuggestions,
      activeSuggestionIndex,
      onSubmit
    } = this.props;

    return (
      <div id="header-search" className={`${showSuggestions && suggestions.length ? 'c-auto-suggest__backdrop' : ''}`}>
        <form className="c-search-form" onSubmit={onSubmit}>
          <fieldset>
            <div>
              {legendTitle && <legend className="u-sr-only">legendTitle</legend>}
              <div className="c-search-form__input-container">
                <label htmlFor={uniqueId} className="u-sr-only">zoektekst</label>
                <input
                  ref={(input) => { this.textInput = input; }}
                  id={uniqueId}
                  className={classNames}
                  type="text"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder={placeHolder}
                  onInput={this.onInput}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onKeyDown={this.navigateSuggestions}
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
            </div>
            {suggestions.length > 0 && showSuggestions &&
              <div className="c-auto-suggest">
                <h3 className="c-auto-suggest__tip">Enkele suggesties</h3>
                {suggestions.map((category) =>
                  (
                    <AutoSuggestCategory
                      key={category.label + category.index}
                      category={category}
                      activeSuggestionIndex={activeSuggestionIndex}
                      query={query}
                      onSuggestionSelection={this.onSuggestionSelection}
                    />
                  )
                )}
              </div>
            }
            <button
              disabled={!query}
              className="c-search-form__submit qa-search-form-submit"
              type="submit"
              title="Zoeken"
            >
              <SearchIcon />
              <span className="u-sr-only">Zoeken</span>
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

AutoSuggest.propTypes = {
  placeHolder: PropTypes.string,
  classNames: PropTypes.string,
  uniqueId: PropTypes.string.isRequired,
  legendTitle: PropTypes.string,
  onTextInput: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  numberOfSuggestions: PropTypes.number,
  query: PropTypes.string,
  onSuggestSelection: PropTypes.func.isRequired,
  setActiveSuggestionIndex: PropTypes.func.isRequired,
  setActiveSuggestion: PropTypes.func.isRequired,
  activeSuggestionIndex: PropTypes.number,
  showSuggestions: PropTypes.bool,
  setShowSuggestions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  activeSuggestion: PropTypes.object.isRequired //eslint-disable-line
};

AutoSuggest.defaultProps = {
  placeHolder: '',
  legendTitle: '',
  uniqueId: Date.now().toString(),
  classNames: '',
  suggestions: [],
  numberOfSuggestions: 0,
  query: '',
  showSuggestions: false,
  activeSuggestionIndex: -1
};

export default AutoSuggest;
window.AutoSuggest = AutoSuggest;
