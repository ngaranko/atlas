import React from 'react';
import PropTypes from 'prop-types';

class AutoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestionIndex: -1,
      showSuggestions: false
    };

    this.clearQuery = this.clearQuery.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  clearQuery() {
    this.textInput.value = '';
    this.textInput.focus();
    this.props.onTextInput();
  }

  onBlur() {
    setTimeout(() => {
      this.setState({
        showSuggestions: false
      });
    }, 200);
  }

  onInput(event) {
    this.setState({
      showSuggestions: true
    });
    this.props.onTextInput(event);
  }

  onFocus(event) {
    this.setState({
      showSuggestions: true
    });
    if (this.props.suggestions.length < 1) {
      this.props.onTextInput(event);
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
      onSuggestSelection,
    } = this.props;

    return (
      <div>
        <div>
          {legendTitle && <legend className="u-sr-only">legendTitle</legend>}
          <div className="c-search-form__input-container">
            <label htmlFor={uniqueId} className="u-sr-only">zoek tekst</label>
            <input
              ref={(input) => { this.textInput = input; }}
              id={uniqueId}
              className={classNames}
              type="text"
              ng-model="query"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              placeholder={placeHolder}
              onInput={this.onInput}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              // ng-keydown="navigateSuggestions($event)"
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
        {suggestions.length > 0 && this.state.showSuggestions &&
          <div className="c-autocomplete">
            <h3 className="c-autocomplete__tip">Enkele suggesties</h3>
            {suggestions.map((category) =>
              (<div className="c-autocomplete__category" key={category.label + category.index}>
                <h4 className="c-autocomplete__category__heading qa-autocomplete-header">
                  {category.label}
                </h4>
                <ul>
                  {category.content.map((suggestion) =>
                    (<li key={suggestion._display + suggestion.index}>
                      <button
                        type="button"
                        className={`c-autocomplete__category__suggestion ${this.state.activeSuggestionIndex === suggestion.index ? 'c-autocomplete__category__suggestion--active' : ''}`}
                        onClick={() => { onSuggestSelection(suggestion); this.clearQuery(); }}
                        dangerouslySetInnerHTML={{ __html: suggestion._display }}
                      />
                    </li>)
                  )}
                </ul>
              </div>)
            )}
          </div>
        }
      </div>
    );
  }
}

AutoSuggest.propTypes = {
  onTextInput: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  legendTitle: PropTypes.string,
  uniqueId: PropTypes.string,
  classNames: PropTypes.string,
  suggestions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  query: PropTypes.string,
  onSuggestSelection: PropTypes.func.isRequired
};

AutoSuggest.defaultProps = {
  placeHolder: '',
  legendTitle: '',
  uniqueId: Date.now().toString(),
  classNames: '',
  suggestions: [],
  query: ''
};

export default AutoSuggest;
window.AutoSuggest = AutoSuggest;
