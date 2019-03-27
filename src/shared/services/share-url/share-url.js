import { SHARE_OPTIONS } from '../../ducks/ui/ui';

export default function getSocialUrl(target, window) {
  switch (target) {
    case SHARE_OPTIONS.FACEBOOK:
      return `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&title=${window.document.title}`;
    case SHARE_OPTIONS.TWITTER:
      return `https://twitter.com/intent/tweet?url=${window.location.href}&text=${window.document.title}`;
    case SHARE_OPTIONS.LINKEDIN:
      return `https://www.linkedin.com/shareArticle?url=${window.location.href}&mini=true&title=${window.document.title}`;
    case SHARE_OPTIONS.EMAIL:
      return `mailto:?subject='Gemaild vanaf data.amsterdam.nl'&title='Zie: ${escape(window.location.href)}'`;
    default:
      return false;
  }
}
