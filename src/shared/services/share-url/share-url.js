import { SHARE_OPTIONS } from '../../ducks/ui/ui';

export default function getShareUrl(target, window) {
  const href = window.location.href;
  const title = window.document.title;
  switch (target) {
    case SHARE_OPTIONS.FACEBOOK:
      return {
        url: `https://www.facebook.com/sharer/sharer.php?u=${href}&og:title=${title}`,
        target: '_blank'
      };
    case SHARE_OPTIONS.TWITTER:
      return {
        url: `https://twitter.com/intent/tweet?url=${href}&text=${title}`,
        target: '_blank'
      };
    case SHARE_OPTIONS.LINKEDIN:
      return {
        url: `https://www.linkedin.com/shareArticle?url=${href}&mini=true&title=${title}`,
        target: '_blank'
      };
    case SHARE_OPTIONS.EMAIL:
      return {
        url: `mailto:?subject=Gemaild vanaf data.amsterdam.nl&body=Zie: ${escape(href)}`,
        target: '_self'
      };
    default:
      return null;
  }
}
