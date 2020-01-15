import React from 'react'
import { useQuery } from 'urql'
import get from 'lodash.get'
import { datasetFiltersQuery } from '../../pages/SearchPage/graphql.config'
import SearchFilters from './SearchFilters'

const DatasetFilters = ({ q }) => {
  const [{ fetching, data, error }] = useQuery({
    query: datasetFiltersQuery,
    variables: {
      q,
    },
  })

  const datasetFilters = get(data, 'getDatasetFilters.filters')

  if (!fetching && datasetFilters) {
    const filters = datasetFilters.filter(({ options }) => options.length > 0)

    return (
      <>
        {filters.map(filter => (
          <SearchFilters hideCount availableFilters={filter} type={filter.type} key={filter.type} />
        ))}
      </>
    )
  }

  if (error) {
    // Todo: show error
  }

  return null
}

export default React.memo(DatasetFilters)
