import getShareUrl from './share-url'
import { SHARE_OPTIONS } from '../../ducks/ui/ui'

describe('getShareUrl', () => {
  const window = {
    location: {
      href: 'https://amsterdam.nl',
    },
    document: {
      title: 'Gemeente Amsterdam',
    },
  }

  it('should open up a share url', () => {
    let shareUrl = getShareUrl(SHARE_OPTIONS.FACEBOOK, window)

    expect(shareUrl.url).toContain(window.location.href)
    expect(shareUrl.url).toContain(window.document.title)
    expect(shareUrl.target).toBe('_blank')

    shareUrl = getShareUrl(SHARE_OPTIONS.TWITTER, window)

    expect(shareUrl.url).toContain(window.location.href)
    expect(shareUrl.url).toContain(window.document.title)
    expect(shareUrl.target).toBe('_blank')

    shareUrl = getShareUrl(SHARE_OPTIONS.LINKEDIN, window)

    expect(shareUrl.url).toContain(window.location.href)
    expect(shareUrl.url).toContain(window.document.title)
    expect(shareUrl.target).toBe('_blank')

    shareUrl = getShareUrl(SHARE_OPTIONS.EMAIL, window)

    expect(shareUrl.url).toContain(escape(window.location.href))
    expect(shareUrl.target).toBe('_self')
  })
})
