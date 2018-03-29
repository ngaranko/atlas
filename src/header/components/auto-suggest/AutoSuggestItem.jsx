import React from 'react';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import ArrowRightIcon from '../../../../public/images/icon-arrow-right.svg';

const AutoSuggestItem = (props) => {
  const { isActive, onSuggestionSelection, query } = props;

  return (
    <li>
      <button
        type="button"
        className={`c-auto-suggest__category__suggestion ${isActive ? 'c-auto-suggest__category__suggestion--active' : ''}`}
        onClick={onSuggestionSelection}
      >
        <span className="icon">
          <ArrowRightIcon />
        </span>
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: props.content.replace(new RegExp(`(${escapeStringRegexp(query)})`, 'gi'), '<span class="c-auto-suggest__highlight">$1</span>')
          }}
        />
      </button>
    </li>
  );
};

AutoSuggestItem.defaultProps = {
  isActive: false
};

AutoSuggestItem.propTypes = {
  isActive: PropTypes.bool,
  onSuggestionSelection: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
};


export default AutoSuggestItem;
