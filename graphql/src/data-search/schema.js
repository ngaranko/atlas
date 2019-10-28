const { buildSchema } = require('graphql')

const schema = `  
  type DataSearchResult {
    totalCount: Int!
    results: [SearchResultType!]!
  }
  
  type SearchResultType {
    count: Int!
    type: String
    label: String
    results: [SearchResult!]
  }
  
  type SearchResult {
    id: ID
    type: String!
    label: String
    directLink: String
  }
`

module.exports.default = schema
