import React from 'react'
import SearchFilter from '../../components/SearchFilter'
import { Filter } from '../../models'

interface SearchPageFiltersProps {
  filters: Filter[]
  totalCount: number
  hideCount: boolean
}

const SearchPageFilters: React.FC<SearchPageFiltersProps> = ({
  filters,
  totalCount,
  hideCount,
}) => {
  return (
    <>
      {filters.map(filter => (
        <SearchFilter
          key={filter.type}
          filter={filter}
          totalCount={totalCount}
          hideCount={hideCount}
        />
      ))}
    </>
  )
}

export default SearchPageFilters
