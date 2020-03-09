import styled from '@datapunt/asc-core'
import { CardContainer } from '@datapunt/asc-ui'
import React, { memo } from 'react'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import { TYPES } from '../../../shared/config/cms.config'
import {
  toArticleSearch,
  toPublicationSearch,
  toSpecialSearch,
} from '../../../store/redux-first-router/actions'
import getErrorsForPath from '../../utils/getErrorsForPath'
import getLoadingErrors from '../../utils/getLoadingErrors'
import getUnauthorizedLabels from '../../utils/getUnauthorizedLabels'
import EditorialCard from '../EditorialCard'
import ErrorMessage from '../HomePage/ErrorMessage'
import NoSearchResults from '../NoSearchResults'
import MoreResultsWhenLoggedIn from '../PanelMessages/MoreResultsWhenLoggedIn'

const EDITORIAL_OVERVIEW_ACTIONS = {
  [TYPES.ARTICLE]: toArticleSearch,
  [TYPES.PUBLICATION]: toPublicationSearch,
  [TYPES.SPECIAL]: toSpecialSearch,
}

const EditorialCardContainer = styled(CardContainer)`
  padding: 0;
`

const EditorialResults = ({ query, results, errors, label, loading, type, className }) => {
  const matchingErrors = getErrorsForPath(errors, ['articleSearch'])
  const hasLoadingError = getLoadingErrors(matchingErrors).length > 0

  // Get all the labels of the type that the user has no access to
  const unauthorizedLabels = getUnauthorizedLabels(matchingErrors)

  return (
    <EditorialCardContainer className={className}>
      {loading ? (
        <LoadingIndicator style={{ position: 'inherit' }} />
      ) : (
        <>
          {!hasLoadingError &&
            results.length > 0 &&
            results.map(result => <EditorialCard {...result} key={result.id} type={type} />)}
          {!hasLoadingError && results.length === 0 && (
            <NoSearchResults
              query={query}
              label={label}
              to={EDITORIAL_OVERVIEW_ACTIONS[type](null, false, false, false)}
            />
          )}
          {!hasLoadingError && unauthorizedLabels.length > 0 && (
            <MoreResultsWhenLoggedIn excludedResults={unauthorizedLabels.join(', ')} />
          )}
          {hasLoadingError && <ErrorMessage />}
        </>
      )}
    </EditorialCardContainer>
  )
}

export default memo(EditorialResults, () => false)
