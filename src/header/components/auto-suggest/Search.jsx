import React from 'react';
import PropTypes from 'prop-types';
import { SearchBar, SearchBarToggle } from '@datapunt/asc-ui';
import { useAppReducer } from '../../../app/utils/useAppReducer';

const Search = ({
  showSuggestions,
  suggestions,
  searchBarProps
}) => {
  const [, actions] = useAppReducer('ui');

  const showBackdrop = !!(showSuggestions && suggestions.length);

  React.useEffect(() => {
    actions.setBackDrop({
      payload: showBackdrop
    });
  }, [showBackdrop]);

  return (
    <React.Fragment>
      <SearchBar
        showAt="tabletM"
        {...searchBarProps}
      />
      <SearchBarToggle
        hideAt="tabletM"
        {...searchBarProps}
      />
    </React.Fragment>
  );
};

Search.propTypes = {
  showSuggestions: PropTypes.bool.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  legendTitle: PropTypes.string.isRequired,
  searchBarProps: PropTypes.shape({}).isRequired,
  activeSuggestion: PropTypes.shape({}).isRequired,
  highlightQuery: PropTypes.string.isRequired,
  onSuggestionSelection: PropTypes.func.isRequired
};

export default Search;
