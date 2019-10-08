import React from 'react'
import styled from '@datapunt/asc-core'
import { Row, Column, Heading, Paragraph, Link, themeSpacing } from '@datapunt/asc-ui'
import ShareBar from '../components/ShareBar/ShareBar'
import ContentContainer from '../components/ContentContainer/ContentContainer'

const StyledRow = styled(Row)``
const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`

const ContentPage = ({ title, children }) => (
  <ContentContainer>
    <StyledRow>
      <Column
        span={{ small: 1, medium: 2, big: 6, large: 8, xLarge: 8 }}
        push={{ small: 0, medium: 0, big: 0, large: 1, xLarge: 1 }}
      >
        <div>
          <StyledHeading>{title}</StyledHeading>
          {children}
          <Paragraph>
            Of ga door naar de{' '}
            <Link variant="inline" href="/" title="Naar Data en Informatie - Homepage">
              voorpagina
            </Link>
            .
          </Paragraph>
          <ShareBar />
        </div>
      </Column>
    </StyledRow>
  </ContentContainer>
)

export default ContentPage
