import React from 'react'
import styled from '@datapunt/asc-core'
import { Row, Column, Heading, Paragraph, Link, themeSpacing } from '@datapunt/asc-ui'
import ShareBar from '../components/ShareBar/ShareBar'

const StyledRow = styled(Row)`
  padding-top: ${themeSpacing(14)};
`
const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`

const NotFoundPage = () => (
  <StyledRow>
    <Column
      span={{ small: 1, medium: 2, big: 6, large: 8, xLarge: 8 }}
      push={{ small: 0, medium: 0, big: 0, large: 1, xLarge: 1 }}
    >
      <div>
        <StyledHeading>Pagina niet gevonden</StyledHeading>
        <Paragraph>De link die je volgde, werkt niet (meer).</Paragraph>
        <Paragraph>
          Heb je een link, waarvan je niet meer weet over welke pagina die ging? Neem dan{' '}
          <Link variant="inline" href="mailto:datapunt@amsterdam.nl" title="Contact">
            contact
          </Link>{' '}
          op en stuur de oude link. Dan zoeken wij de nieuwe voor je op.
        </Paragraph>
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
)

export default NotFoundPage
