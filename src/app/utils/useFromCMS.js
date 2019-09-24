import React from 'react'
import { getByUrl } from '../../shared/services/api/api'
import cmsNormalizer from '../../shared/services/cms/cms-normalizer'
import { routing } from '../routes'

function useFromCMS(config, id = false, normalize = true) {
  const [results, setResults] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const fetchData = async endpoint => {
    setLoading(true)
    try {
      if (!endpoint) {
        // eslint-disable-next-line no-param-reassign
        endpoint = id ? config.endpoint(id) : config.endpoint()
      }

      const { fields } = config
      const data = await getByUrl(endpoint)

      let result = data

      console.log(result)

      if (normalize) {
        result = await cmsNormalizer(config.type, data, fields)
      }
      setResults(result)
    } catch (e) {
      // window.location.replace(routing.niet_gevonden.path)
    }

    setLoading(false)
    return results
  }

  return {
    loading,
    fetchData,
    results,
  }
}

export default useFromCMS
