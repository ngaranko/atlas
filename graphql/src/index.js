const express = require('express')
const graphqlHTTP = require('express-graphql')
const fetch = require('node-fetch')
const { buildSchema } = require('graphql')
const cors = require('cors')
const { dataSearchConfig } = require('./config')

const app = express()

app.use(cors())

const schema = buildSchema(`
  type Query {
    dataSearch(q: String!): DataSearchResult
  }
  
  type DataSearchResult {
    totalCount: Int!
    results: [SearchResultType!]!
  }
  
  type SearchResultType {
    count: Int!
    type: String
    results: [SearchResult!]
  }
  
  type SearchResult {
    id: ID
    type: String!
    label: String
    directLink: String
  }
`)

const apiRoot = 'https://api.data.amsterdam.nl/'

const globalNormalize = ({ _links, _display, type, ...otherField }) => ({
  id: _links && _links.self ? _links.self.href.match(/([^\/]*)\/*$/)[1] : null,
  directLink: _links && _links.self ? _links.self.href : null,
  label: _display,
  type,
  ...otherField,
})

const resolvers = {
  dataSearch: async ({ q }) => {
    const responses = await Promise.all(
      dataSearchConfig.map(api => {
        const query = new URLSearchParams({
          q,
          ...(api.params ? { ...api.params } : {}),
        }).toString()
        const url = `${apiRoot}${api.endpoint}/?${query}`
        return fetch(url).then(res => res.json())
      }),
    )

    let totalCount = 0
    const results = responses.map(({ results, count }, i) => {
      const resultCount = count ? count : 0
      totalCount = totalCount + resultCount
      return {
        count: resultCount,
        type: dataSearchConfig[i].type,
        results: results && results.map(result => globalNormalize(result)),
      }
    })

    return {
      totalCount,
      results,
    }
  },
}

app.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }),
)

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000')
