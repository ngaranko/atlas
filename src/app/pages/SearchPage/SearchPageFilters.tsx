import React, { ReactElement } from 'react'
import styled, { css } from '@datapunt/asc-core'
import {
  themeSpacing,
  Button,
  Modal,
  Spinner,
  breakpoint,
  Column,
  styles,
  TopBar,
  Heading,
} from '@datapunt/asc-ui'
import { Close } from '@datapunt/asc-assets'
import SearchFilter from '../../components/SearchFilter'
import { Filter } from '../../models'
import PageFilterBox from '../../components/PageFilterBox/PageFilterBox'

interface SearchPageFiltersProps {
  filters: Filter[]
  totalCount: number
  hideCount: boolean
  setShowFilter: Function
  isOverviewPage: boolean
  query: string
  currentPage: string
  showFilter: boolean
  fetching: boolean
}

const FilterColumn = styled(Column)`
  align-content: flex-start;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

const FILTER_BOX_WIDTH_CSS = css`
  @media screen and ${breakpoint('min-width', 'mobileL')} {
    width: calc(100% - ${themeSpacing(10)});
    max-width: calc(400px + ${themeSpacing(12)});
  }
`

const StyledModal = styled(Modal)`
  ${FILTER_BOX_WIDTH_CSS}

  ${FilterColumn} {
    top: 0;
    width: 100%;
    position: relative;
    display: block;
    overflow-y: auto;
    left: 0;
    right: ${themeSpacing(5)};
    flex-grow: 1;
    margin-bottom: ${themeSpacing(19)};

    @media screen and ${breakpoint('max-width', 'mobileL')} {
      ${styles.FilterBoxStyle} {
        border-right: transparent;
        border-left: transparent;
      }
    }
    @media screen and ${breakpoint('min-width', 'mobileL')} {
      padding-left: ${themeSpacing(5)};
      padding-right: ${themeSpacing(5)};
    }
  }

  [role='dialog'] {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    height: 100vh;
    max-height: 100%;
    max-width: initial;
    top: 0;
    left: 0;
    bottom: 0;
    pointer-events: all;
    transform: initial;
  }
`

const ModalCloseButton = styled(Button)`
  margin-left: auto;
`

const ApplyFilters = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 30; // Todo: implement better z-index strategy
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${themeSpacing(4)};
  background-color: #fff;
  box-shadow: 0 0 ${themeSpacing(2)} 1px black;
  margin-top: auto;

  ${FILTER_BOX_WIDTH_CSS}
`

const ApplyFiltersButton = styled(Button)`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`

const SearchPageFilters: React.FC<SearchPageFiltersProps> = ({
  filters,
  totalCount,
  hideCount,
  setShowFilter,
  isOverviewPage,
  query,
  currentPage,
  showFilter,
  fetching,
}) => {
  const Filters: ReactElement<any> = (
    <FilterColumn wrap span={{ small: 0, medium: 0, big: 0, large: 4, xLarge: 3 }}>
      {!isOverviewPage && <PageFilterBox {...{ query, currentPage }} />}
      <>
        {filters &&
          filters.length > 0 &&
          filters.map(filter => (
            <SearchFilter
              key={filter.type}
              filter={filter}
              totalCount={totalCount}
              hideCount={hideCount}
            />
          ))}
      </>
    </FilterColumn>
  )

  return (
    <>
      {Filters}
      <StyledModal
        aria-labelledby="filters"
        aria-describedby="filters"
        open={showFilter}
        onClose={() => setShowFilter(false)}
        hideOverFlow={false}
        zIndexOffset={1}
      >
        <TopBar>
          <Heading style={{ flexGrow: 1 }} as="h4">
            <ModalCloseButton
              variant="blank"
              type="button"
              size={30}
              onClick={() => setShowFilter(false)}
              icon={<Close />}
            />
          </Heading>
        </TopBar>
        {Filters}
        <ApplyFilters>
          <ApplyFiltersButton
            iconLeft={fetching && <Spinner />}
            onClick={() => setShowFilter(false)}
            variant="primary"
          >
            {!fetching && `${totalCount} resultaten tonen`}
          </ApplyFiltersButton>
        </ApplyFilters>
      </StyledModal>
    </>
  )
}

export default SearchPageFilters
