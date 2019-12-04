import React from 'react'
import { Enlarge } from '@datapunt/asc-assets'
import styled from '@datapunt/asc-core'
import { Button, CardContainer, svgFill, themeColor } from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import EditorialCard from '../EditorialCard'

const EditorialCardContainer = styled(CardContainer)`
  padding: 0;
`

const StyledButton = styled(Button)`
  border-color: ${themeColor('tint', 'level7')};
  color: ${themeColor('tint', 'level7')};
  background: ${themeColor('tint', 'level1')};
  ${svgFill('tint', 'level7')};

  &:hover,
  &:focus {
    outline: 0;
    background: ${themeColor('tint', 'level3')};
  }
`

const EditorialResults = ({ results, loading, type, onClickMore, className }) => (
  <EditorialCardContainer className={className}>
    {!results && loading ? (
      <LoadingIndicator style={{ position: 'inherit' }} />
    ) : (
      <>
        {results &&
          !!results.length &&
          results.map(result => <EditorialCard {...result} key={result.id} type={type} />)}
        {loading && <LoadingIndicator style={{ position: 'inherit' }} />}
        {!loading && onClickMore && (
          <StyledButton
            variant="primaryInverted"
            iconLeft={<Enlarge />}
            iconSize={12}
            onClick={onClickMore}
          >
            Toon meer
          </StyledButton>
        )}
      </>
    )}
  </EditorialCardContainer>
)

export default EditorialResults
