import React from 'react'
import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import SEARCH_PAGE_CONFIG, { QUERY_TYPES } from './config'
import SearchHeading from '../../components/SearchHeading/SearchHeading'
import SearchLink from '../../components/Links/SearchLink/SearchLink'
import NoSearchResults from '../../components/NoSearchResults'
import ErrorMessage from '../../components/HomePage/ErrorMessage'
import { DEFAULT_LOCALE } from '../../../shared/config/locale.config'

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
`

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

const SearchResultsOverview = ({ query, totalCount, results, errors, loading }) =>
  results.length > 0 && totalCount ? (
    results.map(({ key, results: resultItemResults, totalCount: resultItemTotalCount }) => {
      const resultItemType = getKeyByValue(QUERY_TYPES, key)

      if (resultItemType) {
        const { label, component: ResultComponent, to } = SEARCH_PAGE_CONFIG[resultItemType]
        const hasLoadingError =
          errors &&
          errors.find(
            ({ query: errorResolver, code }) =>
              errorResolver === SEARCH_PAGE_CONFIG[resultItemType].resolver &&
              code !== 'UNAUTHORIZED',
          )
        const hasResults = resultItemTotalCount > 0

        return hasResults || !!hasLoadingError ? (
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
                    page: resultItemType,
                    results: resultItemResults,
                    loading,
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
        ) : (
          <></>
        )
      }
      return <></>
    })
  ) : (
    <NoSearchResults data-test="NoSearchResults" query={query} />
  )

export default SearchResultsOverview
