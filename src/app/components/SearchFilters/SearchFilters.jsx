import React from 'react'
import { Checkbox, Label, RadioGroup, Radio } from '@datapunt/asc-ui'
import FilterBox from '../FilterBox'

export const TYPES = {
  check: 'check',
  radio: 'radio',
}

const SearchFilters = ({ availableFilters, activeFilters, setActiveFilters, type }) => {
  const { options, title, totalCount, ui } = availableFilters

  const hasFilters = options && !!options.length
  const onChange = e => {
    const { value, checked } = e.target

    if (checked) {
      // Add
      setActiveFilters({
        type,
        filters: ui === TYPES.check ? [...(activeFilters || []), value] : [value],
      })
    } else {
      // Remove
      setActiveFilters({
        type,
        filters: ui === TYPES.check ? activeFilters.filter(filter => filter !== value) : [],
      })
    }
  }

  let Wrapper = React.Fragment
  let WrapperProps = {}
  let RadioOrCheckbox = Checkbox

  if (ui === TYPES.radio) {
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
            {ui === TYPES.radio && (
              <Label htmlFor="type:all" label={`Alles (${totalCount})`}>
                <Radio
                  checked={!activeFilters}
                  variant="primary"
                  value="all"
                  onChange={() =>
                    setActiveFilters({
                      type,
                      filters: [],
                    })
                  }
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
                  checked={activeFilters ? activeFilters.includes(id) : false}
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

export default SearchFilters
