import React from 'react'
import { Row, Column, themeColor } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import CardList from './CardList'

const StyledRow = styled(Row)`
  background-color: ${themeColor('tint', 'level3')};
`

const CardListBlock = () => {
  const lists = ['List 1', 'Second list', 'Another List', 'List 4']

  return (
    <StyledRow hasMargin={false}>
      {lists.map(list => (
        <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
          <CardList title={list} />
        </Column>
      ))}
    </StyledRow>
  )
}

export default CardListBlock
