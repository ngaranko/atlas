import React from 'react'
import { Checkbox, Label } from '@datapunt/asc-ui'
import SearchContext from '../../pages/SearchPage/SearchContext'
import FilterBox from '../FilterBox'

const SearchFilters = () => {
  const { fetchDataSearch, setDataSearchResults, dataFilterOptions } = React.useContext(
    SearchContext,
  )
  const activeFilters = React.useMemo(() => new Set(), [])

  const onChange = async e => {
    const { value, checked } = e.target
    if (checked) {
      activeFilters.add(value)
    } else {
      activeFilters.delete(value)
    }
    const { data } = await fetchDataSearch(50, [...activeFilters])
    setDataSearchResults(data.dataSearch.results)
  }
  return (
    <>
      <FilterBox
        label="Filters"
        subLabel={activeFilters.size > 0 && `${activeFilters.size} geselecteerd`}
        showMoreLabel="Toon meer"
      >
        {dataFilterOptions && dataFilterOptions.length
          ? dataFilterOptions.map(({ label, type, count }) => (
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
    </>
  )
}

export default SearchFilters
