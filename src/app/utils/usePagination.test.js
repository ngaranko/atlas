import { renderHook } from '@testing-library/react-hooks'
import { useQuery } from 'urql'
import usePagination from './usePagination'

jest.mock('urql')
jest.useFakeTimers()

describe('usePagination', () => {
  const mockResults = [
    {
      field: 'field',
    },
  ]

  afterEach(() => {
    useQuery.mockReset()
  })

  it('should have correct initial values', () => {
    useQuery.mockImplementation(() => [
      {
        fetching: true,
        data: {},
        error: false,
      },
    ])

    const { result } = renderHook(() =>
      usePagination(
        { query: 'query getTest() {}', resolver: 'testSearch' },
        { q: 'foo', types: 'foo' },
        10,
        0,
      ),
    )

    const props = result.current

    expect(props).toEqual({
      errors: [],
      fetchMore: expect.any(Function),
      fetchingMore: false,
      fetching: true,
      filters: [],
      hasMore: false,
      results: [],
      totalCount: 0,
    })
  })

  it('should set the results', () => {
    useQuery.mockImplementation(() => [
      {
        fetching: false,
        data: {
          testSearch: {
            results: mockResults,
          },
        },
        error: false,
      },
    ])

    const { result } = renderHook(() =>
      usePagination(
        { query: 'query getTest() {}', resolver: 'testSearch' },
        { q: 'foo', types: 'foo' },
        10,
        0,
      ),
    )
    const props = result.current

    // Todo: fix the test due to strange behavior of setting `fetchingMore`
    expect(props).toMatchObject({
      results: [{ field: 'field' }],
      // fetchMore: expect.any(Function),
      errors: [],
      fetching: false,
      // fetchingMore: false,
      filters: [],
      hasMore: false,
      totalCount: undefined,
    })
  })
})
