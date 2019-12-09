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

  let Wrapper = React.Fragment
  let WrapperProps = {}
  let RadioOrCheckbox = Checkbox

  if (type === TYPES.radio) {
    Wrapper = RadioGroup
    WrapperProps = {
      name: `radio-group-${title.toLowerCase()}`,
    }

    RadioOrCheckbox = Radio
  }

  return (
    <FilterBox label={title}>
      <Wrapper {...WrapperProps}>
        {hasFilters && (
          <>
            {type === TYPES.radio && (
              <Label htmlFor="type:all" label={`Alles (${totalCount})`}>
                <Radio
                  checked={!activeFilters.length}
                  variant="primary"
                  value="all"
                  onChange={() => setActiveFilters([])}
                  id="type:all"
                />
              </Label>
            )}
            {options.map(({ label, id, count }) => (
              <Label
                key={id}
                tabIndex={-1}
                disabled={count === 0}
                htmlFor={`type:${id}`}
                label={`${label} (${count})`}
              >
                <RadioOrCheckbox
                  checked={activeFilters.includes(id)}
                  variant="primary"
                  value={id}
                  onChange={onChange}
                  id={`type:${id}`}
                />
              </Label>
            ))}
          </>
        )}
      </Wrapper>
    </FilterBox>
  )
}

SearchFilters.defaultProps = {
  filters: {},
}

export default SearchFilters
