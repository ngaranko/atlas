import React from 'react'
import { Checkbox, Label, RadioGroup, Radio } from '@datapunt/asc-ui'
import FilterBox from '../FilterBox'

export const TYPES = {
  check: 'check',
  radio: 'radio',
}

const SearchFilters = ({ availableFilters, activeFilters, setActiveFilters }) => {
  const { options, title, totalCount, type } = availableFilters
  const hasFilters = options && !!options.length

  const onChange = e => {
    const { value, checked } = e.target

    if (checked) {
      if (type === TYPES.check) {
        setActiveFilters([...activeFilters, value])
      } else {
        setActiveFilters([value])
      }
    } else {
      setActiveFilters(activeFilters.filter(filter => filter !== value))
    }
  }

  return (
    <FilterBox label={title}>
      {type === TYPES.radio ? (
        <RadioGroup name="group-2">
          {hasFilters && (
            <>
              <Label htmlFor="type:all" label={`Alles (${totalCount})`}>
                <Radio
                  checked
                  variant="primary"
                  value="all"
                  onChange={() => setActiveFilters([])}
                  id="type:all"
                />
              </Label>
              {options.map(({ label, id: filterType, count }) => (
                <Label
                  disabled={count === 0}
                  htmlFor={`type:${filterType}`}
                  label={`${label} (${count})`}
                >
                  <Radio
                    variant="primary"
                    value={filterType}
                    onChange={onChange}
                    id={`type:${filterType}`}
                  />
                </Label>
              ))}
            </>
          )}
        </RadioGroup>
      ) : (
        hasFilters &&
        options.map(({ label, type: filterType, count }) => (
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
      )}
    </FilterBox>
  )
}

SearchFilters.defaultProps = {
  filters: {},
}

export default SearchFilters
