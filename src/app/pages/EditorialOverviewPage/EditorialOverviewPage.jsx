/* eslint-disable camelcase */
import React from 'react'
import { Column, Container, Heading, Row, themeColor, themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import EditorialResults from '../../components/EditorialResults'

import usePagination from '../../utils/usePagination'
import { EDITORIAL_TITLES, EDITORIAL_TYPES, GRAPHQL_CONFIG } from './constants'
import { MAX_RESULTS } from '../SearchPage/config'

const PageHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(2)};
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
`

const EditorialOverviewPage = ({ pageType = '' }) => {
  const type = EDITORIAL_TYPES[pageType]

  const [{ data, fetching: loading }, fetchMore] = usePagination(
    GRAPHQL_CONFIG[pageType],
    { q: '', types: type },
    MAX_RESULTS,
  )

  const totalCount = (data && data.totalCount) || 0

  return (
    <Container>
      <Row>
        <ContentContainer>
          <Column
            wrap
            span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 9 }}
            push={{ small: 0, medium: 0, big: 0, large: 0, xLarge: 1 }}
          >
            {!loading && !!totalCount && (
              <PageHeading $as="h1">
                {`${EDITORIAL_TITLES[type]} (${totalCount.toLocaleString('nl-NL')})`}
              </PageHeading>
            )}
            <EditorialResults
              {...{
                loading,
                results: data && data.results,
                type,
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
