import React from 'react'
import { getByUrl } from '../../shared/services/api/api'
import cmsJsonApiNormalizer from '../../shared/services/cms/cms-json-api-normalizer'
import useNormalizedCMSResults from '../../normalizations/cms/useNormalizedCMSResults'

export type CMSConfig = {
  endpoint: (id?: string) => string
  fields?: Array<string>
}

export type CMSResults = {
  loading: boolean
  fetchData: Function
  results: Array<CMSResultItem>
  error: boolean
}

// More fields should be added to this type when other CMS content pages are migrated to TypeScript
export type CMSResultItem = {
  id: string
  type: string
  specialType: string | null
  title: string
  shortTitle?: string
  teaser: string
  linkProps: Object
  teaserImage?: string
  coverImage?: string
}

function useFromCMS(config: CMSConfig, id?: string, normalizeFromJSONApi = true): CMSResults {
  const [results, setResults] = React.useState<CMSResultItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const fetchData = async (endpoint: string) => {
    setLoading(true)
    try {
      if (!endpoint) {
        // eslint-disable-next-line no-param-reassign
        endpoint = id ? config.endpoint(id) : config.endpoint()
      }

      const { fields } = config
      const data = await getByUrl(endpoint)

      let result = data
      if (normalizeFromJSONApi) {
        result = await cmsJsonApiNormalizer(data, fields)
      }

      result = useNormalizedCMSResults(result)
      setResults(result)
    } catch (e) {
      setError(true)
    }

    setLoading(false)
    return results
  }

  return {
    loading,
    fetchData,
    results,
    error,
  }
}

export default useFromCMS
