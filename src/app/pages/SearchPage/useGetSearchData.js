import React from 'react'
import dataSchema from './data.schema'
import cmsSchema from './cms.schema'
import useFromGraphQL from '../../utils/useFromGraphQL'

const useGetSearchData = query => {
  const [searchResults, setSearchResults] = React.useState([])
  const [totalCount, setTotalCount] = React.useState([])
  const [filterOptions, setFilterOptions] = React.useState([])

  let error
  const fetchInitialData = async (limit = null, types = null) => {
    try {
      error = undefined
      const result = await useFromGraphQL(
        'http://localhost:8000/cms_search/graphql/',
        `
          query($q: String!, $limit: Int, $types: [String!]) {
            ${dataSchema}
            ${cmsSchema}
          }
        `,
        {
          q: query,
          limit,
          types: types && types.length ? types : null,
        },
      )
      return result
    } catch (e) {
      return e
    }
  }

  React.useEffect(() => {
    ;(async () => {
      const { data, error: fetchError } = await fetchInitialData(5)
      error = fetchError
      const results = (data.dataSearch && data.dataSearch.results) || []

      setSearchResults(results)

      setTotalCount(data.dataSearch.totalCount)

      // Set filters based on count, type and label
      setFilterOptions(
        results.map(({ type, count, label }) => ({
          type,
          count,
          label,
        })),
      )
    })()
  }, [query])

  return {
    dataFilterOptions: filterOptions,
    totalCount,
    dataSearchResults: searchResults,
    setDataSearchResults: setSearchResults,
    error,
    fetchDataSearch: fetchInitialData,
  }
}

export default useGetSearchData
