import React, { memo } from 'react'
import styled from '@datapunt/asc-core'
import { Column, Heading } from '@datapunt/asc-ui'
import Panel from '../../components/Panel/Panel'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import EditorialResults from '../../components/EditorialResults'
import SEARCH_PAGE_CONFIG from './config'
import { EDITORIAL_TYPES } from '../EditorialOverviewPage/constants'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'

const ResultColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;
`

const SearchPageResults = ({
  error,
  fetching,
  totalCount,
  results,
  currentPage,
  setOffset,
  offset,
}) => {
  const hasResults = !fetching && !!results.length

  const Results = () => {
    switch (currentPage) {
      case PAGES.SPECIAL_SEARCH:
      case PAGES.PUBLICATION_SEARCH:
      case PAGES.ARTICLE_SEARCH:
        return (
          <EditorialResults
            title={SEARCH_PAGE_CONFIG[currentPage].label}
            results={results}
            loading={fetching}
            type={EDITORIAL_TYPES[currentPage]}
            onClickMore={() => {
              setOffset(offset + 1)
            }}
          />
        )

      case PAGES.DATA_SEARCH_QUERY:
        return <DataSearchResults results={results} />
      case PAGES.DATASET_SEARCH:
        return <DatasetSearchResults results={results} />
      default:
        return null
    }
  }

  return (
    <ResultColumn
      wrap
      span={{ small: 12, medium: 12, big: 12, large: 7, xLarge: 8 }}
      push={{ small: 0, medium: 0, big: 0, large: 1, xLarge: 1 }}
    >
      {/* Todo: improve error message */}
      {error && (
        <Panel isPanelVisible type="warning">
          Er is een fout opgetreden
        </Panel>
      )}
      {fetching && <LoadingIndicator style={{ position: 'inherit' }} />}
      {hasResults && (
        <>
          <Heading>
            {totalCount > 0
              ? `Alle resultaten met categorie \`${SEARCH_PAGE_CONFIG[currentPage].label}\` (${totalCount} resultaten)`
              : 'Geen resultaten'}
          </Heading>
          <Results />
        </>
      )}
    </ResultColumn>
  )
}

export default memo(SearchPageResults)
