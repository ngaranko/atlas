import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getSuggestions,
  setActiveSuggestion
} from '../../ducks/auto-suggest/auto-suggest';

import AutoSuggest from '../../components/auto-suggest/AutoSuggest';
import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';
import { emptyFilters } from '../../../shared/ducks/filters/filters';
import { isMapCurrentPage, isCatalogCurrentPage } from '../../../reducers/current-page-reducer';
import { extractIdEndpoint, routing } from '../../../app/routes';

const mapStateToProps = (state) => ({
  activeSuggestion: state.autoSuggest.activeSuggestion,
  displayQuery: state.autoSuggest.displayQuery,
  isDatasetView: isCatalogCurrentPage(state),
  isMapActive: isMapCurrentPage(state),
  numberOfSuggestions: state.autoSuggest.count,
  pageName: state.page ? state.page.name : '',
  prefillQuery: state.search ? state.search.query : state.dataSelection ? state.dataSelection.query : '',
  suggestions: state.autoSuggest.suggestions,
  typedQuery: state.autoSuggest.typedQuery
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    onCleanDatasetOverview: emptyFilters,
    onGetSuggestions: getSuggestions,
    onSuggestionActivate: setActiveSuggestion
  }, dispatch),
  onDatasetSearch: (query) => dispatch({ type: routing.searchCatalog.type, payload: { query } }),
  onSearch: (query) => dispatch({ type: routing.searchData.type, payload: { query } }),
  openSuggestion: (suggestion) => { // eslint-disable-line consistent-return
    if (suggestion.uri.match(/^dcatd\//)) {
      const id = extractIdEndpoint(suggestion.uri);
      return dispatch({ type: routing.catalogusDetail.type, payload: { id } });
    }
    console.log('unkown other suggestion type', suggestion.category); // eslint-disable-line no-console
  }
});

class HeaderSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSuggestionActivate = this.onSuggestionActivate.bind(this);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
  }

  componentDidMount() {
    const {
      onGetSuggestions,
      prefillQuery
    } = this.props;

    if (prefillQuery) {
      onGetSuggestions(prefillQuery);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isMapActive,
      onGetSuggestions,
      pageName,
      prefillQuery
    } = this.props;

    const doResetQuery =
      prevProps.isMapActive !== isMapActive ||
      prevProps.pageName !== pageName;

    // on navigation, clear auto-suggest
    if (doResetQuery && !prefillQuery) {
      onGetSuggestions();
    } else if (prevProps.prefillQuery !== prefillQuery) {
      // if the user ends up on a search page, set prefillQuery
      onGetSuggestions(prefillQuery);
    }
  }

  onSuggestionActivate(suggestion) {
    const {
      onSuggestionActivate,
      onGetSuggestions,
      typedQuery
    } = this.props;

    if (suggestion && suggestion.index === -1) {
      onGetSuggestions(typedQuery);
    }
    onSuggestionActivate(suggestion);
  }

  onSuggestionSelection(suggestion, shouldOpenInNewWindow) {
    const {
      typedQuery
    } = this.props;

    piwikTracker(['trackEvent', 'auto-suggest', suggestion.category, typedQuery]);

    if (shouldOpenInNewWindow) {
      // const newWindow = window.open(`${window.location.href}`, '_blank');
      // // setting uri to the window, as window.postMessage does not work for some reason
      // // (webpack overrides the data it seems)
      // newWindow.window.suggestionToLoadUri = suggestion.uri;
    } else {
      this.props.openSuggestion(suggestion);
    }
  }

  onFormSubmit() {
    const {
      activeSuggestion,
      isDatasetView,
      numberOfSuggestions,
      typedQuery
    } = this.props;

    piwikTracker(['trackSiteSearch', typedQuery, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (activeSuggestion.index === -1) {
      // Load the search results
      this.props.onCleanDatasetOverview();
      if (isDatasetView) {
        this.props.onDatasetSearch(typedQuery);
      } else {
        this.props.onSearch(typedQuery);
      }
    }
  }

  onUserInput(query) {
    const {
      onGetSuggestions
    } = this.props;

    onGetSuggestions(query);
  }

  render() {
    const {
      activeSuggestion,
      displayQuery,
      numberOfSuggestions,
      suggestions,
      typedQuery
    } = this.props;

    return (
      <AutoSuggest
        activeSuggestion={activeSuggestion}
        highlightQuery={typedQuery}
        legendTitle={'Data zoeken'}
        numberOfSuggestions={numberOfSuggestions}
        onSubmit={this.onFormSubmit}
        onSuggestionActivate={this.onSuggestionActivate}
        onSuggestionSelection={this.onSuggestionSelection}
        onTextInput={this.onUserInput}
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        query={displayQuery || typedQuery}
        suggestions={suggestions}
      />
    );
  }
}

HeaderSearchContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

HeaderSearchContainer.defaultProps = {
  activeSuggestion: {
    index: -1
  },
  displayQuery: '',
  isDatasetView: false,
  numberOfSuggestions: 0,
  pageName: '',
  prefillQuery: '',
  suggestions: [],
  typedQuery: ''
};

HeaderSearchContainer.propTypes = {
  activeSuggestion: PropTypes.shape({
    category: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    uri: PropTypes.string
  }),
  displayQuery: PropTypes.string,
  isDatasetView: PropTypes.bool,
  isMapActive: PropTypes.bool.isRequired,
  numberOfSuggestions: PropTypes.number,
  onCleanDatasetOverview: PropTypes.func.isRequired,
  onDatasetSearch: PropTypes.func.isRequired,
  openSuggestion: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSuggestionActivate: PropTypes.func.isRequired,
  pageName: PropTypes.string,
  prefillQuery: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  typedQuery: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchContainer);
