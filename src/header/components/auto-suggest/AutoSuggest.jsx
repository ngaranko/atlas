import React from 'react';
import PropTypes from 'prop-types';

import './_auto-suggest.scss';

class AutoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.clearQuery = this.clearQuery.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.navigateSuggestions = this.navigateSuggestions.bind(this);
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

  navigateSuggestions(event) {
    const {
      setActiveSuggestion,
      activeSuggestionIndex,
      numberOfSuggestions,
      setShowSuggestions
    } = this.props;

    // Cancel outstanding requests, we don't want
    // suggestions to 'refresh' while navigating.
    switch (event.keyCode) {
      // Arrow up
      case 38:
        // By default the up arrow puts the cursor at the
        // beginning of the input, we don't want that!
        event.preventDefault();

        setActiveSuggestion(Math.max(activeSuggestionIndex - 1, -1));

        if (activeSuggestionIndex === -1) {
          // scope.query = scope.originalQuery;
        } else {
          this.setSuggestedQuery();
        }

        break;

      // Arrow down
      case 40:
        setActiveSuggestion(Math.min(activeSuggestionIndex + 1, numberOfSuggestions - 1));
        this.setSuggestedQuery();
        break;

      // Escape
      case 27:
        // scope.query = scope.originalQuery;
        setShowSuggestions(false);
        this.textInput.blur();
        break;

      default:
        break;
    }
  };

  setSuggestedQuery() {
    // console.log('asdsad')
    // scope.query = autocomplete.getSuggestionByIndex(
    //   suggestions,
    //   scope.activeSuggestionIndex
    // )._display;
  }

  clearQuery() {
    const { onTextInput } = this.props;
    this.textInput.value = '';
    this.textInput.focus();
    onTextInput();
  }

  render() {
    const {
      placeHolder,
      legendTitle,
      uniqueId,
      classNames,
      suggestions,
      query,
      onSuggestSelection,
      showSuggestions,
      activeSuggestionIndex,
      onSubmit
    } = this.props;

    return (
      <div>
        <div id="header-search">
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
                      <div
                        className="c-auto-suggest__category"
                        key={category.label + category.index}
                      >
                        <h4 className="c-auto-suggest__category__heading qa-auto-suggest-header">
                          {category.label}
                        </h4>
                        <ul>
                          {category.content.map((suggestion) =>
                            (
                              <li key={suggestion._display + suggestion.index}>
                                <button
                                  type="button"
                                  className={`c-auto-suggest__category__suggestion c-auto-suggest__category__suggestion--${activeSuggestionIndex === suggestion.index ? '' : 'in'}active`}
                                  onClick={
                                    (e) => { onSuggestSelection(suggestion, e); this.clearQuery(); }
                                  }
                                >
                                  <span> {suggestion._display} </span>
                                </button>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
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
                <span className="u-sr-only">Zoeken</span>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

AutoSuggest.propTypes = {
  placeHolder: PropTypes.string,
  classNames: PropTypes.string,
  uniqueId: PropTypes.string,
  legendTitle: PropTypes.string,
  onTextInput: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  numberOfSuggestions: PropTypes.number,
  query: PropTypes.string,
  onSuggestSelection: PropTypes.func.isRequired,
  setActiveSuggestion: PropTypes.func.isRequired,
  activeSuggestionIndex: PropTypes.number,
  showSuggestions: PropTypes.bool,
  setShowSuggestions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
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
