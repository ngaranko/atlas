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

    const newFilter = type
      ? {
          type,
          values: [value],
        }
      : {
          type: 'default',
          value,
        }

    if (checked) {
      if (ui === TYPES.check) {
        let newFilters = {}
        console.log(activeFilters)
        if (Object.entries(activeFilters).length) {
          newFilters = Object.entries(activeFilters).reduce(
            (acc, [filterType, filters]) => ({
              ...acc,
              [filterType]: [...filters, value],
            }),
            {},
          )
        } else {
          newFilters = { [type]: [value] }
        }

        setActiveFilters(newFilters)
      } else {
        setActiveFilters([newFilter])
      }
    } else {
      setActiveFilters(activeFilters.filter(filter => filter.value !== value))
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
                  checked={!activeFilters.length}
                  variant="primary"
                  value="all"
                  onChange={() => setActiveFilters({})}
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
                  checked={activeFilters[type].values.includes(id)}
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
