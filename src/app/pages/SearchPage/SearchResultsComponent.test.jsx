import React from 'react'
import { shallow } from 'enzyme'
import SearchResultsComponent from './SearchResultsComponent'
import PAGES from '../../pages'
import { EDITORIAL_SEARCH_PAGES, DATASET_SEARCH_PAGES, DATA_SEARCH_PAGES } from './config'

describe('SearchResultsComponent', () => {
  describe('should return the correct results component based on page', () => {
    it('for search pages', () => {
      ;[...EDITORIAL_SEARCH_PAGES, ...DATASET_SEARCH_PAGES, ...DATA_SEARCH_PAGES].map(page => {
        const component = shallow(<SearchResultsComponent page={page} />)

        return expect(component.props()).toMatchObject({ 'data-test': page })
      })
    })

    it('for other pages', () => {
      const component = shallow(<SearchResultsComponent page={PAGES.SEARCH} />)

      expect(component).toEqual({})
    })
  })
})
