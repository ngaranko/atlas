import React from 'react'
import DataCard from '../../components/DataCard'

export default ({ results }) => {
  if (results.length) {
    return results.map(result =>
      result.results && result.results.length ? <DataCard {...{ ...result }} /> : null,
    )
  }
  return null
}
