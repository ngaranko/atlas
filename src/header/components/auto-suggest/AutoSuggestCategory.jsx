import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggestItem from './AutoSuggestItem';

const AutoSuggestCategory = (props) => {
  const { category, activeSuggestion, query, onSuggestionSelection } = props;

  return (
    <div className="c-auto-suggest__category">
      <h4 className="c-auto-suggest__category__heading qa-auto-suggest-header">
        {category.label}
      </h4>
      <ul>
        {category.content.map((suggestion) =>
          (
            <AutoSuggestItem
              key={suggestion._display + suggestion.index}
              isActive={activeSuggestion && activeSuggestion.index === suggestion.index}
              onSuggestionSelection={(e) => {
                onSuggestionSelection(suggestion, e);
              }}
              content={suggestion._display}
              query={query}
            />
          )
        )}
      </ul>
    </div>
  );
};

AutoSuggestCategory.defaultProps = {
};

AutoSuggestCategory.propTypes = {
  category: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  activeSuggestion: PropTypes.object,
  query: PropTypes.string.isRequired,
  onSuggestionSelection: PropTypes.func.isRequired
};


export default AutoSuggestCategory;
