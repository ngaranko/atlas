import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Map } from '@datapunt/asc-assets'
import { ThemeProvider, Icon } from '@datapunt/asc-ui'
import NavigationLinkCard from './NavigationLinkCard'
import 'jest-styled-components'

describe('NavigationLinkCard', () => {
  const testProps = {
    href: 'https://this-is-a-link',
    title: 'this is the title',
    description: 'this is the description.',
    CardIcon: () => (
      <Icon size={20}>
        <Map />
      </Icon>
    ),
  }

  beforeEach(cleanup)

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render and apply the style', () => {
    const { queryByText, queryByTestId } = render(
      <ThemeProvider>
        <NavigationLinkCard data-testid="test-id" {...testProps} />
      </ThemeProvider>,
    )
    const card = queryByTestId('test-id')
    expect(card).not.toBeNull()
    expect(card).toHaveStyleRule('display', 'inline-block')
    expect(queryByText(testProps.title)).not.toBeNull()
  })
})
