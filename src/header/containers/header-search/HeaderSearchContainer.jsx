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
  suggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.data : [],
  query: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.query : '',
  numberOfSuggestions: state.autoSuggest.suggestions ? state.autoSuggest.suggestions.count : 0,
  isDatasetView: state.dataSelection && state.dataSelection.view === 'CARDS',
  activeSuggestion: state.autoSuggest.activeSuggestion
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSearchResultsByQuery,
  fetchDataSelection,
  setActiveSuggestion,
  fetchDetail,
  getSuggestions
}, dispatch);

class HeaderSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSuggestSelection = this.onSuggestSelection.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    if (window.opener && window.suggestionToLoadUri) {
      this.openDetailOnLoad();
    }
  }

  onSuggestSelection(suggestion, event) {
    event.preventDefault();
    event.stopPropagation();
    const { suggestions } = this.props;

    piwikTracker(['trackEvent', 'search', 'auto-suggest', suggestions.query , suggestion.label]);

    if (event.ctrlKey || event.metaKey) {
      const newWindow = window.open(`${window.location.href}`, '_blank');
      // setting uri to the window, as window.postMessage does not work for some reason
      // (webpack overrides the data it seems)
      newWindow.window.suggestionToLoadUri = suggestion.uri;
    } else {
      this.props.fetchDetail(`${getSharedConfig().API_ROOT}${suggestion.uri}`);
    }
  }

  onFormSubmit(event) {
    const {
      isDatasetView,
      activeSuggestion,
      numberOfSuggestions,
      query
    } = this.props;

    event.preventDefault();
    event.stopPropagation();

    piwikTracker(['trackSiteSearch', query, isDatasetView ? 'datasets' : 'data', numberOfSuggestions]);

    if (activeSuggestion.index === -1) {
      // Load the search results
      emptyFilters();
      if (isDatasetView) {
        this.props.fetchDataSelection(query);
      } else {
        this.props.fetchSearchResultsByQuery(query);
      }
    }
  }

  openDetailOnLoad() {
    const suggestionUri = window.suggestionToLoadUri;
    this.props.fetchDetail(`${getSharedConfig().API_ROOT}${suggestionUri}`);
    window.suggestionToLoadUri = undefined;
  }

  render() {
    const {
      suggestions,
      numberOfSuggestions,
      activeSuggestion,
      query
    } = this.props;

    return (
      <AutoSuggest
        placeHolder={'Zoek data op adres, postcode, kadastrale aanduiding, etc. Of datasets op trefwoord.'}
        classNames={'c-search-form__input js-search-input qa-search-form-input'}
        legendTitle={'Data zoeken'}
        suggestions={suggestions}
        numberOfSuggestions={numberOfSuggestions}
        query={query}
        onTextInput={this.props.getSuggestions}
        onSuggestSelection={this.onSuggestSelection}
        onSuggestionNavigation={this.props.setActiveSuggestion}
        activeSuggestion={activeSuggestion}
        onSubmit={this.onFormSubmit}
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
  query: PropTypes.string,
  setActiveSuggestion: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchContainer);
