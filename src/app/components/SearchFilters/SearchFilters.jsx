import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Label, RadioGroup, Radio } from '@datapunt/asc-ui'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import FilterBox from '../FilterBox'
import {
  addActiveFilter,
  getActiveFilters,
  removeActiveFilter,
  removeAllActiveFilters,
} from '../../pages/SearchPage/SearchPageDucks'

export const TYPES = {
  check: 'check',
  radio: 'radio',
}

const SearchFilters = ({ availableFilters, hideCount }) => {
  const { options, label, totalCount, filterType, type } = availableFilters
  const dispatch = useDispatch()
  const activeFilters = useSelector(getActiveFilters)
  const { trackEvent } = useMatomo()

  const currentFilters = (activeFilters.find(({ type: _type }) => type === _type) || {}).values

  const hasFilters = options && !!options.length
  const isRadio = filterType === 'string'

  const onChange = e => {
    const { value, checked } = e.target

    if (checked) {
      trackEvent({
        category: 'search',
        action: 'enable-filter',
        name: `${type}-${value}`,
      })
      dispatch(addActiveFilter(type, value, isRadio))
    } else {
      trackEvent({
        category: 'search',
        action: 'disable-filter',
        name: `${type}-${value}`,
      })
      dispatch(removeActiveFilter(type, value))
    }
  }

  let Wrapper = React.Fragment
  let WrapperProps = {}
  let RadioOrCheckbox = Checkbox

  if (isRadio) {
    Wrapper = RadioGroup
    WrapperProps = {
      name: `radio-group-${label.toLowerCase()}`,
    }

    RadioOrCheckbox = Radio
  }

  const isChecked = enumType => {
    if (currentFilters) {
      return Array.isArray(currentFilters)
        ? currentFilters.includes(enumType)
        : currentFilters === enumType
    }
    return false
  }

  return (
    <FilterBox label={label}>
      <Wrapper {...WrapperProps}>
        {hasFilters && (
          <>
            {isRadio && (
              <Label
                htmlFor={`type:${type}`}
                label={`Alles ${!!totalCount && !hideCount ? `(${totalCount})` : ''}`}
              >
                <Radio
                  checked={!currentFilters || !currentFilters.length}
                  variant="primary"
                  value={type}
                  onChange={() => dispatch(removeAllActiveFilters(type))}
                  id={`type:${type}`}
                />
              </Label>
            )}
            {options.map(({ label: optionLabel, id, count, enumType }) => (
              <Label
                key={id}
                tabIndex={-1}
                disabled={count === 0}
                htmlFor={`type:${id}`}
                label={`${optionLabel} ${
                  !!count && !hideCount ? `(${count.toLocaleString('nl-NL')})` : ''
                }`}
              >
                <RadioOrCheckbox
                  checked={isChecked(enumType || id)}
                  variant="primary"
                  value={enumType || id}
                  onChange={e => onChange(e, !!enumType)}
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

export default memo(SearchFilters)
