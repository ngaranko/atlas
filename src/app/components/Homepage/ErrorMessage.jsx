import React from 'react'
import styled, { css } from '@datapunt/asc-core'
import { breakpoint, Button, Paragraph, themeColor } from '@datapunt/asc-ui'

const ErrorMessageStyle = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  padding: 20px;
  border: 1px solid ${themeColor('tint', 'level4')};
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`

export const ErrorBackgroundCSS = css`
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${themeColor('tint', 'level1')};
    opacity: 0.8;
  }
`

const ErrorMessage = ({ onClick }) => (
  <ErrorMessageStyle>
    <Paragraph>Er is een fout opgetreden bij het laden van dit blok.</Paragraph>
    <Button type="button" onClick={onClick} variant="primary" taskflow={false}>
      Probeer opnieuw
    </Button>
  </ErrorMessageStyle>
)

export default ErrorMessage
