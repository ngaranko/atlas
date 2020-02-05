import { useQuery } from 'urql'
import { DocumentNode, GraphQLError } from 'graphql'

const usePagination = (query: DocumentNode, variables: Object, resolver: string | string[]) => {
  const [result] = useQuery({
    query,
    variables,
  })

  const { fetching, error, data } = result || {}

  // eslint-disable-next-line prefer-const
  let { totalCount, filters = [], results = [], pageInfo = null }: any =
    data && !Array.isArray(resolver) && data[resolver] ? data[resolver] : {}

  if (data && Array.isArray(resolver)) {
    const allCounts = resolver.map(key => data[key] && data[key].totalCount)

    totalCount = allCounts.reduce((acc, cur) => acc + cur)
    results = resolver.map(key => {
      const { results: dataResults = [], totalCount: dataTotalCount } = data[key] || {}

      return { key, results: dataResults, totalCount: dataTotalCount, filters: [] }
    })
  }

  let errors: Object[] = []
  if (error) {
    errors = error.graphQLErrors.map(({ message, path, extensions }: GraphQLError) => ({
      message,
      query: path && path[0],
      ...extensions,
    }))
  }

  return { fetching, errors, totalCount, filters, results, pageInfo }
}

export default usePagination
