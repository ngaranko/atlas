import React from 'react'
import { Paragraph, Link } from '@datapunt/asc-ui'
import ContentPage from './ContentPage'

const MovedPage = () => (
  <ContentPage title="Pagina verplaatst">
    <Paragraph>De link die je volgde, werkt niet meer.</Paragraph>
    <Paragraph>
      Heb je een link, waarvan je niet meer weet over welke pagina die ging? Neem dan{' '}
      <Link variant="inline" href="mailto:datapunt@amsterdam.nl" title="Contact">
        contact
      </Link>{' '}
      op en stuur de oude link. Dan zoeken wij de nieuwe voor je op.
    </Paragraph>
  </ContentPage>
)

export default MovedPage
