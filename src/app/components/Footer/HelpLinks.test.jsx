import React from 'react'
import { shallow } from 'enzyme'
import { FooterLinkListItem } from '@datapunt/asc-ui'
import HelpLinks, { FeedbackLink } from './HelpLinks'
import FooterLinks from './FooterLinks'
import { openFeedbackForm } from '../Modal/FeedbackModal'

jest.mock('../Modal/FeedbackModal')

describe('HelpLinks', () => {
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
    component = shallow(<HelpLinks links={links} />)
  })

  it('should render all links and the feedback link', () => {
    const linkList = component.find(FooterLinks).dive()

    expect(linkList.find(FooterLinkListItem).length).toEqual(links.length + 1)
  })

  it('should open the feedback form', () => {
    component.find(FeedbackLink).simulate('click')

    expect(openFeedbackForm.mock.calls.length).toBe(1)
  })
})
