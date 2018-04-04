import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setActiveSuggestion,
  getSuggestions
} from '../../ducks/auto-suggest/auto-suggest';
import { fetchDetail } from '../../../reducers/details';
import { fetchDataSelection, fetchSearchResultsByQuery } from '../../../reducers/search';
import emptyFilters from '../../../shared/ducks/filters/filters';

import AutoSuggest from '../../components/auto-suggest/AutoSuggest';
import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';
import getSharedConfig from '../../../shared/services/shared-config/shared-config';

import './_search.scss';

const mapStateToProps = (state) => ({
  activeSuggestion: state.autoSuggest.activeSuggestion,
  isDatasetView: state.dataSelection && state.dataSelection.view === 'CARDS',
  numberOfSuggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.count : 0,
  query: state.autoSuggest.query,
  suggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.data : []
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  emptyFilters,
  fetchDataSelection,
  fetchDetail,
  fetchSearchResultsByQuery,
  getSuggestions,
  setActiveSuggestion
}, dispatch);

class HeaderSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    if (window.opener && window.suggestionToLoadUri) {
      // if user is sent here with a ctrl+click action
      // open the detail page
      this.openDetailOnLoad();
    }
  }

  componentWillMount() {
    /*
      if there is a query passed along the component
      (from url to state)
      do the initial call to set the state with this query
      this only needs to happen when the page is loaded, therefore in te componentWillMount()
    */
    if (this.props.prefillQuery.length) {
      this.props.getSuggestions(this.props.prefillQuery);
    }
  }

  onSuggestionSelection(suggestion, shouldOpenInNewWindow) {
    const { suggestions } = this.props;

    piwikTracker(['trackEvent', 'search', 'auto-suggest', suggestions.query, suggestion.label]);

    if (shouldOpenInNewWindow) {
      const newWindow = window.open(`${window.location.href}`, '_blank');
      // setting uri to the window, as window.postMessage does not work for some reason
      // (webpack overrides the data it seems)
      newWindow.window.suggestionToLoadUri = suggestion.uri;
    } else {
      this.props.fetchDetail(`${getSharedConfig().API_ROOT}${suggestion.uri}`);
    }
  }

  onFormSubmit() {
    const {
      activeSuggestion,
      isDatasetView,
      numberOfSuggestions,
      query
    } = this.props;

    piwikTracker(['trackSiteSearch', query, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (activeSuggestion.index === -1) {
      // Load the search results
      this.props.emptyFilters();
      if (isDatasetView) {
        this.props.fetchDataSelection(query);
      } else {
        this.props.fetchSearchResultsByQuery(query);
      }
    }
  }

  openDetailOnLoad() {
    // if user is sent here with a ctrl+click action
    // open the detail page
    const suggestionUri = window.suggestionToLoadUri;
    this.props.fetchDetail(`${getSharedConfig().API_ROOT}${suggestionUri}`);
    window.suggestionToLoadUri = undefined;
  }

  render() {
    const {
      activeSuggestion,
      numberOfSuggestions,
      query,
      suggestions
    } = this.props;

    return (
      <AutoSuggest
        activeSuggestion={activeSuggestion}
        legendTitle={'Data zoeken'}
        numberOfSuggestions={numberOfSuggestions}
        onSubmit={this.onFormSubmit}
        onSuggestionNavigation={this.props.setActiveSuggestion}
        onSuggestionSelection={this.onSuggestionSelection}
        onTextInput={this.props.getSuggestions}
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        query={query}
        suggestions={suggestions}
      />
    );
  }
}

HeaderSearchContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

HeaderSearchContainer.defaultProps = {
  activeSuggestion: {},
  isDatasetView: false,
  numberOfSuggestions: 0,
  prefillQuery: '',
  query: '',
  suggestions: []
};

HeaderSearchContainer.propTypes = {
  activeSuggestion: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fetchDataSelection: PropTypes.func.isRequired,
  fetchDetail: PropTypes.func.isRequired,
  fetchSearchResultsByQuery: PropTypes.func.isRequired,
  getSuggestions: PropTypes.func.isRequired,
  isDatasetView: PropTypes.bool,
  numberOfSuggestions: PropTypes.number,
  prefillQuery: PropTypes.string,
  query: PropTypes.string,
  setActiveSuggestion: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchContainer);
