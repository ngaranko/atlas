import * as urql from 'urql'
import gql from 'graphql-tag'
import usePagination from './usePagination'

jest.mock('urql')
jest.mock('graphql')

describe('usePagination', () => {
  const mockUseQuery = jest.spyOn(urql, 'useQuery').mockImplementation(() => {})

  const mockQuery = gql`
    {
      user(id: 5) {
        firstName
        lastName
      }
    }
  `

  it('should do something', () => {
    const output = usePagination(mockQuery, {}, 'resolver')

    expect(output).toBe('')

    expect(mockUseQuery).toHaveBeenCalled()
  })
})
