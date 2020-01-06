import React from 'react'
import { themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import DataCard, { DataList } from '../../components/DataCard'
import MoreResultsWhenLoggedIn from '../../components/PanelMessages/MoreResultsWhenLoggedIn'

const CardWrapper = styled.div`
  width: 100%;
  margin-bottom: ${({ compact }) => (compact ? themeSpacing(2) : themeSpacing(8))};
`

export default ({ results, errors = [], compact, showLoadMore }) => {
  const Card = compact ? DataCard : DataList

  // Get all the labels of the type that the user has no access to
  const unauthorized =
    errors.length &&
    errors
      .filter(({ code }) => code && code === 'UNAUTHORIZED')
      .map(({ label }) => label && label.toLowerCase())

  return (
    <>
      {results.length &&
        results.map(result =>
          result.results && result.results.length ? (
            <CardWrapper key={result.type} compact={compact}>
              <Card {...{ ...result, showLoadMore }} />
            </CardWrapper>
          ) : null,
        )}
      <>
        {unauthorized ? (
          <MoreResultsWhenLoggedIn excludedResults={unauthorized.join(', ')} />
        ) : null}
      </>
    </>
  )
}
