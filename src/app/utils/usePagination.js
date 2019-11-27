import React from 'react'
import { useQuery } from 'urql'

const usePagination = (query, input, limit = 50, initialFrom = 0) => {
  const [result, setResult] = React.useState({})
  const [from, setFrom] = React.useState(initialFrom)

  const [{ fetching, data, error }] = useQuery({
    query,
    variables: { limit, from, ...input },
  })

  React.useMemo(() => {
    // When the input query changes the from value must be resetted
    setFrom(initialFrom)
  }, [input.q])

  React.useEffect(() => {
    if (fetching === false && !error) {
      const filteredData =
        data && data.cmsSearch
          ? data.cmsSearch.results.filter(item => item.type === input.types)[0]
          : null

      setResult(current => ({
        ...filteredData,
        results: [
          ...(from > 0 && current && current.results ? current.results : []),
          ...filteredData.results,
        ],
      }))
    }
  }, [fetching, data, error, from, input.q])

  const fetchMore = React.useCallback(() => {
    setFrom(s => s + limit)
  }, [limit])

  return [{ data: result, fetching, error }, fetchMore]
}

export default usePagination