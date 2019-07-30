import React from 'react'
import { Container, Column, Heading, Row } from '@datapunt/asc-ui'
import PAGES from '../../pages'
import ContentContainer from '../../components/ContentContainer/ContentContainer'

import './EditorialOverviewPage.scss'

const title = {
  [PAGES.ARTICLES]: 'Artikelen',
  [PAGES.PUBLICATIONS]: 'Publicaties',
  [PAGES.SPECIALS]: 'Specials',
}

const EditorialOverviewPage = ({ type = '' }) => (
  <Container className="editorial-overview" beamColor="valid">
    <Row>
      <ContentContainer>
        <Column
          span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}
        >
          <Heading as="h1">
            {title[type]}
          </Heading>
        </Column>
      </ContentContainer>
    </Row>
  </Container>
)

export default EditorialOverviewPage
