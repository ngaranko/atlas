import { shallow } from 'enzyme'
import React from 'react'
import SearchResultsOverview from './SearchResultsOverview'
import SEARCH_PAGE_CONFIG, { EDITORIAL_SEARCH_PAGES, DATA_SEARCH_PAGES } from './config'

describe('SearchResultsOverview', () => {
  describe('should render the correct results component for the search page ', () => {
    let component

    it('when no results', () => {
      component = shallow(<SearchResultsOverview results={[]} />)

      expect(component.find(`[data-test='NoSearchResults']`).exists()).toBeTruthy()
    })

    it('when no results for each type', () => {
      component = shallow(
        <SearchResultsOverview
          results={[
            {
              results: [],
            },
          ]}
        />,
      )

      expect(component).toEqual({})
    })

    describe('when results for each type', () => {
      const mockTypes = [...DATA_SEARCH_PAGES, ...EDITORIAL_SEARCH_PAGES]

      const mockResults = mockTypes.map(type => ({
        type,
        totalCount: 1,
        results: [{ id: 'foo ' }],
      }))

      it('renders correct number of components', () => {
        component = shallow(<SearchResultsOverview results={mockResults} totalCount={1} />)

        expect(component.length).toBe(mockTypes.length)
      })

      it('renders the components for each type', () => {
        const pageType = mockTypes[mockTypes.length - 1]

        const page = SEARCH_PAGE_CONFIG[pageType]
        const pageComponent = component.at(mockTypes.length - 1)
        const pageResults = mockResults.find(result => result.type === pageType)

        // Heading
        expect(pageComponent.find('SearchHeading').exists()).toBeTruthy()
        expect(pageComponent.find('SearchHeading').props()).toMatchObject({
          label: `${page.label} (${pageResults.totalCount})`,
        })

        // Results body
        expect(pageComponent.find(`[data-test="${pageType}"]`).exists()).toBeTruthy()

        // Link
        expect(pageComponent.find('SearchLink').exists()).toBeTruthy()
        expect(pageComponent.find('SearchLink').props().to).toMatchObject({
          type: expect.stringContaining(pageType),
        })
      })
    })
  })
})
