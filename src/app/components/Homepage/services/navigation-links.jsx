import React from 'react'
import { Api, Data, DocumentText, Map, Pano, Table } from '@datapunt/asc-assets'
import { Icon } from '@datapunt/asc-ui'

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
  },
]

export default navigationLinks
