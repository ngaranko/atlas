import React from 'react'
import CardListBlock from './CardListBlock'

export default {
  title: 'Dataportaal/Dossiers/CardListBlock2',

  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '40px 10px' }}>{storyFn()}</div>,
  ],
}

export const DefaultState = () => <CardListBlock />
