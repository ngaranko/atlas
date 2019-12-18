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
  toSpecialSearch,
} from '../../../store/redux-first-router/actions'
import FilterBox from '../FilterBox'
import PAGES from '../../pages'
import { routing } from '../../routes'
import SEARCH_PAGE_CONFIG from '../../pages/SearchPage/config'
import isDefined from '../../../shared/services/is-defined'
import PARAMETERS from '../../../store/parameters'
import { categoryFilterBoxQuery } from '../../pages/SearchPage/graphql.config'

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
  let specialCount
  let datasetTotalCount
  let dataTotalCount

  if (data) {
    const { articleSearch, publicationSearch, datasetSearch, dataSearch, specialSearch } = data

    try {
      datasetTotalCount = datasetSearch.totalCount
      dataTotalCount = dataSearch.totalCount
      publicationCount = publicationSearch.totalCount
      articleCount = articleSearch.totalCount
      specialCount = specialSearch.totalCount

      allCategoryCount = datasetTotalCount + dataTotalCount + publicationCount + articleCount
    } catch (e) {
      // Todo: error handling
      // eslint-disable-next-line no-console
      console.warn(e)
    }
  }

  const QUERY_PARAMETER = { [PARAMETERS.QUERY]: query }

  // We only want to preserve certain parameters when navigating between "filters" (pages)
  const CMS_ROUTE_ARGUMENTS = [QUERY_PARAMETER, undefined, undefined, false]
  const DATASETS_ROUTE_ARGUMENTS = [QUERY_PARAMETER, undefined, undefined, false]

  const FILTERS = [
    {
      page: PAGES.SEARCH,
      to: toSearch(),
      title: routing.search.title,
      count: allCategoryCount,
    },
    {
      page: PAGES.DATA_SEARCH,
      to: toDataSearch(),
      title: routing.dataSearchQuery.title,
      count: dataTotalCount,
    },
    {
      page: PAGES.PUBLICATION_SEARCH,
      to: toPublicationSearch(...CMS_ROUTE_ARGUMENTS),
      title: routing.publicationSearch.title,
      count: publicationCount,
    },
    {
      page: PAGES.DATASET_SEARCH,
      to: toDatasetSearch(...DATASETS_ROUTE_ARGUMENTS),
      title: routing.datasetSearch.title,
      count: datasetTotalCount,
    },
    {
      page: PAGES.ARTICLE_SEARCH,
      to: toArticleSearch(...CMS_ROUTE_ARGUMENTS),
      title: routing.articleSearch.title,
      count: articleCount,
    },
    {
      page: PAGES.SPECIAL_SEARCH,
      to: toSpecialSearch(...CMS_ROUTE_ARGUMENTS),
      title: routing.specialSearch.title,
      count: specialCount,
    },
  ]

  return (
    <FilterBox label="Filters">
      {FILTERS.map(({ page, to, title, count }) => (
        <FilterOption
          key={page}
          {...(currentPage === page ? ACTIVE_LINK_PROPS : { as: RouterLink, to, title })}
        >
          {SEARCH_PAGE_CONFIG[page].label} {isDefined(count) && `(${count})`}
        </FilterOption>
      ))}
    </FilterBox>
  )
}
