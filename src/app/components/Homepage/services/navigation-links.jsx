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

const navigationLinks = [
  {
    href: '/',
    CardIcon: () => (
      <Icon size={20}>
        <Map />
      </Icon>
    ),
    title: 'Kaart',
    description: 'Zoek en bekijk data op de kaart',
    toAction: toMap(),
  },
  {
    href: '/',
    CardIcon: () => (
      <Icon size={30}>
        <Pano />
      </Icon>
    ),
    title: 'Panoramabeelden',
    description: 'Kijk 360 graden in het rond',
    toAction: toPanoramaAndPreserveQuery(undefined, undefined, undefined, 'home'),
  },
  {
    href: '/',
    CardIcon: () => (
      <Icon size={30}>
        <DocumentText />
      </Icon>
    ),
    title: 'Publicaties',
    description: 'Download fasctsheets en onderzoeksrapporten',
    toAction: toPublicationOverview(),
  },
  {
    href: '/',
    CardIcon: () => (
      <Icon size={30}>
        <Data />
      </Icon>
    ),
    title: 'Datasets',
    description: 'Zoek en download databestanden',
    toAction: toDatasets(),
  },
  {
    href: '/',
    CardIcon: () => (
      <Icon size={25}>
        <Table />
      </Icon>
    ),
    title: 'Tabellen',
    description: 'Selecteer data en sla op als spreadsheet',
    toAction: toAdresses(),
  },
  {
    href: '/',
    CardIcon: () => (
      <Icon size={30}>
        <Api />
      </Icon>
    ),
    title: 'Data services',
    description: 'Alles over het koppelen van data via APIs',
    toAction: toApisPage(),
  },
]

export default navigationLinks
