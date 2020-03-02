import React from 'react'
import { Card, CardContent, Heading, themeSpacing, themeColor } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import useFromCMS from '../../utils/useFromCMS'
import EditorialCard from '../EditorialCard'

const StyledCard = styled(Card)`
  border-top: 2px solid;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  background-color: ${themeColor('tint', 'level2')}
    // Override the margin-bottom of the Card component when used in a CardContainer
    && {
    margin-bottom: 0px;
  }
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledHeading = styled(Heading)`
  margin: ${themeSpacing(3, 0, 6)};
`

const CardList = ({ title, list }) => {
  const { results, fetchData, loading } = useFromCMS(list, undefined)

  React.useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [])

  return (
    <StyledCard isLoading={loading}>
      <StyledCardContent>
        <StyledHeading $as="h4" styleAs="h3">
          {title}
        </StyledHeading>
        <div>
          {results &&
            results.map(result => (
              <EditorialCard
                {...{
                  to: result.type,
                  specialType: result.specialType,
                  title: result.title,
                  image: result.teaserImage,
                  imageDimensions: [44, 44],
                  compact: true, // Important: renders a simplified version of this card
                }}
              />
            ))}
        </div>
      </StyledCardContent>
    </StyledCard>
  )
}

export default CardList
