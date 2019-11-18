import React from 'react'
import { useQuery } from 'urql'

const usePreviousValue = track => {
  const ref = React.useRef(track)
  React.useEffect(() => {
    ref.current = track
  })
  return ref.current
}

const usePagination = (query, input, limit = 50, initialFrom) => {
  const [result, setResult] = React.useState({})
  const [from, setFrom] = React.useState(initialFrom)

  const [{ fetching, data, error }] = useQuery({
    query,
    variables: { limit, from, ...input },
  })

  const prevFetching = usePreviousValue(fetching)

  React.useEffect(() => {
    if (prevFetching === true && fetching === false && !error) {
      const filteredData =
        data && data.cmsSearch
          ? data.cmsSearch.results.filter(item => item.type === input.types)[0]
          : null

      setResult(d => ({
        ...filteredData,
        results: [...(d && d.results ? d.results : []), ...filteredData.results],
      }))
    }
  }, [fetching, prevFetching, data, error])

  const fetchMore = React.useCallback(() => {
    setFrom(s => s + limit)
  }, [limit])

  console.log('fetching', fetching)

  return [{ data: result, fetching, error }, fetchMore]
}

export default usePagination
