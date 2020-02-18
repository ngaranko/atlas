import styled from '@datapunt/asc-core'
import { Heading, breakpoint, themeSpacing } from '@datapunt/asc-ui'

const BlockHeading = styled(Heading)`
  width: 100%;

  @media screen and ${breakpoint('max-width', 'laptopL')} {
    margin-bottom: ${themeSpacing(4)};
  }

  @media screen and ${breakpoint('min-width', 'laptopL')} {
    margin-bottom: ${themeSpacing(6)};
  }
`

export default BlockHeading
