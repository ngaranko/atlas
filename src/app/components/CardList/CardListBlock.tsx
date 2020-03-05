import React from 'react'
import { Row, Column, themeColor, themeSpacing, breakpoint } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import CardList from './CardList'
import { cmsConfig } from '../../../shared/config/config'

const StyledRow = styled(Row)`
  background-color: ${themeColor('tint', 'level3')};
`

const StyledOuterColumn = styled(Column)`
  background-color: ${themeColor('tint', 'level2')};
  padding: ${themeSpacing(8, 5, 0)}; // Padding on the right is added by the last rendered child
`

const StyledColumn = styled(Column)`
  margin-right: ${themeSpacing(5)};
  margin-bottom: ${themeSpacing(8)};

  :last-of-type {
    margin-right: 0;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    :nth-child(even) {
      margin-right: 0px;
    } // There are only two CardList components on this breakpoint
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    margin-right: 0px;
  }
`

const CardListBlock: React.FC<{}> = () => {
  const lists = ['List 1', 'Second list', 'Another List', 'List 4']

  return (
    <StyledRow hasMargin={false}>
      <StyledOuterColumn
        span={{
          small: 1,
          medium: 2,
          big: 6,
          large: lists.length * 3,
          xLarge: lists.length * 3,
        }}
      >
        <Row halign="flex-start" hasMargin={false}>
          {lists.map(list => (
            <StyledColumn wrap span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
              <CardList title={list} list={cmsConfig.HOME_SPECIALS} />
            </StyledColumn>
          ))}
        </Row>
      </StyledOuterColumn>
    </StyledRow>
  )
}

export default CardListBlock
