import React from 'react'
import { Api, Data, DocumentText, Map, Pano, Table } from '@datapunt/asc-assets'
import { Icon } from '@datapunt/asc-ui'
import {
  toMap,
  toPanoramaAndPreserveQuery,
  toPublicationOverview,
  toDatasets,
  toAdresses,
} from '../../../../store/redux-first-router/actions'
import linkAttributesFromAction from '../../../../shared/services/link-attributes-from-action/linkAttributesFromAction'

const navigationLinks = [
  {
    href: linkAttributesFromAction(toMap()).href,
    CardIcon: () => (
      <Icon square size={32}>
        <Map />
      </Icon>
    ),
    title: 'Kaart',
    description: 'Zoek en bekijk data op de kaart',
  },
  {
    href: linkAttributesFromAction(toPanoramaAndPreserveQuery()).href,
    CardIcon: () => (
      <Icon size={36}>
        <Pano />
      </Icon>
    ),
    title: 'Panoramabeelden',
    description: 'Kijk 360 graden in het rond',
  },
  {
    href: linkAttributesFromAction(toPublicationOverview()).href,
    CardIcon: () => (
      <Icon size={36}>
        <DocumentText />
      </Icon>
    ),
    title: 'Publicaties',
    description: 'Download fasctsheets en onderzoeksrapporten',
  },
  {
    href: linkAttributesFromAction(toDatasets()).href,
    CardIcon: () => (
      <Icon size={32}>
        <Data />
      </Icon>
    ),
    title: 'Datasets',
    description: 'Zoek en download databestanden',
  },
  {
    href: linkAttributesFromAction(toAdresses()).href,
    CardIcon: () => (
      <Icon size={32}>
        <Table />
      </Icon>
    ),
    title: 'Tabellen',
    description: 'Selecteer data en sla op als spreadsheet',
  },
  {
    href: '/',
    CardIcon: () => (
      <Icon size={36}>
        <Api />
      </Icon>
    ),
    title: 'Data services',
    description: 'Alles over het koppelen van data via APIs',
  },
]

export default navigationLinks
