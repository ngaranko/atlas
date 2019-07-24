import React from 'react'
import { getByUrl } from '../../shared/services/api/api'
import cmsNormalizer from '../../shared/services/cms/cms-normalizer'
import { routing } from '../routes'

function useFromCMS() {
  const [results, setResults] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function fetchData(id, config) {
    setLoading(true)
    try {
      const endpoint = config.endpoint(id)
      const {fields} = config
      const data = await getByUrl(endpoint)
      const normalizedData = await cmsNormalizer(data, fields)

      setResults(normalizedData)
    } catch (e) {
      window.location.replace(routing.niet_gevonden.path)
    }

    setLoading(false)
    return results
  }

  return {
    loading,
    results,
    fetchData,
  }
}

export default useFromCMS
