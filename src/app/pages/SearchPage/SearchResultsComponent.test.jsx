// import getResultsComponent from './SearchResultsComponent.jsx'
// import PAGES from '../../pages'
// import { EDITORIAL_SEARCH_PAGES, DATASET_SEARCH_PAGES, DATA_SEARCH_PAGES } from './config'

// describe('getResultsComponent', () => {
//   describe('should return the correct results component based on page', () => {
//     it('for editorial pages', () => {
//       EDITORIAL_SEARCH_PAGES.map(page => {
//         const component = getResultsComponent(page, {})

//         expect(component.props).toMatchObject({ 'data-test': page })
//       })
//     })

//     it('for dataset pages', () => {
//       DATASET_SEARCH_PAGES.map(page => {
//         const component = getResultsComponent(page, {})

//         expect(component.props).toMatchObject({ 'data-test': page })
//       })
//     })

//     it('for data pages', () => {
//       DATA_SEARCH_PAGES.map(page => {
//         const component = getResultsComponent(page, {})

//         expect(component.props).toMatchObject({ 'data-test': page })
//       })
//     })

//     it('for other pages', () => {
//       const component = getResultsComponent(PAGES.SEARCH, {})

//       expect(component).toBe(null)
//     })
//   })
// })

// export const Results = ({
//   query,
//   totalCount,
//   currentPage,
//   results,
//   errors,
//   fetching,
//   showLoadMore,
// }) => {
//   // eslint-disable-next-line no-nested-ternary
//   return currentPage === PAGES.SEARCH ? (
//     results.length > 0 && totalCount > 0 ? (
//       results.map(
//         ({
//           type: resultItemType,
//           results: resultItemResults,
//           totalCount: resultItemTotalCount,
//         }) => {
//           const to = SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].to()
//           const label =
//             SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].label

//           return resultItemTotalCount > 0 ? (
//             <ResultItem key={resultItemType}>
//               <SearchHeading label={`${label} (${resultItemTotalCount})`} />
//               <ResultsComponent>
//                 {SearchResultsComponent(resultItemType, {
//                   results: resultItemResults,
//                   loading: fetching,
//                   compact: true, // Results in the search overview page are compact
//                 })}
//               </ResultsComponent>
//               <SearchLink to={to} label={`Resultaten tonen binnen de categorie '${label}'`} />
//             </ResultItem>
//           ) : (
//             ''
//           )
//         },
//       )
//     ) : (
//       <NoSearchResults data-test="NoSearchResults" query={query} />
//     )
//   ) : (
//     SearchResultsComponent(currentPage, { query, results, errors, loading: fetching, showLoadMore })
//   )
// }
