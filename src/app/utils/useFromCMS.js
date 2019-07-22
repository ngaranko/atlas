import React from 'react'
import { getByUrl } from '../../shared/services/api/api'
import normalizeFromCMS from './normalizeFromCMS'
import { routing } from '../routes'

function useFromCMS() {
  const [results, setResults] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function fetchFromCMS(endpoint, fields) {
    setLoading(true)
    try {
      const data = await getByUrl(endpoint)
      const normalized = await normalizeFromCMS(data, fields)

      setResults(normalized)
    } catch (e) {
      window.location.replace(routing.niet_gevonden.path)
    }

    setLoading(false)
    return results
  }

  return {
    loading,
    results,
    fetchFromCMS,
  }
}

export default useFromCMS
