import React, { useEffect } from 'react'
import { getByUrl } from '../../shared/services/api/api'
import cmsNormalizer from '../../shared/services/cms/cms-normalizer'
import { routing } from '../routes'

function useFromCMS(id, config) {
  const [results, setResults] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const endpoint = config.endpoint(id)
        const { fields } = config
        const data = await getByUrl(endpoint)
        const normalizedData = await cmsNormalizer(data, fields)
        setResults(normalizedData)
      } catch (e) {
        window.location.replace(routing.niet_gevonden.path)
      }

      setLoading(false)
      return results
    }
    fetchData(id, config)
  }, [id, config])

  return {
    loading,
    results,
  }
}

export default useFromCMS
