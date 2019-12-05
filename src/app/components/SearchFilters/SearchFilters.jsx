import React from 'react'
import { Checkbox, Label } from '@datapunt/asc-ui'
import FilterBox from '../FilterBox'

export const TYPES = {
  check: 'check',
  radio: 'radio',
}

const SearchFilters = ({ availableFilters, activeFilters, setActiveFilters }) => {
  const { filters, title, type } = availableFilters

  const onChange = e => {
    const { value, checked } = e.target

    if (checked) {
      setActiveFilters([...activeFilters, value])
    } else {
      setActiveFilters(activeFilters.filter(filter => filter !== value))
    }
  }

  return (
    <FilterBox
      label={title}
      subLabel={activeFilters.length > 0 && `${activeFilters.length} geselecteerd`}
      showMoreLabel="Toon meer"
    >
      {filters && filters.length
        ? filters.map(({ label, type: filterType, count }) => (
            <Label
              key={type}
              htmlFor={`type:${filterType}`}
              label={`${label} (${count})`}
              disabled={count === 0}
            >
              <Checkbox
                checked={activeFilters.includes(filterType)}
                onChange={onChange}
                id={`type:${filterType}`}
                value={filterType}
                variant="primary"
              />
            </Label>
          ))
        : null}
    </FilterBox>
  )
}

SearchFilters.defaultProps = {
  filters: {},
}

export default SearchFilters
