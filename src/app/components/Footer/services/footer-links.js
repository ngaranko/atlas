import {
  cmsIds,
  OVER_OIS,
  RESOURCES,
  DESCRIPTION_USAGE,
  AMSTERDAM_EN_DATA,
  RESEARCH_BY_OIS,
} from '../../../../shared/config/cms.config'

export const OVER_OIS_LINKS = [
  {
    title: 'Onderzoek, Informatie en Statistiek',
    id: cmsIds[OVER_OIS],
    slug: OVER_OIS,
  },
  { title: 'Onderzoek', id: cmsIds[RESEARCH_BY_OIS], slug: RESEARCH_BY_OIS },
]

export const OVER_DATA_LINKS = [
  {
    title: 'Databeleid',
    id: cmsIds[AMSTERDAM_EN_DATA],
    slug: AMSTERDAM_EN_DATA,
  },
  { title: 'Bronnen', id: cmsIds[RESOURCES], slug: RESOURCES },
]

export const OVER_DEZE_SITE_LINKS = [
  {
    title: 'Over deze site',
    id: cmsIds[DESCRIPTION_USAGE],
    slug: DESCRIPTION_USAGE,
  },
  { title: 'Over OIS', id: cmsIds[OVER_OIS], slug: OVER_OIS },
]

export const OIS_LINKS = [...OVER_OIS_LINKS, ...OVER_DATA_LINKS]

export const COLOFON_LINKS = [...OVER_DEZE_SITE_LINKS, ...OVER_DATA_LINKS]

export const FOLLOW_LINKS = [
  {
    id: 0,
    title: 'Nieuwsbrief OIS',
    href:
      'https://www.amsterdam.nl/nieuwsbrieven/bestuur-organisatie/dienstverlening/nieuwsbrief-data/nieuwsbrief-data/',
  },
  { id: 1, title: 'Twitter', href: 'https://twitter.com/AmsterdamNL' },
  { id: 2, title: 'Facebook', href: 'https://www.facebook.com/gemeenteamsterdam' },
  { id: 3, title: 'LinkedIn', href: 'https://www.linkedin.com/company/gemeente-amsterdam' },
  { id: 4, title: 'GitHub', href: 'https://github.com/Amsterdam' },
]
