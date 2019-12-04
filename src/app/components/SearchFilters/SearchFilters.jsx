import React from 'react'
import { Checkbox, Label } from '@datapunt/asc-ui'
import FilterBox from '../FilterBox'

const SearchFilters = ({ filters: propFilters, onFilter }) => {
  const [activeFilters, setActiveFilters] = React.useState([])
  const { filters, title } = propFilters

  const onChange = e => {
    const { value, checked } = e.target

    if (checked) {
      setActiveFilters([...activeFilters, value])
    } else {
      setActiveFilters(activeFilters.filter(filter => filter !== value))
    }
  }

  React.useEffect(() => {
    onFilter(activeFilters)
  }, [activeFilters, onFilter])

  return (
    <FilterBox
      label={title}
      subLabel={activeFilters.length > 0 && `${activeFilters.length} geselecteerd`}
      showMoreLabel="Toon meer"
    >
      {filters && filters.length
        ? filters.map(({ label, type, count }) => (
            <Label
              key={type}
              htmlFor={`type:${type}`}
              label={`${label} (${count})`}
              disabled={count === 0}
            >
              <Checkbox onChange={onChange} id={`type:${type}`} value={type} variant="primary" />
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
