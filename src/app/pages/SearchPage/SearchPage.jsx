import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {
  breakpoint,
  Column,
  Container,
  Row,
  Heading,
  Button,
  BackDrop as BackDropStyle,
  themeSpacing,
} from '@datapunt/asc-ui'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import styled, { css } from '@datapunt/asc-core'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import SearchFilters from '../../components/SearchFilters/SearchFilters'
import SearchContext from './SearchContext'
import useGetSearchData from './useGetSearchData'
import PageFilterBox from './PageFilterBox'
import DataSearchFilter from './DataSearchFilter'

const FilterColumn = styled(Column)`
  align-content: flex-start;
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
    position: fixed;
    overflow-y: auto;
    width: calc(100% - ${themeSpacing(10)});
    max-width: 300px;
    bottom: 0;
    top: 75px;
    right: ${themeSpacing(5)};
    background-color: white;
    z-index: 30;

    ${({ showFilter }) =>
      showFilter &&
      css`
        display: block;
      `}
  }
`

const BackDrop = ({ children, element }) => ReactDOM.createPortal(children, element)

const SearchPage = ({ query, currentPage }) => {
  const {
    dataSearchResults,
    fetchDataSearch,
    setDataSearchResults,
    dataFilterOptions,
    totalCount,
  } = useGetSearchData(query)

  const filterRef = React.useRef(null)

  const [showFilter, setShowFilter] = React.useState(false)

  const title = `Searchpage: ${query} ${
    totalCount > 0 ? `(${totalCount} resultaten)` : 'geen resultaten'
  }`

  // Todo: improve
  const backdropParent = document.querySelector('.c-dashboard__body')

  const onToggleFilter = () => {
    setShowFilter(!showFilter)
  }

  // Enable / disable body lock when opening the filter on mobile
  React.useEffect(() => {
    const action = showFilter ? disableBodyScroll : enableBodyScroll
    action(filterRef.current)
  }, [filterRef, showFilter])

  return (
    <SearchContext.Provider
      value={{ dataSearchResults, fetchDataSearch, setDataSearchResults, dataFilterOptions }}
    >
      <Container>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
        </Helmet>
        <Button onClick={onToggleFilter}>Open filter</Button>
        <ContentContainer>
          <Row>
            {showFilter && (
              <>
                <BackDrop element={backdropParent}>
                  <BackDropStyle onClick={() => setShowFilter(false)} />
                </BackDrop>
              </>
            )}
            <FilterColumn
              ref={filterRef}
              showFilter={showFilter}
              wrap
              span={{ small: 0, medium: 0, big: 0, large: 4, xLarge: 3 }}
            >
              <Button onClick={onToggleFilter}>Close filter</Button>
              <PageFilterBox currentPage={currentPage} />
              {dataSearchResults && dataSearchResults.length ? (
                <SearchFilters results={dataSearchResults} />
              ) : null}
            </FilterColumn>
            <Column
              wrap
              span={{ small: 12, medium: 12, big: 12, large: 7, xLarge: 8 }}
              push={{ small: 0, medium: 0, big: 0, large: 1, xLarge: 1 }}
            >
              <div>
                <Heading>{title}</Heading>
                {dataSearchResults && <DataSearchFilter results={dataSearchResults} />}
              </div>
            </Column>
          </Row>
        </ContentContainer>
      </Container>
    </SearchContext.Provider>
  )
}

SearchPage.propTypes = {
  query: PropTypes.string.isRequired,
}

export default SearchPage
