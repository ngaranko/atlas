import React from 'react'
import { FilterOption } from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'
import { useQuery } from 'urql'
import {
  toArticleSearch,
  toDataSearch,
  toDatasetSearch,
  toPublicationSearch,
  toSearch,
} from '../../../store/redux-first-router/actions'
import FilterBox from '../../components/FilterBox'
import PAGES from '../../pages'
import { routing } from '../../routes'
import { categoryFilterBoxQuery } from './constants.config'
import SEARCH_PAGE_CONFIG from './config'

const ACTIVE_LINK_PROPS = { active: true, as: 'div' }

export default ({ currentPage, query }) => {
  const [{ data }] = useQuery({
    query: categoryFilterBoxQuery,
    variables: {
      q: query,
    },
  })

  let allCategoryCount
  let publicationCount
  let articleCount
  let datasetTotalCount
  let dataTotalCount

  if (data) {
    const { articleSearch, publicationSearch, datasetSearch, dataSearch } = data

    try {
      datasetTotalCount = datasetSearch.totalCount
      dataTotalCount = dataSearch.totalCount
      publicationCount = publicationSearch.totalCount
      articleCount = articleSearch.totalCount

      allCategoryCount = datasetTotalCount + dataTotalCount + publicationCount + articleCount
    } catch (e) {
      // Todo: error handling
      console.warn(e)
    }
  }

  const FILTERS = [
    {
      page: PAGES.SEARCH,
      to: toSearch(),
      title: routing.search.title,
      count: allCategoryCount,
    },
    {
      page: PAGES.DATA_SEARCH_QUERY,
      to: toDataSearch(),
      title: routing.dataSearchQuery.title,
      count: dataTotalCount,
    },
    {
      page: PAGES.PUBLICATION_SEARCH,
      to: toPublicationSearch(),
      title: routing.publicationSearch.title,
      count: publicationCount,
    },
    {
      page: PAGES.DATASET_SEARCH,
      to: toDatasetSearch(),
      title: routing.datasetSearch.title,
      count: datasetTotalCount,
    },
    {
      page: PAGES.ARTICLE_SEARCH,
      to: toArticleSearch(),
      title: routing.articleSearch.title,
      count: articleCount,
    },
  ]

  return (
    <FilterBox label="Filters">
      {FILTERS.map(({ page, to, title, count }) => (
        <FilterOption
          key={page}
          {...(currentPage === page ? ACTIVE_LINK_PROPS : { as: RouterLink, to, title })}
        >
          {SEARCH_PAGE_CONFIG[page].label} {count && `(${count})`}
        </FilterOption>
      ))}
    </FilterBox>
  )
}
