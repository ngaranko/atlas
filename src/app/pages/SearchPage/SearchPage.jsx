import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'urql'
import { breakpoint, Column, Container, Row, Heading, themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import PageFilterBox from './PageFilterBox'
import DataSearchResults from './DataSearchResults'
import PAGES from '../../pages'
import { EDITORIAL_TYPES } from '../EditorialOverviewPage/constants'
import EditorialResults from '../../components/EditorialResults'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import SearchFilters, { TYPES } from '../../components/SearchFilters/SearchFilters'
import DatasetCard from '../../components/DatasetCard'
import Panel from '../../components/Panel/Panel'

import SEARCH_PAGE_CONFIG from './config'

const FilterColumn = styled(Column)`
  align-content: flex-start;

  // Todo: style mobile filter column
  // @media screen and ${breakpoint('max-width', 'laptop')} {
  //   display: none;
  //   position: fixed;
  //   overflow-y: auto;
  //   width: calc(100% - ${themeSpacing(10)});
  //   max-width: 300px;
  //   bottom: 0;
  //   top: 75px;
  //   right: ${themeSpacing(5)};
  //   background-color: white;
  //   z-index: 30;
  // }
`

const ResultColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;
`

const SearchPage = ({ query, activeFilters, currentPage, setActiveFilters }) => {
  const [currentQuery, setCurrentQuery] = React.useState(SEARCH_PAGE_CONFIG[currentPage].query)
  const [offset, setOffset] = React.useState(0)
  const [currentTitle, setCurrentTitle] = React.useState(0)
  const [availableFilterBoxes, setAvailableFilterBoxes] = React.useState([])
  const [currentResults, setCurrentResults] = React.useState([])

  const [{ fetching, data, error }] = useQuery({
    query: currentQuery,
    variables: {
      q: query,
      limit: 30,
      from: offset,
      types: activeFilters.length > 0 ? activeFilters : null,
    },
  })

  const hasResults = !fetching && !!currentResults.length

  const getResultByKey = resolver =>
    data && data[resolver] ? data[resolver] : { totalCount: 0, results: [] }

  // Todo: refactor if resolver for data filters are made
  React.useEffect(() => {
    const { totalCount, filters } = getResultByKey(SEARCH_PAGE_CONFIG[currentPage].resolver)
    if (hasResults) {
      switch (currentPage) {
        case PAGES.DATA_SEARCH_QUERY:
          filters.map(({ options }) =>
            setAvailableFilterBoxes([
              {
                title: 'Soort data',
                type: TYPES.radio,
                totalCount,
                options,
              },
            ]),
          )

          break

        default:
          setAvailableFilterBoxes([])
      }
    } else {
      setAvailableFilterBoxes([])
    }
  }, [currentResults])

  React.useEffect(() => {
    setCurrentQuery(SEARCH_PAGE_CONFIG[currentPage].query)

    const { totalCount, results } = getResultByKey(SEARCH_PAGE_CONFIG[currentPage].resolver)

    setCurrentResults(results)

    // Todo: improve no results message
    setCurrentTitle(
      totalCount > 0
        ? `Alle resultaten met categorie \`${SEARCH_PAGE_CONFIG[currentPage].label}\` (${totalCount} resultaten)`
        : 'Geen resultaten',
    )
  }, [data, currentPage])

  const Results = () => {
    switch (currentPage) {
      case PAGES.PUBLICATION_SEARCH:
      case PAGES.ARTICLE_SEARCH: {
        return (
          <EditorialResults
            title={SEARCH_PAGE_CONFIG[currentPage].label}
            results={currentResults}
            loading={fetching}
            type={EDITORIAL_TYPES[currentPage]}
            onClickMore={() => {
              setOffset(offset + 1)
            }}
          />
        )
      }
      case PAGES.DATA_SEARCH_QUERY: {
        return <DataSearchResults results={currentResults} />
      }
      case PAGES.DATASET_SEARCH: {
        return (
          <div>
            {currentResults.map(({ header, formats }) => (
              <DatasetCard key={header} href="#" formats={formats} shortTitle={header} />
            ))}
          </div>
        )
      }
      default:
        return null
    }
  }

  return (
    <Container>
      <ContentContainer>
        <Row>
          <FilterColumn wrap span={{ small: 0, medium: 0, big: 0, large: 4, xLarge: 3 }}>
            <PageFilterBox currentPage={currentPage} query={query} />
            {availableFilterBoxes.map(availableFilters => (
              <SearchFilters {...{ activeFilters, setActiveFilters, availableFilters }} />
            ))}
          </FilterColumn>
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
                <Heading>{currentTitle}</Heading>
                <Results />
              </>
            )}
          </ResultColumn>
        </Row>
      </ContentContainer>
    </Container>
  )
}

SearchPage.propTypes = {
  query: PropTypes.string.isRequired,
}

export default SearchPage
