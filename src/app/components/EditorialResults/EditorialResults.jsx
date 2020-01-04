import React, { memo } from 'react'
import styled from '@datapunt/asc-core'
import { CardContainer, themeSpacing } from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import EditorialCard from '../EditorialCard'

const EditorialCardContainer = styled(CardContainer)`
  padding: 0;
  margin-bottom: ${themeSpacing(8)};
`

const EditorialResults = ({ results, loading, type, className }) => (
  <EditorialCardContainer className={className}>
    {!results && loading ? (
      <LoadingIndicator style={{ position: 'inherit' }} />
    ) : (
      <>
        {results &&
          !!results.length &&
          results.map(result => <EditorialCard {...result} key={result.id} type={type} />)}
      </>
    )}
  </EditorialCardContainer>
)

export default memo(EditorialResults, () => false)
