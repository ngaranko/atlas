const fetch = require('node-fetch')
const dataSearchConfig = require('./config').default

const globalNormalize = ({ _links, _display, type, ...otherField }) => ({
  id: _links && _links.self ? _links.self.href.match(/([^\/]*)\/*$/)[1] : null,
  directLink: _links && _links.self ? _links.self.href : null,
  label: _display,
  type,
  ...otherField,
})

const resolvers = {
  dataSearch: async ({ q, limit, types }) => {
    let filteredDataSearchConfig = dataSearchConfig

    if (types) {
      filteredDataSearchConfig = filteredDataSearchConfig.filter(api => types.includes(api.type))
    }

    const responses = await Promise.all(
      filteredDataSearchConfig.map(api => {
        const query = new URLSearchParams({
          q,
          ...(api.params ? { ...api.params } : {}),
        }).toString()
        const url = `${process.env.API_ROOT}${api.endpoint}/?${query}`
        return fetch(url).then(res => res.json())
      }),
    )

    let totalCount = 0
    const results = responses.map(({ results, count }, i) => {
      const resultCount = count ? count : 0
      totalCount = totalCount + resultCount
      return {
        count: resultCount,
        label: filteredDataSearchConfig[i].label,
        type: filteredDataSearchConfig[i].type,
        results: results && results.slice(0, limit || -1).map(result => globalNormalize(result)),
      }
    })

    return {
      totalCount,
      results,
    }
  },
}

module.exports.default = resolvers
