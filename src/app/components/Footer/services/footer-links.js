import {
  OVER_OIS,
  BRONNEN,
  AMSTERDAM_EN_DATA,
  WAT_KUN_JE_HIER,
  cmsIds,
} from '../../../../shared/services/cms/cms.config'

export const colofonLinks = [
  { title: 'Over deze site', id: cmsIds[WAT_KUN_JE_HIER], slug: WAT_KUN_JE_HIER },
  { title: 'Over OIS', id: cmsIds[OVER_OIS], slug: OVER_OIS },
  { title: 'Databeleid', id: cmsIds[AMSTERDAM_EN_DATA], slug: AMSTERDAM_EN_DATA },
  { title: 'Bronnen', id: cmsIds[BRONNEN], slug: BRONNEN },
]

export const followLinks = [
  {
    title: 'Nieuwsbrief OIS',
    href:
      'https://www.amsterdam.nl/nieuwsbrieven/bestuur-organisatie/dienstverlening/nieuwsbrief-data/nieuwsbrief-data/',
  },
  { title: 'Twitter', href: 'https://twitter.com/AmsterdamNL' },
  { title: 'Facebook', href: 'https://www.facebook.com/gemeenteamsterdam' },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/company/gemeente-amsterdam' },
  { title: 'GitHub', href: 'https://github.com/Amsterdam' },
]
