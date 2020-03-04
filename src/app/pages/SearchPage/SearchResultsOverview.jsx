import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import React from 'react'
import { DEFAULT_LOCALE } from '../../../shared/config/locale.config'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import SearchLink from '../../components/Links/SearchLink/SearchLink'
import NoSearchResults from '../../components/NoSearchResults'
import SearchHeading from '../../components/SearchHeading/SearchHeading'
import getErrorsForPath from '../../utils/getErrorsForPath'
import getLoadingErrors from '../../utils/getLoadingErrors'
import SEARCH_PAGE_CONFIG, { QUERY_TYPES } from './config'

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
`

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

const SearchResultsOverview = ({ query, totalCount, results, errors, loading }) => {
  return results.length > 0 && totalCount ? (
    results.map(({ key, results: resultItemResults, totalCount: resultItemTotalCount }) => {
      const resultItemType = getKeyByValue(QUERY_TYPES, key)

      if (resultItemType) {
        const { label, component: ResultComponent, to, type, resolver } = SEARCH_PAGE_CONFIG[
          resultItemType
        ]

        // Get the loading errors only, as we do not want to show unauthorized messages on the overview page.
        const matchingErrors = getLoadingErrors(
          getErrorsForPath(errors, typeof resolver === 'string' ? [resolver] : resolver),
        )
        // TODO: This statement should match the error code instead, needs to be implemented in the API.
        const hasNoMatchingFilters = errors.some(
          err => err.message === 'The entered type(s) does not exist',
        )
        const hasErrors = matchingErrors.length > 0
        const hasResults = resultItemTotalCount > 0

        return hasResults || (hasErrors && !hasNoMatchingFilters) ? (
          <ResultItem key={resultItemType}>
            <SearchHeading
              label={`${label}${
                resultItemTotalCount > 0
                  ? ` (${resultItemTotalCount.toLocaleString(DEFAULT_LOCALE)})`
                  : ''
              }`}
            />
            <ResultsComponent>
              {hasResults ? (
                <ResultComponent
                  data-test={resultItemType}
                  {...{
                    type,
                    page: resultItemType,
                    results: resultItemResults,
                    loading,
                    errors: matchingErrors,
                    compact: true, // Results in the search overview page are compact
                  }}
                />
              ) : (
                <ErrorMessage />
              )}
            </ResultsComponent>
            {hasResults && (
              <SearchLink to={to()} label={`Resultaten tonen binnen de categorie '${label}'`} />
            )}
          </ResultItem>
        ) : null
      }
      return null
    })
  ) : (
    <NoSearchResults data-test="NoSearchResults" query={query} />
  )
}

export default SearchResultsOverview
