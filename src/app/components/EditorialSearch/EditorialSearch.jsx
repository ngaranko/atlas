/* eslint-disable camelcase */
import React from 'react'
import RouterLink from 'redux-first-router-link'
import { Link } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import NoResultsForSearchType from '../Messages/NoResultsForSearchType'
import PAGES from '../../pages'
import EditorialResults from '../EditorialResults'
import ShareBar from '../ShareBar/ShareBar'
import { toArticleOverview, toPublicationOverview } from '../../../store/redux-first-router/actions'
import { EDITORIAL_TITLES } from '../../pages/EditorialOverviewPage/constants'

const routeMapping = {
  [PAGES.ARTICLES]: toArticleOverview,
  [PAGES.PUBLICATIONS]: toPublicationOverview,
}

const StyledEditorialSearch = styled.div`
  margin-bottom: 24px;
  max-width: 792px; // Image width + 600px (design system rule)
`

const EditorialSearch = ({ type, loading, results, fetchMore }) => {
  if (results && !results.results) {
    return (
      <>
        <NoResultsForSearchType
          message={
            <p>
              Tip: maak de zoekcriteria minder specifiek. Of bekijk de lijst{' '}
              <Link
                variant="inline"
                $as={RouterLink}
                to={routeMapping[type]()}
                title={`Overzicht van ${EDITORIAL_TITLES[type]}`}
              >
                {EDITORIAL_TITLES[type]}
              </Link>
              .
            </p>
          }
          hideLoginLink
        />
        <ShareBar topSpacing={6} />
      </>
    )
  }

  return (
    <StyledEditorialSearch>
      <EditorialResults
        type={type}
        loading={loading}
        results={results && results.results}
        onClickMore={fetchMore}
        showTitle={false}
      />
      <ShareBar topSpacing={6} />
    </StyledEditorialSearch>
  )
}

export default EditorialSearch
