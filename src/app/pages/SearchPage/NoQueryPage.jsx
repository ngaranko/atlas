import React from 'react'
import styled from '@datapunt/asc-core'
import { Container, Heading, Paragraph } from '@datapunt/asc-ui'
import ContentContainer from '../../components/ContentContainer/ContentContainer'

const StyledContentContainer = styled(ContentContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const StyledHeading = styled(Heading)`
  margin-bottom: 1em;
`

const NoQueryPage = () => (
  <Container>
    <StyledContentContainer>
      <StyledHeading>Gebruik een zoekterm om resultaten te vinden</StyledHeading>
      <Paragraph>Typ iets in het zoekveld om resultaten te vinden.</Paragraph>
    </StyledContentContainer>
  </Container>
)

export default NoQueryPage
