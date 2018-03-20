import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from '../../shared/components/autosuggest/AutoSuggest';
import getSharedConfig from '../../shared/services/shared-config/shared-config';
import ACTIONS from '../../shared/actions';
import { autosuggestDataService, getSuggestionByIndex } from './autosuggest-service';
import apiUrl from '../../shared/services/api';

const mockSuggestion = [
  {
    'content': [
      {
        '_display': 'Dam',
        'uri': 'bag/openbareruimte/03630000003186/'
      },
      {
        '_display': 'Damloperspad',
        'uri': 'bag/openbareruimte/03630000001038/'
      },
      {
        '_display': 'Damrak',
        'uri': 'bag/openbareruimte/03630000003187/'
      }
    ],
    'label': 'Straatnamen'
  },
  {
    'content': [
      {
        '_display': 'Damrak 1',
        'uri': 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/'
      },
      {
        '_display': 'Dam 10',
        'uri': 'monumenten/monumenten/aa3f9081-2ac4-49ea-95d2-0aad7aecd883/'
      },
      {
        '_display': 'Damrak 15',
        'uri': 'monumenten/monumenten/f93e31ba-89eb-4784-87e1-d32c33b5236d/'
      }
    ],
    'label': 'Monumenten'
  }
];

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
      });
      this.getSuggestions(event.target.value);
    }
  }

  onSuggestSelection(suggestion) {
    this.context.store.dispatch({
      type: ACTIONS.FETCH_DETAIL,
      payload: `${getSharedConfig().API_ROOT}${suggestion.uri}`
    });
  }

  getSuggestions(query) {
    // scope.activeSuggestionIndex = -1;
    // scope.originalQuery = scope.query;

    if (query.length > 1) {
      autosuggestDataService.search(query).then((suggestions) => {
        // Only load suggestions if they are still relevant.
        if (suggestions && suggestions.query === query) {
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

  render() {
    // const { inputId } = this.props;

    return (
      <div id={'header-search'}>
        <form className="c-search-form" ng-submit="query.trim() && formSubmit($event)">
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
