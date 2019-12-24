import React from 'react'
import { themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import DataCard, { CompactDataCard } from '../../components/DataCard'

const CardWrapper = styled.div`
  width: 100%;
  margin-bottom: ${({ compact }) => (compact ? themeSpacing(2) : themeSpacing(18))};
`

export default ({ results, compact }) => {
  const Card = compact ? CompactDataCard : DataCard

  if (results.length) {
    return results.map(result =>
      result.results && result.results.length ? (
        <CardWrapper compact={compact}>
          <Card key={result.type} {...{ ...result }} />
        </CardWrapper>
      ) : null,
    )
  }
  return null
}
