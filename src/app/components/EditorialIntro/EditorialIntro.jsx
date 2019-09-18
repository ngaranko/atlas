import React from 'react'
import styled from '@datapunt/asc-core'
import { Paragraph, breakpoint } from '@datapunt/asc-ui'

const StyledParagraph = styled(Paragraph)`
  @media screen and ${breakpoint('min-width', 'tabletS')} {
    font-size: 18px;
    line-height: 25px;
  }
`

const EditorialIntro = ({ children }) => <StyledParagraph strong>{children}</StyledParagraph>

export default EditorialIntro
