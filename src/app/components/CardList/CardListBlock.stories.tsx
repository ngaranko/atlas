import React from 'react'
import styled from '@datapunt/asc-core'
import { Row, Column, themeColor, themeSpacing, breakpoint } from '@datapunt/asc-ui'
import CardList from './CardList'

export default {
  title: 'Dataportaal/Dossiers/CardListBlock',

  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '40px 10px' }}>{storyFn()}</div>,
  ],
}

const CardListBlock = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: ${themeSpacing(8, 5, 0)};
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

export const DefaultState = () => {
  const lists = ['List 1', 'Second list', 'Another List']

  return (
    <Column
      span={{
        small: 1,
        medium: 2,
        big: 6,
        large: lists.length * 3,
        xLarge: lists.length * 3,
      }}
    >
      <CardListBlock>
        <Row halign="flex-start" hasMargin={false}>
          {lists.map(list => (
            <StyledColumn wrap span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
              <CardList title={list} />
            </StyledColumn>
          ))}
        </Row>
      </CardListBlock>
    </Column>
  )
}
