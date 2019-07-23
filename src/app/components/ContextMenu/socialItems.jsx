import React from 'react'
import { ReactComponent as FacebookPadded } from '@datapunt/asc-assets/lib/Icons/FacebookPadded.svg'
import { ReactComponent as Twitter } from '@datapunt/asc-assets/lib/Icons/Twitter.svg'
import { ReactComponent as Linkedin } from '@datapunt/asc-assets/lib/Icons/Linkedin.svg'
import { ReactComponent as Email } from '@datapunt/asc-assets/lib/Icons/Email.svg'
import { ContextMenuItem, Icon } from '@datapunt/asc-ui'
import getShareUrl from '../../../shared/services/share-url/share-url'

const socialItemsArray = [
  {
    id: 1,
    title: 'Facebook',
    link: 'facebook',
    icon: <FacebookPadded />,
  },
  {
    id: 2,
    title: 'Twitter',
    link: 'twitter',
    icon: <Twitter />,
  },
  {
    id: 3,
    title: 'Linkedin',
    link: 'linkedin',
    icon: <Linkedin />,
  },
  {
    id: 4,
    title: 'E-mail',
    link: 'email',
    icon: <Email />,
  },
]

const socialItems = openSharePage => {
  const handlePageShare = target => {
    openSharePage(target)

    const link = getShareUrl(target, window)
    window.open(link.url, link.target)
  }

  return socialItemsArray.map(({ link, title, icon, id }) => (
    <ContextMenuItem
      key={id}
      role="button"
      onClick={() => handlePageShare(link)}
      icon={
        <Icon inline size={24} padding={4}>
          {icon}
        </Icon>
      }
    >
      Deel via {title}
    </ContextMenuItem>
  ))
}

export default socialItems