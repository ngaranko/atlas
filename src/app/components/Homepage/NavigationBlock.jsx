import React from 'react'
import styled, { css } from '@datapunt/asc-core'
import { CardContainer, themeColor, breakpoint, styles, svgFill } from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import { focusImage, fullGridWidthContainer } from './services/styles'
import navigationLinks from './services/navigation-links'
import NavigationLinkCard from './NavigationLinkCard'

/* Generate the arrow / triangle in the left corner */
const whiteCorner = () => css`
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    &::before {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      left: 0;
      top: 0;
      border-style: solid;
      border-width: 24px 24px 0 0;
      border-color: #fff transparent transparent transparent;
    }
  }
`

const NavigationBlockStyle = styled(CardContainer)`
  position: relative;
  background-color: ${themeColor('support', 'valid')};
  ${({ showError }) => showError && ErrorBackgroundCSS}

  ${fullGridWidthContainer()}
  ${whiteCorner()}

  @media screen and ${breakpoint('max-width', 'laptop')}{
    margin-top: 32px
  }

  /* Separate content in two columns on tabletM only */
  @media screen and ${breakpoint('min-width', 'tabletM')} and ${breakpoint('max-width', 'laptop')} {
    column-count: 2;
    column-gap: 8px;
    /* Calculate the padding-bottom minus margin-bottom of the card */
    padding-bottom: calc(24px - 8px);

    /*
    Fallback in case of having an unequal count of cards
    eg: 5 cards instead of 6
    because that breaks the design in Firefox and Safari
    */
    ${/* sc-selector */ styles.CardStyle}, ${styles.LinkStyle} {
      display: inline-flex;
      width: 100%;
      break-inside: avoid;
    }

    ${styles.LinkStyle} {
      display: inline-flex;
    }
  }

  ${styles.LinkStyle} {
    position: relative;
    width: 100%;
    margin-bottom: 8px;

    &:hover{
      ${styles.HeadingStyle} {
        color: ${themeColor('secondary')};
        text-decoration: underline;}

      ${styles.CardActionsStyle} ${styles.IconStyle} {
        ${svgFill('secondary')};
      }
    }

    &:focus {
      background: none;

      ${/* sc-selector */ styles.CardStyle}::after {
        ${focusImage()}
      }
    }

    &:last-child {
      margin-bottom:0px;
    }
  }

  ${styles.CardMediaWrapperStyle} {
    width: 13%;

    @media screen and ${breakpoint('max-width', 'mobileL')} {
      min-width: 50px;

      ${styles.IconStyle} {
        transform: scale(0.85);
      }
    }

    @media screen and ${breakpoint('min-width', 'tabletM')} {
      width: 23%;

      ${styles.IconStyle} {
        transform: scale(1.15);
      }
    }
  }

  ${styles.CardContentStyle} {
    min-height: inherit;
    align-self: flex-start;
    padding: 8px;

    @media screen and ${breakpoint('min-width', 'tabletS')} {
      padding: 6px 12px 6px;
    }
  }

  ${styles.CardActionsStyle} {
    padding-right: 12px;
    padding-left: 0;
  }

  ${styles.IconStyle} {
    @media screen and ${breakpoint('max-width', 'mobileL')} {
      max-width: 36px;
    }
  }

  ${styles.HeadingStyle} {
    margin-bottom: 0;
  }

  ${styles.ParagraphStyle} {
    font-size: 14px;
    line-height: 17px;

    @media screen and ${breakpoint('min-width', 'laptopM')} {
      font-size: inherit;
      line-height: inherit;
    }

  }

  ${styles.CardStyle} {
    min-height: 73px;
    margin-bottom: 0;
  }
`

const NavigationBlock = ({ loading, showError, ...otherProps }) => (
  <NavigationBlockStyle {...otherProps} showError={showError} hasPaddingBottom>
    {showError && <ErrorMessage onClick={() => {}} />}
    {navigationLinks.map(linkProps => (
      <NavigationLinkCard loading={loading} showError={showError} {...linkProps} />
    ))}
  </NavigationBlockStyle>
)

export default NavigationBlock
