import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar, SearchBarToggle } from '@datapunt/asc-ui'
import { useAppReducer } from '../../../app/utils/useAppReducer'

const Search = ({ searchBarProps, openSearchBarToggle, onOpenSearchBarToggle, inputProps }) => {
  const [, actions] = useAppReducer('ui')

  const onOpenSearchToggle = open => {
    onOpenSearchBarToggle(open)

    actions.setBackDrop({
      payload: {
        open,
        key: 'search',
      },
    })
  }

  return (
    <React.Fragment>
      <SearchBar showAt="tabletM" inputProps={inputProps} {...searchBarProps} />
      <SearchBarToggle
        hideAt="tabletM"
        onOpen={onOpenSearchToggle}
        open={openSearchBarToggle}
        inputProps={inputProps}
        searchBarProps={searchBarProps}
      />
    </React.Fragment>
  )
}

Search.propTypes = {
  legendTitle: PropTypes.string.isRequired,
  searchBarProps: PropTypes.shape({}).isRequired,
  activeSuggestion: PropTypes.shape({}).isRequired,
  inputProps: PropTypes.shape({}).isRequired,
  highlightQuery: PropTypes.string.isRequired,
  onSuggestionSelection: PropTypes.func.isRequired,
  onOpenSearchBarToggle: PropTypes.func.isRequired,
  openSearchBarToggle: PropTypes.bool.isRequired,
}

export default Search
