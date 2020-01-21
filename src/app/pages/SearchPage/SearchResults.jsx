import React from 'react'
import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import SEARCH_PAGE_CONFIG from './config'
import SearchHeading from '../../components/SearchHeading/SearchHeading'
import SearchLink from '../../components/Links/SearchLink/SearchLink'
import SearchResultsComponent from './SearchResultsComponent'
import NoSearchResults from '../../components/NoSearchResults'
import ErrorMessage from '../../components/HomePage/ErrorMessage'

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
`

export const SearchResultsOverview = ({ query, totalCount, results, errors, loading }) =>
  results.length > 0 && totalCount ? (
    results.map(
      ({ type: resultItemType, results: resultItemResults, totalCount: resultItemTotalCount }) => {
        const to = SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].to()
        const label = SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].label
        const hasLoadingError =
          errors &&
          SEARCH_PAGE_CONFIG[resultItemType] && // There's a small lag in setting the resultItemType
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
                resultItemTotalCount > 0 ? ` (${resultItemTotalCount.toLocaleString('nl-NL')})` : ''
              }`}
            />
            <ResultsComponent>
              {hasResults ? (
                <SearchResultsComponent
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
              <SearchLink to={to} label={`Resultaten tonen binnen de categorie '${label}'`} />
            )}
          </ResultItem>
        ) : (
          <></>
        )
      },
    )
  ) : (
    <NoSearchResults data-test="NoSearchResults" query={query} />
  )

export default SearchResultsOverview
