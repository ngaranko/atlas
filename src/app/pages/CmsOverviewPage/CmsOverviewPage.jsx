import React from 'react'
import { Column, Heading, Row } from '@datapunt/asc-ui'
import PAGES from '../../pages'

const title = {
  [PAGES.ARTICLES]: 'Artikelen',
  [PAGES.PUBLICATIONS]: 'Publicaties',
  [PAGES.SPECIALS]: 'Specials',
}

const CmsOverviewPage = ({ type = '' }) => (
  <Row>
    <Column maxWidth={false} span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
      <Heading as="h2" styleAs="h1">
        {title[type]}
      </Heading>
    </Column>
  </Row>
)

export default CmsOverviewPage
