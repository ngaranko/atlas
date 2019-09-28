import React from 'react'
import { Api, Data, DocumentText, Map, Pano, Table } from '@datapunt/asc-assets'
import { Icon } from '@datapunt/asc-ui'
import {
  toPublicationOverview,
  toApisPage,
  toAdresses,
  toDatasets,
  toPanoramaAndPreserveQuery,
  toMap,
} from '../../../../store/redux-first-router/actions'

const NAVIGATION_LINKS = [
  {
    id: 0,
    href: '/',
    CardIcon: () => (
      <Icon square size={32}>
        <Map />
      </Icon>
    ),
    title: 'Kaart',
    description: 'Zoek en bekijk data op de kaart',
    toAction: toMap(),
  },
  {
    id: 1,
    href: '/',
    CardIcon: () => (
      <Icon size={36}>
        <Pano />
      </Icon>
    ),
    title: 'Panoramabeelden',
    description: 'Kijk 360 graden in het rond',
    toAction: toPanoramaAndPreserveQuery(undefined, undefined, undefined, 'home'),
  },
  {
    id: 2,
    href: '/',
    CardIcon: () => (
      <Icon size={36}>
        <DocumentText />
      </Icon>
    ),
    title: 'Publicaties',
    description: 'Download fasctsheets en onderzoeksrapporten',
    toAction: toPublicationOverview(),
  },
  {
    id: 3,
    href: '/',
    CardIcon: () => (
      <Icon size={32}>
        <Data />
      </Icon>
    ),
    title: 'Datasets',
    description: 'Zoek en download databestanden',
    toAction: toDatasets(),
  },
  {
    id: 4,
    href: '/',
    CardIcon: () => (
      <Icon size={32}>
        <Table />
      </Icon>
    ),
    title: 'Tabellen',
    description: 'Selecteer data en sla op als spreadsheet',
    toAction: toAdresses(),
  },
  {
    id: 5,
    href: '/',
    CardIcon: () => (
      <Icon size={36}>
        <Api />
      </Icon>
    ),
    title: 'Data services',
    description: 'Alles over het koppelen van data via APIs',
    toAction: toApisPage(),
  },
]

export default NAVIGATION_LINKS
