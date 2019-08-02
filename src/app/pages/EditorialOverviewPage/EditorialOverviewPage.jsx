import React from 'react'
import { Container, Column, Heading, Row } from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import useFromCMS from '../../utils/useFromCMS'
import cmsConfig from '../../../shared/services/cms/cms-config'
import Footer from '../../components/Footer/Footer'

import './EditorialOverviewPage.scss'

const title = {
  [PAGES.ARTICLES]: 'Artikelen',
  [PAGES.PUBLICATIONS]: 'Publicaties',
  [PAGES.SPECIALS]: 'Specials',
}

const EditorialOverviewPage = ({ type = '' }) => {
  const { loading } = useFromCMS(cmsConfig[type])

  return (
    <Container className="editorial-overview" beamColor="valid">
      <Row>
        <ContentContainer>
          <Column span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
            {loading ? <LoadingIndicator /> : <Heading as="h1">{title[type]}</Heading>}
          </Column>
        </ContentContainer>
      </Row>
      <Footer noMaxWidth />
    </Container>
  )
}

export default EditorialOverviewPage
