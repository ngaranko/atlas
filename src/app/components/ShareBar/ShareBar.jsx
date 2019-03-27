import React from 'react';
import PropTypes from 'prop-types';
import Facebook from '@datapunt/asc-assets/lib/Icons/Facebook.svg';
import Twitter from '@datapunt/asc-assets/lib/Icons/Twitter.svg';
import Linkedin from '@datapunt/asc-assets/lib/Icons/Linkedin.svg';
import Email from '@datapunt/asc-assets/lib/Icons/Email.svg';
import Print from '@datapunt/asc-assets/lib/Icons/Print.svg';
import { ShareBar, ShareButton } from '@datapunt/asc-ui';

const ShareBarComponent = ({ hasPrintButton }) => (
  <ShareBar>
    <ShareButton
      onClick={() =>
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' +
            `${window.location.href}&title=${window.document.title}`,
          '_blank',
        )
      }
      hoverColor="#3b5999"
    >
      <Facebook />
    </ShareButton>
    <ShareButton
      onClick={() =>
        window.open(
          `https://twitter.com/intent/tweet?url=${window.location.href}` +
            `&text=${window.document.title}`,
          '_blank',
        )
      }
      hoverColor="#55acee"
    >
      <Twitter />
    </ShareButton>
    <ShareButton
      onClick={() =>
        window.open(
          `
          https://www.linkedin.com/shareArticle?url=${window.location.href}` +
            `&mini=true&title=${window.document.title}`,
          '_blank',
        )
      }
      hoverColor="#0077B5"
    >
      <Linkedin />
    </ShareButton>
    <ShareButton
      onClick={() =>
        window.open(
          `mailto:?subject=${window.document.title.slice(0, 77)}` +
            `&title=${escape(window.location.href)}`,
        )
      }
    >
      <Email />
    </ShareButton>
    {
      (hasPrintButton) && <ShareButton onClick={() => window.print()}>
        <Print />
      </ShareButton>
    }
  </ShareBar>
);

ShareBarComponent.propTypes = {
  hasPrintButton: PropTypes.bool.isRequired
};

export default ShareBarComponent;
