import React from 'react'
import { shallow } from 'enzyme'
import SearchPageFilters from './SearchPageFilters'
import PAGES from '../../pages'
import { EDITORIAL_SEARCH_PAGES, DATASET_SEARCH_PAGES, DATA_SEARCH_PAGES } from './config'

describe('SearchPageFilters', () => {
  describe('should return the correct filters based on page', () => {
    it('for data pages', () => {
      DATA_SEARCH_PAGES.map(page => {
        const totalCount = 1
        const mockOptions = []

        const component = shallow(
          <SearchPageFilters
            {...{ currentPage: page, totalCount, filters: [{ options: mockOptions }] }}
          />,
        )

        return expect(component.props()).toMatchObject({
          'data-test': page,
          availableFilters: {
            totalCount: 1,
            options: mockOptions,
          },
        })
      })
    })

    it('for data pages without filters', () => {
      DATA_SEARCH_PAGES.map(page => {
        const component = shallow(<SearchPageFilters currentPage={page} />)

        return expect(component).toEqual({})
      })
    })

    it('for dataset pages', () => {
      DATASET_SEARCH_PAGES.map(page => {
        const component = shallow(<SearchPageFilters currentPage={page} />)

        return expect(component.props()).toMatchObject({ 'data-test': page })
      })
    })

    it('for editorial pages', () => {
      EDITORIAL_SEARCH_PAGES.map(page => {
        const mockFilters = [
          {
            type: 'foo',
          },
        ]

        const component = shallow(
          <SearchPageFilters {...{ currentPage: page, filters: mockFilters }} />,
        )

        return expect(component.props()).toMatchObject({
          'data-test': page,
        })
      })
    })

    it('for other pages', () => {
      const component = shallow(<SearchPageFilters page={PAGES.SEARCH} />)

      expect(component).toEqual({})
    })
  })
})
