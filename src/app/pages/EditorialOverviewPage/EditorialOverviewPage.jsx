/* eslint-disable camelcase */
import React from 'react'
import { Column, Container, Row } from '@datapunt/asc-ui'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import EditorialResults from '../../components/EditorialResults'

import cmsQuery, { MAX_RESULTS } from '../../components/QuerySearch/constants.config'
import usePagination from '../../utils/usePagination'
import { EDITORIAL_TYPES } from './constants'

const EditorialOverviewPage = ({ pageType = '' }) => {
  const type = EDITORIAL_TYPES[pageType]

  const [{ data, fetching: loading }, fetchMore] = usePagination(
    cmsQuery,
    { q: '', types: type },
    MAX_RESULTS,
  )

  return (
    <Container>
      <Row>
        <ContentContainer>
          <Column
            wrap
            span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 9 }}
            push={{ small: 0, medium: 0, big: 0, large: 0, xLarge: 1 }}
          >
            <EditorialResults
              {...{
                loading,
                results: data && data.results,
                totalCount: data && data.totalCount,
                type: pageType,
                links: [],
                onClickMore: data && data.totalCount > MAX_RESULTS ? fetchMore : false,
              }}
            />
          </Column>
        </ContentContainer>
      </Row>
    </Container>
  )
}

export default EditorialOverviewPage
