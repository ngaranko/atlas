import { formatNoResultsMessage } from './utils'

describe('NoSearchResults - Utilities', () => {
  describe('formatNoResultsMessage', () => {
    it('should format a message without a query', () => {
      expect(formatNoResultsMessage('', '')).toEqual('Er zijn geen resultaten gevonden.')
      expect(formatNoResultsMessage('  ', '')).toEqual('Er zijn geen resultaten gevonden.')
    })

    it('should format a message with a query', () => {
      expect(formatNoResultsMessage('Hello', '')).toEqual(
        "Er zijn geen resultaten gevonden met 'Hello'.",
      )
    })

    it('should format a message with a query and a label', () => {
      expect(formatNoResultsMessage('Hello', 'World')).toEqual(
        "Er zijn geen resultaten gevonden met 'Hello' binnen de categorie 'World'.",
      )
    })
  })
})
