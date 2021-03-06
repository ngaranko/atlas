import { DocumentNode, GraphQLFormattedError } from 'graphql'
import { useQuery } from 'urql'
import { ErrorExtensions } from '../../models/graphql'

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
    filters = data.filters ? data.filters : []
    results = resolver.map(key => {
      const { results: dataResults = [], totalCount: dataTotalCount } = data[key] || {}

      return { key, results: dataResults, totalCount: dataTotalCount, filters: [] }
    })
  }

  const errors: GraphQLFormattedError<ErrorExtensions>[] = (error?.graphQLErrors ?? []).map(
    graphQlError => {
      // Only include extensions that actually contain fields.
      const extensions =
        graphQlError.extensions !== undefined && Object.keys(graphQlError.extensions).length > 0
          ? (graphQlError.extensions as ErrorExtensions)
          : undefined

      return {
        message: graphQlError.message,
        locations: graphQlError.locations,
        path: graphQlError.path,
        extensions,
      }
    },
  )

  return { fetching, errors, totalCount, filters, results, pageInfo }
}

export default usePagination
