import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar, SearchBarToggle, Portal, BackDrop } from '@datapunt/asc-ui'

const Search = ({
  showSuggestions,
  suggestions,
  searchBarProps,
  openSearchBarToggle,
  onOpenSearchBarToggle,
  inputProps,
}) => {
  const [showBackdrop, setBackDrop] = React.useState(!!(showSuggestions && suggestions.length))

  const onOpenSearchToggle = open => {
    onOpenSearchBarToggle(open)
  }

  React.useEffect(() => {
    const setBackDropFn = val => setBackDrop(val)

    if (showSuggestions && suggestions.length) {
      setBackDropFn(!!(showSuggestions && suggestions.length))
    }
  }, [showSuggestions, suggestions.length])

  return (
    <React.Fragment>
      <SearchBar showAt="tabletM" inputProps={inputProps} {...searchBarProps} />
      <SearchBarToggle
        hideAt="tabletM"
        onOpen={onOpenSearchToggle}
        open={openSearchBarToggle}
        inputProps={inputProps}
        searchBarProps={searchBarProps}
        hasBackDrop
      />
      {showBackdrop && showSuggestions && (
        <Portal>
          <BackDrop onClick={() => setBackDrop(false)} />
        </Portal>
      )}
    </React.Fragment>
  )
}

Search.propTypes = {
  showSuggestions: PropTypes.bool.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchBarProps: PropTypes.shape({}).isRequired,
  inputProps: PropTypes.shape({}).isRequired,
  onOpenSearchBarToggle: PropTypes.func.isRequired,
  openSearchBarToggle: PropTypes.bool.isRequired,
}

export default Search
