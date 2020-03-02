import React from 'react'
import CardList from './CardList'

export default {
  title: 'Dataportaal/Dossiers/CardList',

  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '40px 10px' }}>{storyFn()}</div>,
  ],
}

export const DefaultState = () => <CardList />
