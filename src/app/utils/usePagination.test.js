import { renderHook } from '@testing-library/react-hooks'
import { useQuery } from 'urql'
import usePagination from './usePagination'

jest.mock('urql')
jest.useFakeTimers()

describe('usePagination', () => {
  const mockResults = [
    {
      type: 'foo',
      results: [
        {
          field: 'field',
        },
      ],
    },
  ]

  afterEach(() => {
    useQuery.mockReset()
  })

  it('should have correct initial values', async () => {
    useQuery.mockImplementation(() => [
      {
        fetching: true,
        data: {},
        error: false,
      },
    ])

    const { result } = renderHook(() =>
      usePagination('query getTest() {}', { q: 'foo', types: 'foo' }, 10, 0),
    )

    const [props] = result.current

    expect(props).toEqual({ data: {}, error: false, fetching: true })
  })

  it('should set the results', () => {
    useQuery.mockImplementation(() => [
      {
        fetching: false,
        data: {
          cmsSearch: {
            results: mockResults,
          },
        },
        error: false,
      },
    ])

    const { result } = renderHook(() =>
      usePagination('query getTest() {}', { q: 'foo', types: 'foo' }, 10, 0),
    )

    const [props] = result.current

    expect(props).toEqual({
      data: {
        type: 'foo',
        results: [{ field: 'field' }],
      },
      error: false,
      fetching: false,
    })
  })
})
