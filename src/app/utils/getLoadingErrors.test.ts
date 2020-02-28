import { GraphQLFormattedError } from 'graphql'
import { ErrorExtensions } from '../models/graphql'
import getLoadingErrors from './getLoadingErrors'

describe('getLoadingErrors', () => {
  it('should get the loading errors', () => {
    const errors: GraphQLFormattedError<ErrorExtensions>[] = []

    expect(getLoadingErrors(errors)).toEqual([])
  })
})
