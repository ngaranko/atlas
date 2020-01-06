import React, { memo } from 'react'
import styled from '@datapunt/asc-core'
import { CardContainer, themeSpacing } from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import EditorialCard from '../EditorialCard'
import NoSearchResults from '../NoSearchResults'

const EditorialCardContainer = styled(CardContainer)`
  padding: 0;
  margin-bottom: ${themeSpacing(8)};
`

const EditorialResults = ({ query, results, label, to, loading, type, className }) => (
  <EditorialCardContainer className={className}>
    {!results && loading ? (
      <LoadingIndicator style={{ position: 'inherit' }} />
    ) : (
      <>
        {results && results.length ? (
          results.map(result => <EditorialCard {...result} key={result.id} type={type} />)
        ) : (
          <NoSearchResults query={query} label={label} to={to} />
        )}
      </>
    )}
  </EditorialCardContainer>
)

export default memo(EditorialResults, () => false)
