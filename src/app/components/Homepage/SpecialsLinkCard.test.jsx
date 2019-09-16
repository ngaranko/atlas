import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { ThemeProvider } from '@datapunt/asc-ui'
import SpecialsLinkCard from './SpecialsLinkCard'
import 'jest-styled-components'

describe('SpecialsLinkCard', () => {
  const testProps = {
    href: 'https://this-is-a-link',
    title: 'this is the title',
    description: 'this is the description.',
  }

  beforeEach(cleanup)

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render and apply the style', () => {
    const { queryByText, queryByTestId } = render(
      <ThemeProvider>
        <SpecialsLinkCard data-testid="test-id" {...testProps} loading />
      </ThemeProvider>,
    )
    const card = queryByTestId('test-id')
    expect(card).not.toBeNull()
    expect(card).toHaveStyleRule('display', 'inline-block')
    expect(queryByText(testProps.title)).not.toBeNull()
  })
})
