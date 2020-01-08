import React from 'react'
import SearchFilters from './SearchFiltersContainer'

const EditorialFilters = ({ filters }) =>
  filters && filters.length > 0 ? (
    <>
      {filters.map(filter => (
        <SearchFilters hideCount availableFilters={filter} type={filter.type} key={filter.type} />
      ))}
    </>
  ) : null

export default React.memo(EditorialFilters)
