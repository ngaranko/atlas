import React from 'react'
import PropTypes from 'prop-types'
import styled from '@datapunt/asc-core'
import { SearchBar, SearchBarToggle, BackDrop, showAboveBackDrop } from '@datapunt/asc-ui'

const StyledSearchBar = styled(SearchBar)`
  // ${({ showSuggestions }) => (showSuggestions ? showAboveBackDrop(true) : '')}
`

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
    const setBackDropFn = visible => setBackDrop(visible)

    if (showSuggestions && suggestions.length) {
      setBackDropFn(!!(showSuggestions && suggestions.length))
    }
  }, [showSuggestions, suggestions.length])

  return (
    <React.Fragment>
      <StyledSearchBar
        showAt="tabletM"
        inputProps={inputProps}
        {...searchBarProps}
        showSuggestions
      />
      <SearchBarToggle
        hideAt="tabletM"
        onOpen={onOpenSearchToggle}
        open={openSearchBarToggle}
        inputProps={inputProps}
        searchBarProps={searchBarProps}
        hasBackDrop
      />
      {showBackdrop && showSuggestions && (
        <BackDrop onClick={() => setBackDrop(false)} disablePortal />
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
