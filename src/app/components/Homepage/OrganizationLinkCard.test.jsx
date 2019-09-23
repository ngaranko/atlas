import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { ThemeProvider } from '@datapunt/asc-ui'
import OrganizationLinkCard from './OrganizationLinkCard'
import 'jest-styled-components'

describe('OrganizationLinkCard', () => {
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
        <OrganizationLinkCard data-testid="test-id" {...testProps} loading />
      </ThemeProvider>,
    )
    const card = queryByTestId('test-id')
    expect(card).not.toBeNull()
    expect(card).toHaveStyleRule('border-top', '2px solid')
    expect(queryByText(testProps.title)).not.toBeNull()
  })
})
