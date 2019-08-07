import React from 'react'
import { GridContainer, GridItem } from '@datapunt/asc-ui'

const withGrid = (children, gutter = 20, direction = 'column') => (
  <GridContainer direction={direction} gutterX={gutter} gutterY={gutter}>
    <GridItem>{children}</GridItem>
  </GridContainer>
)

export default withGrid
