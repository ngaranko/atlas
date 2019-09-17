import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { ThemeProvider } from '@datapunt/asc-ui'
import AboutLinkCard from './AboutLinkCard'
import 'jest-styled-components'

describe('AboutLinkCard', () => {
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
        <AboutLinkCard data-testid="test-id" {...testProps} loading />
      </ThemeProvider>,
    )
    const card = queryByTestId('test-id')
    expect(card).not.toBeNull()
    expect(card).toHaveStyleRule('display', 'inline-block')
    expect(queryByText(testProps.title)).not.toBeNull()
  })
})
