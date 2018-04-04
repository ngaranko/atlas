import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggestItem from './AutoSuggestItem';

const AutoSuggestCategory = (props) => {
  const { category, activeSuggestion, query, onSuggestionSelection } = props;

  return (
    <div className="c-auto-suggest-category">
      <h4 className="c-auto-suggest-category__heading qa-auto-suggest-header">
        {category.label}
      </h4>
      <ul>
        {category.content.map((suggestion) =>
          (
            <AutoSuggestItem
              key={suggestion.label + suggestion.index}
              isActive={activeSuggestion && activeSuggestion.index === suggestion.index}
              onSuggestionSelection={(e) => {
                onSuggestionSelection(suggestion, e);
              }}
              content={suggestion.label}
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
  activeSuggestion: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  category: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onSuggestionSelection: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};


export default AutoSuggestCategory;
