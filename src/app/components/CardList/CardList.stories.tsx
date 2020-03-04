import React from 'react'
import CardList from './CardList'
import { cmsConfig } from '../../../shared/config/config'

export default {
  title: 'Dataportaal/Dossiers/CardList',

  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '40px 10px' }}>{storyFn()}</div>,
  ],
}

export const DefaultState = () => <CardList title="Example list" list={cmsConfig.HOME_HIGHLIGHT} />
