import React from 'react'
import SpecialBlock from '../SpecialBlock'

export default {
  title: 'Dataportaal/Homepage/SpecialBlock',

  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '40px 10px' }}>{storyFn()}</div>,
  ],
}

export const DefaultState = () => <SpecialBlock />
