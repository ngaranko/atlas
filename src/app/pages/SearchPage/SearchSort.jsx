import React from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, Label, Select, themeColor, themeSpacing } from '@datapunt/asc-ui'
import { useDispatch } from 'react-redux'
import { setSort } from './SearchPageDucks'

const SelectboxWrapper = styled.div`
  display: flex;
  margin-bottom: ${themeSpacing(4)};
  align-self: flex-start;

  @media screen and ${breakpoint('min-width', 'mobileL')} {
    margin-left: ${themeSpacing(4)};
  }
  @media screen and ${breakpoint('max-width', 'tabletS')} {
    flex-grow: 1;
    max-width: 400px;
  }
  @media screen and ${breakpoint('min-width', 'laptop')} {
    margin-left: auto;
  }
`

const StyledSelect = styled(Select)`
  padding-right: ${themeSpacing(8)};
`

const StyledLabel = styled(Label)`
  color: ${themeColor('tint', 'level6')};
  width: 100%;
  span {
    flex-shrink: 0;
    margin-right: ${themeSpacing(4)};
  }
`

const SearchSort = ({ sort }) => {
  const dispatch = useDispatch()

  return (
    <SelectboxWrapper>
      <StyledLabel htmlFor="sort-select" label="Sorteren:" position="left">
        <StyledSelect
          id="sort-select"
          value={sort}
          onChange={e => dispatch(setSort(e.target.value))}
        >
          <option value="">Publicatiedatum aflopend</option>
          <option value="date:asc">Publicatiedatum oplopend</option>
          <option value="title:asc">Titel A-Z</option>
          <option value="title:desc">Titel Z-A</option>
        </StyledSelect>
      </StyledLabel>
    </SelectboxWrapper>
  )
}

export default SearchSort
