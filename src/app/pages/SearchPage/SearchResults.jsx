import React from 'react'
import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import SEARCH_PAGE_CONFIG from './config'
import SearchHeading from '../../components/SearchHeading/SearchHeading'
import SearchLink from '../../components/Links/SearchLink/SearchLink'
import SearchResultsComponent from './SearchResultsComponent'
import NoSearchResults from '../../components/NoSearchResults'

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
`

export const SearchResultsOverview = ({ query, totalCount, results, loading }) =>
  results.length > 0 && totalCount ? (
    results.map(
      ({ type: resultItemType, results: resultItemResults, totalCount: resultItemTotalCount }) => {
        const to = SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].to()
        const label = SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].label

        return (
          resultItemTotalCount > 0 && (
            <ResultItem key={resultItemType}>
              <SearchHeading label={`${label} (${resultItemTotalCount})`} />
              <ResultsComponent>
                <SearchResultsComponent
                  data-test={resultItemType}
                  {...{
                    page: resultItemType,
                    results: resultItemResults,
                    loading,
                    compact: true, // Results in the search overview page are compact
                  }}
                />
              </ResultsComponent>
              <SearchLink to={to} label={`Resultaten tonen binnen de categorie '${label}'`} />
            </ResultItem>
          )
        )
      },
    )
  ) : (
    <NoSearchResults data-test="NoSearchResults" query={query} />
  )

export default SearchResultsOverview
