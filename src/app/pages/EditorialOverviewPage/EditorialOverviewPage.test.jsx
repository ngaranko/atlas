import React from 'react'
import { shallow } from 'enzyme'
import EditorialOverviewPage from './EditorialOverviewPage'
import usePagination from '../../utils/usePagination'
import PAGES from '../../pages'
import { MAX_RESULTS, TYPES } from '../../components/QuerySearch/constants.config'

jest.mock('../../utils/usePagination')

describe('EditorialOverviewPage', () => {
  let component
  const fetchMore = jest.fn()

  beforeEach(() => {
    usePagination.mockImplementation(() => [{ data: { results: [] }, fetching: false }, fetchMore])
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call the server with the correct type', () => {
    component = shallow(<EditorialOverviewPage pageType={PAGES.PUBLICATIONS} />)

    expect(usePagination).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        types: TYPES.PUBLICATION,
      }),
      expect.any(Number),
    )
  })

  it('should set the onClickMore function', () => {
    component = shallow(<EditorialOverviewPage pageType={PAGES.PUBLICATIONS} />)

    expect(component.find('EditorialResults').props().onClickMore).toBe(false)

    usePagination.mockImplementation(() => [
      { data: { results: [], totalCount: MAX_RESULTS + 1 }, fetching: false },
      fetchMore,
    ])

    component = shallow(<EditorialOverviewPage pageType={PAGES.PUBLICATIONS} />)

    expect(component.find('EditorialResults').props().onClickMore).toBe(fetchMore)
  })
})
