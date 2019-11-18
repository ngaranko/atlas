import React from 'react'
import { Enlarge } from '@datapunt/asc-assets'
import styled from '@datapunt/asc-core'
import { Button, CardContainer, Heading, svgFill, themeColor, themeSpacing } from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import { EDITORIAL_TITLES } from '../../pages/EditorialOverviewPage/constants'
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

const PageHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(2)};
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
`

const EditorialResults = ({
  title,
  headingLevel,
  results,
  loading,
  type,
  onClickMore,
  showTitle,
  className,
}) => (
  <EditorialCardContainer className={className}>
    {loading ? (
      <LoadingIndicator style={{ position: 'inherit' }} />
    ) : (
      <>
        {showTitle && (
          <PageHeading $as={headingLevel || 'h1'}>{title || EDITORIAL_TITLES[type]}</PageHeading>
        )}
        {results && results.map(result => <EditorialCard {...result} type={type} />)}
        {loading && <LoadingIndicator />}
        {onClickMore && (
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

EditorialResults.defaultProps = {
  showTitle: true,
}

export default EditorialResults
