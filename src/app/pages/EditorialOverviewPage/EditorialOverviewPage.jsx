import React from 'react'
import { Column, Row } from '@datapunt/asc-ui'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import './EditorialOverviewPage.scss'
import EditorialResults from '../../components/EditorialResults'

const EditorialOverviewPage = ({ page, loading, results, type, links, onClickMore }) => (
  <div className="editorial-overview__body">
    <Row>
      <ContentContainer>
        <Column
          wrap
          span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 9 }}
          push={{ small: 0, medium: 0, big: 0, large: 0, xLarge: 1 }}
        >
          <EditorialResults {...{ page, loading, results, type, links, onClickMore }} />
        </Column>
      </ContentContainer>
    </Row>
  </div>
)

export default EditorialOverviewPage
