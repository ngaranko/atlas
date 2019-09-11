import { css } from '@datapunt/asc-core'
import { breakpoint, themeColor } from '@datapunt/asc-ui'

/**
 *
 * A full width container that fills the git width depending on the different media query breakpoints
 *
 */
export const fullGridWidthContainer = () => css`
  @media screen and ${breakpoint('max-width', 'mobileL')} {
    padding: 20px ${({ hasMargin }) => (hasMargin ? 40 : 20)}px;
    margin-left:-20px;
    margin-right:-20px;
    width: calc(100% + 40px)
  }

  @media screen and ${breakpoint('min-width', 'mobileL')} and ${breakpoint(
  'max-width',
  'tabletM',
)} {
    padding: 24px ${({ hasMargin }) => (hasMargin ? 48 : 24)}px;
    margin-left: -24px;
    margin-right: -24px;
    width: calc(100% + 48px);
  }

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    padding: 24px;
  }
`

/**
 * Generates the top margin for blocks for vertical uniformity in a page
 *
 */
export const blockTopMargin = (offset = 0) => css`
  width: 100%;
  margin-top: ${40 - offset}px;
  @media screen and ${breakpoint('min-width', 'laptopM')} {
    margin-top: ${80 - offset}px;
  }
`
export const focusImage = (width = 4) =>
  css`
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: ${width}px solid ${themeColor('support', 'focus')};
  `
