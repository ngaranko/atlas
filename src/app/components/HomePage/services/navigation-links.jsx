import React from 'react'
import { Api, Data, DocumentText, Map, Pano, Table } from '@datapunt/asc-assets'
import { Icon } from '@datapunt/asc-ui'
import {
  toMap,
  toPanoramaAndPreserveQuery,
  toPublicationOverview,
  toArticleDetail,
  toDatasets,
} from '../../../../store/redux-first-router/actions'
import { NAVIGATION_LINKS } from '../../../../shared/config/config'

export default [
  {
    id: 0,
    to: toMap(),
    CardIcon: () => (
      <Icon square size={32}>
        <Map />
      </Icon>
    ),
    title: 'Kaart',
    description: 'Zoek en bekijk data op de kaart',
  },
  {
    id: 1,
    to: toPanoramaAndPreserveQuery(undefined, undefined, undefined, 'home'),
    CardIcon: () => (
      <Icon size={36}>
        <Pano />
      </Icon>
    ),
    title: 'Panoramabeelden',
    description: 'Kijk 360 graden in het rond',
  },
  {
    id: 2,
    to: toPublicationOverview(),
    CardIcon: () => (
      <Icon size={36}>
        <DocumentText />
      </Icon>
    ),
    title: 'Publicaties',
    description: 'Download fasctsheets en onderzoeksrapporten',
  },
  {
    id: 3,
    to: toDatasets(),
    CardIcon: () => (
      <Icon size={32}>
        <Data />
      </Icon>
    ),
    title: 'Datasets',
    description: 'Zoek en download databestanden',
  },
  {
    id: 4,
    to: toArticleDetail(
      NAVIGATION_LINKS.DATA_IN_TABLES.id[process.env.NODE_ENV],
      NAVIGATION_LINKS.DATA_IN_TABLES.slug,
    ),
    CardIcon: () => (
      <Icon size={32}>
        <Table />
      </Icon>
    ),
    title: NAVIGATION_LINKS.DATA_IN_TABLES.title,
    description: NAVIGATION_LINKS.DATA_IN_TABLES.description,
  },
  {
    id: 5,
    to: toArticleDetail(
      NAVIGATION_LINKS.DATA_SERVICES.id[process.env.NODE_ENV],
      NAVIGATION_LINKS.DATA_SERVICES.slug,
    ),
    CardIcon: () => (
      <Icon size={36}>
        <Api />
      </Icon>
    ),
    title: NAVIGATION_LINKS.DATA_SERVICES.title,
    description: NAVIGATION_LINKS.DATA_SERVICES.description,
  },
]
