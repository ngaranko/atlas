require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const expressPlayground = require('graphql-playground-middleware-express').default
const { buildSchema } = require('graphql')
const cors = require('cors')
const dataSearchResolvers = require('./data-search/resolvers').default
const dataSearchSchema = require('./data-search/schema').default
const app = express()

app.use(cors())

const schema = buildSchema(`
  type Query {
    dataSearch(q: String!, limit: Int, types: [String!]): DataSearchResult
  }
  ${dataSearchSchema}
`)

const resolvers = {
  ...dataSearchResolvers,
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
  }),
)

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000')
