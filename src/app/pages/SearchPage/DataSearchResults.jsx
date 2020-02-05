import React from 'react'
import { themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import DataCard, { DataList } from '../../components/DataCard'
import MoreResultsWhenLoggedIn from '../../components/PanelMessages/MoreResultsWhenLoggedIn'
import { NoDataSearchResults } from '../../components/NoSearchResults'

const CardWrapper = styled.div`
  width: 100%;
  margin-bottom: ${({ compact }) => (compact ? themeSpacing(2) : themeSpacing(8))};
`

export default ({ query, results, errors = [], compact, showPagination }) => {
  const Card = compact ? DataCard : DataList

  // Get the total count for all data types
  const totalCount = results.length ? [0, ...results].reduce((acc, cur) => acc + cur.count) : 0

  // Get all the labels of the type that the user has no access to
  const unauthorized =
    errors.length &&
    errors
      .filter(({ code }) => code && code === 'UNAUTHORIZED')
      .map(({ label }) => label && label.toLowerCase())

  const loadingErrors =
    errors.length &&
    errors.filter(({ code }) => code && (code === 'GATEWAY_TIMEOUT' || code === 'ERROR'))

  return totalCount > 0 ? (
    <>
      {results.map(result => {
        const hasLoadingError =
          loadingErrors.length && loadingErrors.find(({ type }) => type === result.type)

        return (result.results && result.results.length > 0) || hasLoadingError ? (
          <CardWrapper key={result.type} compact={compact}>
            <Card {...{ ...result, showPagination, hasLoadingError: !!hasLoadingError }} />
          </CardWrapper>
        ) : null
      })}
      <>
        {unauthorized ? (
          <MoreResultsWhenLoggedIn excludedResults={unauthorized.join(', ')} />
        ) : null}
      </>
    </>
  ) : (
    <NoDataSearchResults query={query} unauthorized={unauthorized} />
  )
}
