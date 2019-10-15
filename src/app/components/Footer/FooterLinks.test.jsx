import React from 'react'
import { shallow } from 'enzyme'
import { FooterLinkListItem, Link } from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'
import FooterLinks from './FooterLinks'

describe('FooterLinks', () => {
  let component

  const links = [
    {
      title: 'title',
      id: '123',
      href: 'https://mydomain.com/foo',
      slug: 'title',
    },
    {
      title: 'title',
      id: {
        development: '123',
        production: '321',
      },
      slug: 'title',
    },
  ]

  beforeEach(() => {
    component = shallow(<FooterLinks links={links} />)
  })

  it('should render all links', () => {
    expect(component.find(FooterLinkListItem).length).toEqual(links.length)
  })

  it('should render links as Link', () => {
    component.dive()
    const link = component.find(Link).at(0)

    expect(link.props()).toHaveProperty('href')
  })

  it('should render links as RouterLink', () => {
    component.dive()
    const link = component.find(Link).at(1)

    expect(link.props().$as).toBe(RouterLink)
    expect(link.props()).toHaveProperty('to')
  })

  it('should render all links and children', () => {
    component = shallow(
      <FooterLinks links={links}>
        <FooterLinkListItem>
          <Link>link</Link>
        </FooterLinkListItem>
      </FooterLinks>,
    )

    component = expect(component.find(FooterLinkListItem).length).toEqual(links.length + 1)
  })
})
