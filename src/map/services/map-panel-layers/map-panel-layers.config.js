import mapLayerTypes from '../map-layer-types.config';

const THEMES = {
  PANORAMA: 'Panoramabeelden'
}

export default [
  {
    id: 'pano',
    layer: 'panorama_new',
    legendItems: [
      {
        selectable: false,
        title: '2018'
      },
      {
        selectable: false,
        title: '2017'
      },
      {
        selectable: false,
        title: '2016'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama?version=1.3.0&service=WMS',
    params: {
      mission_type: 'bi'
    }
  },
  {
    id: 'pano2018bi',
    layer: 'panorama_new',
    legendItems: [
      {
        selectable: false,
        title: '2018'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: THEMES.PANORAMA,
    notClosable: true,
    url: '/maps/panorama?version=1.3.0&service=WMS',
    params: {
      mission_year: 2018,
      mission_type: 'bi'
    }
  },
  {
    id: 'pano2018woz',
    layer: 'panorama_new',
    legendItems: [
      {
        imageRule: '2018',
        selectable: false,
        title: '2018 WOZ'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama?version=1.3.0&service=WMS',
    params: {
      mission_year: 2018,
      mission_type: 'woz'
    }
  },
  {
    id: 'pano2017bi',
    layer: 'panorama_new',
    legendItems: [
      {
        selectable: false,
        title: '2017'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama?version=1.3.0&service=WMS',
    params: {
      mission_year: 2017,
      mission_type: 'bi'
    }
  },
  {
    id: 'pano2017woz',
    layer: 'panorama_new',
    legendItems: [
      {
        imageRule: '2017',
        selectable: false,
        title: '2017 WOZ'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: THEMES.PANORAMA,
    notClosable: true,
    url: '/maps/panorama?version=1.3.0&service=WMS',
    params: {
      mission_year: 2017,
      mission_type: 'woz'
    }
  },
  {
    id: 'pano2016bi',
    layer: 'panorama_new',
    legendItems: [
      {
        selectable: false,
        title: '2016'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama?version=1.3.0&service=WMS',
    params: {
      mission_year: 2016,
      mission_type: 'bi'
    }
  },
  {
    category: 'Geografie: onroerende zaken',
    legendItems: [
      {
        id: 'bgem',
        notClickable: true,
        selectable: true,
        title: 'Burgerlijke gemeente',
        layer: 'burgerlijke_gemeente'
      },
      {
        id: 'kgem',
        notClickable: true,
        selectable: true,
        title: 'Kadastrale gemeente',
        layer: 'kadastrale_gemeente'
      },
      {
        id: 'ksec',
        notClickable: true,
        selectable: true,
        title: 'Kadastrale sectie',
        layer: 'kadastrale_sectie'
      },
      {
        id: 'kot',
        selectable: true,
        title: 'Kadastraal object',
        layer: 'kadastraal_object',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Kadastrale perceelsgrenzen',
    url: '/maps/brk?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: onroerende zaken',
    legendItems: [
      {
        id: 'egga',
        layer: 'eigendommen',
        selectable: true,
        title: 'Gemeente Amsterdam',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-1.svg',
        url: 'maps/eigendommen?categorie=1',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 1
        }
      },
      {
        id: 'egog',
        layer: 'eigendommen',
        selectable: true,
        title: 'Overige gemeenten',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-2.svg',
        url: 'maps/eigendommen?categorie=2',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 2
        }
      },
      {
        id: 'egst',
        layer: 'eigendommen',
        selectable: true,
        title: 'Staat',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-3.svg',
        url: 'maps/eigendommen?categorie=3',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 3
        }
      },
      {
        id: 'egpr',
        layer: 'eigendommen',
        selectable: true,
        title: 'Provincies',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-4.svg',
        url: 'maps/eigendommen?categorie=4',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 4
        }
      },
      {
        id: 'egwa',
        layer: 'eigendommen',
        selectable: true,
        title: 'Waterschappen',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-5.svg',
        url: 'maps/eigendommen?categorie=5',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 5
        }
      },
      {
        id: 'egwo',
        layer: 'eigendommen',
        selectable: true,
        title: 'Woningbouwcorporaties',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-6.svg',
        url: 'maps/eigendommen?categorie=6',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 6
        }
      },
      {
        id: 'egve',
        layer: 'eigendommen',
        selectable: true,
        title: 'Verenigingen van eigenaren',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-7.svg',
        url: 'maps/eigendommen?categorie=7',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 7
        }
      },
      {
        id: 'egsp',
        layer: 'eigendommen',
        selectable: true,
        title: 'Spoorwegen/ProRail',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-8.svg',
        url: 'maps/eigendommen?categorie=8',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 8
        }
      },
      {
        id: 'egnnp',
        layer: 'eigendommen',
        selectable: true,
        title: 'Overige niet-natuurlijke personen',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-9.svg',
        url: 'maps/eigendommen?categorie=9',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 9
        }
      },
      {
        id: 'egnp',
        layer: 'eigendommen',
        selectable: true,
        title: 'Overige natuurlijke personen',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-10.svg',
        url: 'maps/eigendommen?categorie=10',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true,
        params: {
          categorie: 10
        }
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Kadastrale eigenaren',
    url: '/maps/eigendommen?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: onroerende zaken',
    legendItems: [
      {
        id: 'efga',
        layer: 'erfpacht',
        selectable: true,
        title: 'Gemeente Amsterdam',
        iconUrl: '/assets/images/map-legend/icon-erf-cat-1.svg',
        url: 'maps/erfpacht?categorie=1',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true
      },
      {
        id: 'efov',
        layer: 'erfpacht',
        selectable: true,
        title: 'Overig',
        iconUrl: '/assets/images/map-legend/icon-erf-cat-2.svg',
        url: 'maps/erfpacht?categorie=2',
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Kadastrale erfpachtuitgevers',
    url: '/maps/erfpacht?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: onroerende zaken',
    legendItems: [
      {
        id: 'gbvv',
        layer: 'beperking-VV',
        selectable: true,
        title: '(voorlopige) aanwijzing WVG'
      },
      {
        id: 'gbkw',
        layer: 'beperking-KW',
        selectable: true,
        title: 'Wet bodembescherming'
      },
      {
        id: 'gbwu',
        layer: 'beperking-WU',
        selectable: true,
        title: 'Woningwet'
      },
      {
        id: 'gboh',
        layer: 'beperking-OH',
        selectable: true,
        title: 'WABO bestuursdwang / dwangsom'
      },
      {
        id: 'gbos',
        layer: 'beperking-OS',
        selectable: true,
        title: 'Sluiting o.b.v. Opiumwet'
      },
      {
        id: 'gbgs',
        layer: 'beperking-GS',
        selectable: true,
        title: 'Sluiting v. woning/lokaal/erf'
      },
      {
        id: 'gbgg',
        layer: 'beperking-GG',
        selectable: true,
        title: 'Gemeentelijk monument'
      },
      {
        id: 'gbep',
        layer: 'beperking-EP',
        selectable: true,
        title: 'Exploitatieplan'
      },
      {
        id: 'gbhv',
        layer: 'beperking-HV',
        selectable: true,
        title: 'Vordering tot woonruimte'
      }
    ],
    maxZoom: 16,
    minZoom: 13,
    title: 'Gemeentelijke beperkingen (WKPB)',
    url: '/maps/wkpb?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: gebieden',
    legendItems: [
      {
        id: 'sd',
        layer: 'stadsdeel',
        selectable: true,
        title: 'Stadsdeel'
      },
      {
        id: 'bc',
        layer: 'buurtcombinatie',
        selectable: true,
        title: 'Wijk'
      },
      {
        id: 'buurt',
        layer: 'buurt',
        selectable: true,
        title: 'Buurt'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Bestuurlijke gebieden',
    url: '/maps/gebieden?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: gebieden',
    id: 'bbn',
    layer: 'bouwblok',
    legendItems: [
      {
        selectable: false,
        title: 'Bouwblok'
      }
    ],
    maxZoom: 16,
    minZoom: 12,
    title: 'Bouwblokken',
    url: '/maps/gebieden?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/',
    detailItem: 'bouwblok',
    detailIsShape: true
  },
  {
    category: 'Geografie: gebieden',
    legendItems: [
      {
        id: 'ggwg',
        layer: 'gebiedsgerichtwerken',
        selectable: true,
        title: 'Gebiedsgerichtwerken-gebied'
      },
      {
        id: 'ggwpg',
        layer: 'gebiedsgerichtwerkenpraktijkgebieden',
        notClickable: true,
        selectable: true,
        title: 'Gebiedsgerichtwerken-praktijkgebied'
      }
    ],
    maxZoom: 16,
    minZoom: 6,
    title: 'Gebiedsgericht werken',
    url: '/maps/gebieden?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: gebieden',
    legendItems: [
      {
        id: 'ggra',
        layer: 'grootstedelijk_regio_amsterdam',
        selectable: true,
        title: 'Regie Gemeente Amsterdam'
      },
      {
        id: 'ggro',
        layer: 'grootstedelijk_regio_omgevingsdienst',
        selectable: true,
        title: 'Regie Omgevingsdienst'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Grootstedelijke gebieden, projecten en belangen',
    url: '/maps/gebieden?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: gebieden',
    id: 'unesco',
    layer: 'unesco',
    legendItems: [
      {
        selectable: false,
        title: 'Kernzone'
      },
      {
        selectable: false,
        title: 'Bufferzone'
      }
    ],
    maxZoom: 16,
    minZoom: 10,
    title: 'Unesco werelderfgoedzones',
    url: '/maps/gebieden?version=1.3.0&service=WMS'
  },
  {
    category: 'Geografie: hoogte',
    id: 'dsm',
    notClickable: true,
    layer: 'ahn3_05m_dtm',
    legendItems: [
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-10.svg',
        selectable: false,
        title: '-10 m tot -5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-5.svg',
        selectable: false,
        title: '-5 m tot -2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-2.svg',
        selectable: false,
        title: '-2 m tot -1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-1.svg',
        selectable: false,
        title: '-1 m tot 0 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-0.svg',
        selectable: false,
        title: '0 m tot 1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-1.svg',
        selectable: false,
        title: '1 m tot 2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-2.svg',
        selectable: false,
        title: '2 m tot 5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-5.svg',
        selectable: false,
        title: '5 m tot 10 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-10.svg',
        selectable: false,
        title: '10 m tot 20 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-20.svg',
        selectable: false,
        title: '20 m tot 30 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-30.svg',
        selectable: false,
        title: 'hoger dan 30 m'
      }
    ],
    maxZoom: 16,
    minZoom: 10,
    title: 'Terreinmodel (DTM AHN)',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    external: true,
    noDetail: true
  },
  {
    category: 'Geografie: hoogte',
    id: 'dtm',
    notClickable: true,
    layer: 'ahn3_05m_dsm',
    legendItems: [
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-10.svg',
        selectable: false,
        title: '-10 m tot -5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-5.svg',
        selectable: false,
        title: '-5 m tot -2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-2.svg',
        selectable: false,
        title: '-2 m tot -1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-1.svg',
        selectable: false,
        title: '-1 m tot 0 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-0.svg',
        selectable: false,
        title: '0 m tot 1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-1.svg',
        selectable: false,
        title: '1 m tot 2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-2.svg',
        selectable: false,
        title: '2 m tot 5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-5.svg',
        selectable: false,
        title: '5 m tot 10 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-10.svg',
        selectable: false,
        title: '10 m tot 20 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-20.svg',
        selectable: false,
        title: '20 m tot 30 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-30.svg',
        selectable: false,
        title: 'hoger dan 30 m'
      }
    ],
    maxZoom: 16,
    minZoom: 10,
    title: 'Oppervlaktemodel (DSM AHN)',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    external: true,
    noDetail: true
  },
  {
    category: 'Geografie: hoogte',
    id: 'nap',
    layer: 'peilmerk_hoogte',
    legendItems: [
      {
        selectable: false,
        title: 'lager dan -1,5 m'
      },
      {
        selectable: false,
        title: '-1,5 m tot -0,5 m'
      },
      {
        selectable: false,
        title: '-0,5 m tot 0 m'
      },
      {
        selectable: false,
        title: '0 m tot 1 m'
      },
      {
        selectable: false,
        title: '1 m tot 1,5 m'
      },
      {
        selectable: false,
        title: '1,5 m tot 2 m'
      },
      {
        selectable: false,
        title: '2 m tot 3,5 m'
      },
      {
        selectable: false,
        title: 'hoger dan 3,5 m'
      }
    ],
    maxZoom: 16,
    minZoom: 10,
    title: 'Normaal Amsterdams Peil (NAP)',
    url: '/maps/nap?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/',
    detailItem: 'peilmerk'
  },
  {
    category: 'Geografie: hoogte',
    id: 'mbs',
    layer: 'meetbouten_status',
    legendItems: [
      {
        selectable: false,
        title: 'Actueel'
      },
      {
        selectable: false,
        title: 'Vervallen'
      }
    ],
    maxZoom: 16,
    minZoom: 12,
    title: 'Meetbouten - Status',
    url: '/maps/meetbouten?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    category: 'Geografie: hoogte',
    id: 'mbz',
    layer: 'meetbouten_zaksnelheid',
    legendItems: [
      {
        selectable: false,
        title: 'minder dan -1 mm/jaar'
      },
      {
        selectable: false,
        title: '-1 tot 0 mm/jaar'
      },
      {
        selectable: false,
        title: '0 tot 1 mm/jaar'
      },
      {
        selectable: false,
        title: '1 tot 1,5 mm/jaar'
      },
      {
        selectable: false,
        title: '1,5 tot 2 mm/jaar'
      },
      {
        selectable: false,
        title: '2 tot 2,5 mm/jaar'
      },
      {
        selectable: false,
        title: '2,5 tot 3 mm/jaar'
      },
      {
        selectable: false,
        title: '3 tot 4 mm/jaar'
      },
      {
        selectable: false,
        title: 'meer dan 4 mm/jaar'
      }
    ],
    maxZoom: 16,
    minZoom: 12,
    title: 'Meetbouten - Zaksnelheid',
    url: '/maps/meetbouten?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    category: 'Geografie: hoogte',
    id: 'mbr',
    notClickable: true,
    layer: 'referentiepunt',
    legendItems: [
      {
        selectable: false,
        title: 'Referentiepunt'
      }
    ],
    maxZoom: 16,
    minZoom: 12,
    title: 'Meetbouten - Referentiepunten',
    url: '/maps/meetbouten?version=1.3.0&service=WMS',
    // layers: ['referentiepunten'],
    noDetail: true
  },
  {
    category: 'Topografie: historisch',
    disabled: true,
    legendItems: [
      {
        id: 'pw1909',
        notClickable: false,
        selectable: false,
        title: '1909 (Dienst der Publieke Werken)',
        type: mapLayerTypes.TMS,
        layer: 'publieke-werken',
        url: 'https://{s}.data.amsterdam.nl/publieke-werken-1909-rd/{z}/{x}/{y}.png',
        noDetail: true,
        external: true,
        bounds: [[52.3361, 4.84049], [52.4185, 4.96617]]
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: '1909 (Dienst der Publieke Werken, 1:1000)'
  },
  {
    category: 'Topografie: historisch',
    disabled: true,
    legendItems: [
      {
        id: 'pw1943',
        notClickable: false,
        selectable: false,
        title: '1943 (Dienst der Publieke Werken, 1:1000)',
        type: mapLayerTypes.TMS,
        layer: 'publieke-werken',
        url: 'https://{s}.data.amsterdam.nl/publieke-werken-1943-rd/{z}/{x}/{y}.png',
        noDetail: true,
        external: true,
        bounds: [[52.3292, 4.8382], [52.4173, 4.9646]]
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: '1943 (Dienst der Publieke Werken, 1:1000)'
  },
  {
    category: 'Topografie: historisch',
    disabled: true,
    legendItems: [
      {
        id: 'pw1943-2500',
        notClickable: false,
        selectable: false,
        title: '1943 (Dienst der Publieke Werken, 1:2500)',
        type: mapLayerTypes.TMS,
        layer: 'publieke-werken',
        url: 'https://{s}.data.amsterdam.nl/publieke-werken-1943-2500-rd/{z}/{x}/{y}.png',
        noDetail: true,
        external: true,
        bounds: [[52.2815, 4.7287], [52.4174, 4.9927]]
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: '1943 (Dienst der Publieke Werken, 1:2500)'
  },
  {
    category: 'Topografie: historisch',
    disabled: true,
    legendItems: [
      {
        id: 'pw1985',
        notClickable: false,
        selectable: false,
        title: '1985 (Dienst der Publieke Werken)',
        type: mapLayerTypes.TMS,
        layer: 'publieke-werken',
        url: 'https://{s}.data.amsterdam.nl/publieke-werken-1985-rd/{z}/{x}/{y}.png',
        noDetail: true,
        external: true,
        bounds: [[52.2756, 4.74026], [52.4374, 5.04781]]
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: '1985 (Dienst der Publieke Werken, 1:1000)'
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'mtr',
        notClickable: true,
        layer: 'metrolijnen',
        selectable: true,
        title: 'Metrolijn',
        noDetail: true
      },
      {
        id: 'trm',
        notClickable: true,
        layer: 'tramlijnen',
        selectable: true,
        title: 'Tramlijn',
        noDetail: true
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Metro en tram - Spoorlijnen',
    url: '/maps/trm?version=1.3.0&service=WMS'
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'mzb',
    notClickable: true,
    layer: 'milieuzones',
    legendItems: [
      {
        imageRule: 'Bestelauto',
        selectable: false,
        title: 'Milieuzone bestelauto'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Milieuzones - Bestelauto',
    url: '/maps/milieuzones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'mzbs',
    notClickable: true,
    layer: 'milieuzones',
    legendItems: [
      {
        imageRule: 'Brom- en snorfiets',
        selectable: false,
        title: 'Milieuzone brom- en snorfiets'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Milieuzones - Brom- en snorfiets',
    url: '/maps/milieuzones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'mzt',
    notClickable: true,
    layer: 'milieuzones',
    legendItems: [
      {
        imageRule: 'Taxi',
        selectable: false,
        title: 'Milieuzone taxi'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Milieuzones - Taxi',
    url: '/maps/milieuzones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'mztc',
    notClickable: true,
    layer: 'milieuzones',
    legendItems: [
      {
        imageRule: 'Touringcar',
        selectable: false,
        title: 'Milieuzone touringcar'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Milieuzones - Touringcar',
    url: '/maps/milieuzones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'mztc2020',
    notClickable: true,
    layer: 'milieuzones',
    legendItems: [
      {
        imageRule: 'Touringcar na 2020',
        selectable: false,
        title: 'Milieuzone touringcar (vanaf 1-1-2020)'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Milieuzones - Touringcar (vanaf 1-1-2020)',
    url: '/maps/milieuzones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'mzva',
    notClickable: true,
    layer: 'milieuzones',
    legendItems: [
      {
        imageRule: 'Vrachtauto',
        selectable: false,
        title: 'Milieuzone vrachtauto'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Milieuzones - Vrachtauto',
    url: '/maps/milieuzones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'slpb',
        imageRule: 'Snel beschikbaar',
        layer: 'snel_beschikbaar',
        selectable: true,
        title: 'Snellaadpunt (beschikbaar, ±15 min. geleden)',
        detailUrl: 'geosearch/search/',
        detailItem: 'oplaadpunten'
      },
      {
        id: 'slpnb',
        imageRule: 'Snel niet beschikbaar',
        layer: 'snel_niet_beschikbaar',
        selectable: true,
        title: 'Snellaadpunt (niet beschikbaar, ±15 min. geleden)',
        detailUrl: 'geosearch/search/',
        detailItem: 'oplaadpunten'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Oplaadpunten - Snel laden',
    url: '/maps/oplaadpunten?version=1.3.0&service=WMS'
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'nlpb',
        imageRule: 'Normaal beschikbaar',
        layer: 'normaal_beschikbaar',
        selectable: true,
        title: 'Gewoon laadpunt (beschikbaar, ±15 min. geleden)',
        detailUrl: 'geosearch/search/',
        detailItem: 'oplaadpunten'
      },
      {
        id: 'nlpnb',
        imageRule: 'Normaal niet beschikbaar',
        layer: 'normaal_niet_beschikbaar',
        selectable: true,
        title: 'Gewoon laadpunt (niet beschikbaar, ±15 min. geleden)',
        detailUrl: 'geosearch/search/',
        detailItem: 'oplaadpunten'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Oplaadpunten - Gewoon laden',
    url: '/maps/oplaadpunten?version=1.3.0&service=WMS'
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'pv',
    notClickable: true,
    layer: 'alle_parkeervakken',
    legendItems: [
      {
        selectable: false,
        title: 'Fiscaal'
      },
      {
        selectable: false,
        title: 'Niet fiscaal'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Parkeervakken - Fiscale indeling',
    url: '/maps/parkeervakken?version=1.3.0&service=WMS',
    detailUrl: 'parkeervakken/geosearch/',
    detailItem: 'parkeervak',
    detailIsShape: true
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'pvb',
    layer: 'parkeervakken_bord',
    legendItems: [
      {
        selectable: false,
        title: 'Bord'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Parkeervakken - Speciale bestemmingen',
    url: '/maps/parkeervakken?version=1.3.0&service=WMS',
    detailUrl: 'parkeervakken/geosearch/',
    detailItem: 'parkeervak',
    detailIsShape: true
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'pvrts',
        layer: 'parkeervakken_reservering',
        selectable: true,
        imageRule: 'Taxistandplaats',
        title: 'Taxistandplaats',
        url: 'maps/parkeervakken?categorie=taxistandplaats',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrll',
        layer: 'parkeervakken_reservering',
        selectable: true,
        imageRule: 'Laden lossen',
        title: 'Laden en lossen',
        url: 'maps/parkeervakken?categorie=laden_lossen',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrpr',
        layer: 'parkeervakken_reservering',
        selectable: true,
        imageRule: 'Park & Ride',
        title: 'Park & Ride',
        url: 'maps/parkeervakken?categorie=park_ride',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Parkeervakken - Gereserveerd (logistiek)',
    url: '/maps/parkeervakken?version=1.3.0&service=WMS'
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'pvrf',
        layer: 'parkeervakken_reservering',
        selectable: true,
        title: 'Fiscaal',
        url: 'maps/parkeervakken?categorie=fiscaal',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrpv',
        layer: 'parkeervakken_reservering',
        selectable: true,
        title: 'Parkeerverbod',
        url: 'maps/parkeervakken?categorie=parkeerverbod',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrga',
        layer: 'parkeervakken_reservering',
        selectable: true,
        title: 'Gehandicaptenplaats algemeen',
        url: 'maps/parkeervakken?categorie=gehandicapten_algemeen',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrgk',
        layer: 'parkeervakken_reservering',
        selectable: true,
        title: 'Gehandicaptenplaats kenteken',
        url: 'maps/parkeervakken?categorie=gehandicapten_kenteken',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrsv',
        layer: 'parkeervakken_reservering',
        selectable: true,
        title: 'Specifieke voertuigcategorie',
        url: 'maps/parkeervakken?categorie=specifiek_voertuig',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrvh',
        layer: 'parkeervakken_reservering',
        selectable: true,
        title: 'Vergunninghouders',
        url: 'maps/parkeervakken?categorie=vergunning_houders',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      },
      {
        id: 'pvrbz',
        layer: 'parkeervakken_reservering',
        selectable: true,
        title: 'Blauwe zone',
        url: 'maps/parkeervakken?categorie=blauwe_zone',
        detailUrl: 'parkeervakken/geosearch/',
        detailItem: 'parkeervak',
        detailIsShape: true
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Parkeervakken - Gereserveerd (overige)',
    url: '/maps/parkeervakken?version=1.3.0&service=WMS'
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'bgt',
        imageRule: 'Busbaan geen taxi',
        notClickable: true,
        layer: 'busbaan_geen_taxi',
        selectable: true,
        title: 'Taxi busbaanverbod',
        noDetail: true
      },
      {
        id: 'tar',
        imageRule: 'Taxiroutes',
        notClickable: true,
        layer: 'taxiroutes',
        selectable: true,
        title: 'Taxi hoofdroute',
        noDetail: true
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Routes - Taxi',
    url: '/maps/hoofdroutes?version=1.3.0&service=WMS'
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'vrr',
        imageRule: 'Vrachtroutes',
        notClickable: true,
        layer: 'vrachtroutes',
        selectable: true,
        title: 'Vrachtauto 7,5t-route',
        noDetail: true
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Routes - Vrachtauto',
    url: '/maps/hoofdroutes?version=1.3.0&service=WMS'
  },
  {
    category: 'Verkeer en infrastructuur',
    id: 'pr',
    notClickable: true,
    layer: 'reistijdenauto',
    legendItems: [
      {
        selectable: false,
        title: '0 tot 20 km/h - snelweg'
      },
      {
        selectable: false,
        title: '20 tot 40 km/h - snelweg'
      },
      {
        selectable: false,
        title: '40 tot 60 km/h - snelweg'
      },
      {
        selectable: false,
        title: '60 tot 80 km/h - snelweg'
      },
      {
        selectable: false,
        title: '80 tot 100 km/h - snelweg'
      },
      {
        selectable: false,
        title: '100 tot 120 km/h - snelweg'
      },
      {
        selectable: false,
        title: '120 tot 140 km/h - snelweg'
      },
      {
        selectable: false,
        title: 'meer dan 140 km/h - snelweg'
      },
      {
        selectable: false,
        title: '0 tot 10 km/h - weg'
      },
      {
        selectable: false,
        title: '10 tot 20 km/h - weg'
      },
      {
        selectable: false,
        title: '20 tot 30 km/h - weg'
      },
      {
        selectable: false,
        title: '30 tot 40 km/h - weg'
      },
      {
        selectable: false,
        title: '40 tot 50 km/h - weg'
      },
      {
        selectable: false,
        title: '50 tot 60 km/h - weg'
      },
      {
        selectable: false,
        title: 'meer dan 60 km/h - weg'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Verkeersstromen - Snelheden (±5 min. geleden)',
    url: '/maps/reistijdenauto?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Verkeer en infrastructuur',
    legendItems: [
      {
        id: 'vezips',
        notClickable: true,
        layer: 'vezips',
        selectable: false,
        title: 'Verzinkbare palen',
        noDetail: true
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Verzinkbare palen',
    url: '/maps/vezips?version=1.3.0&service=WMS'
  },
  {
    category: 'Openbare orde en veiligheid',
    legendItems: [
      {
        id: 'oovoalg',
        layer: 'algemeen_overlastgebied',
        selectable: true,
        notClickable: true,
        title: 'Algemeen overlastgebied'
      },
      {
        id: 'oovodlrs',
        layer: 'dealeroverlastgebied',
        selectable: true,
        notClickable: true,
        title: 'Dealeroverlastgebied'
      },
      {
        id: 'oovouitg',
        layer: 'uitgaansoverlastgebied',
        selectable: true,
        notClickable: true,
        title: 'Uitgaansoverlastgebied'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Overlastgebieden',
    url: '/maps/overlastgebieden?version=1.3.0&service=WMS'
  },
  {
    category: 'Openbare orde en veiligheid',
    id: 'oovctg',
    // layers: ['cameratoezichtgebied'],
    legendItems: [
      {
        selectable: false,
        title: 'Cameratoezichtgebied'
      }
    ],
    notClickable: true,
    maxZoom: 16,
    minZoom: 8,
    title: 'Cameratoezichtgebieden',
    url: '/maps/overlastgebieden?version=1.3.0&service=WMS',
    layers: ['cameratoezichtgebied', 'cameratoezichtgebied_label']
  },
  {
    category: 'Openbare orde en veiligheid',
    id: 'oovoalco',
    legendItems: [
      {
        selectable: false,
        title: 'Alcoholverbodsgebied'
      }
    ],
    notClickable: true,
    maxZoom: 16,
    minZoom: 8,
    title: 'Alcoholverbodsgebieden',
    url: '/maps/overlastgebieden?version=1.3.0&service=WMS',
    layer: 'alcoholverbodsgebied'
  },
  {
    category: 'Openbare orde en veiligheid',
    id: 'oovtig',
    legendItems: [
      {
        selectable: false,
        title: 'Omgeving taxi-standplaats',
        imageRule: 'Taxi-standplaatsgebied'
      }
    ],
    notClickable: true,
    maxZoom: 16,
    minZoom: 8,
    title: 'Omgeving taxi-standplaatsen',
    url: '/maps/overlastgebieden?version=1.3.0&service=WMS',
    layer: 'taxi-standplaatsgebied'
  },
  // to revive end of 2019
  {
    category: 'Openbare orde en veiligheid',
    id: 'oovvz',
    legendItems: [
      {
        selectable: false,
        title: 'Vuurwerkvrije zone',
        imageRule: 'vuurwerkvrijezone'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    notClickable: true,
    title: 'Vuurwerkvrije zones',
    url: '/maps/overlastgebieden?version=1.3.0&service=WMS',
    layer: 'vuurwerkvrijezone'
  },
  {
    category: 'Toerisme en cultuur',
    id: 'tcmnmt',
    legendItems: [
      {
        layer: 'monument_coordinaten',
        selectable: false,
        title: 'Monument (pandgerelateerd)'
      },
      {
        layer: 'monument_coordinaten_nopand',
        selectable: false,
        title: 'Monument (overige)'
      }
    ],
    maxZoom: 16,
    minZoom: 12,
    title: 'Monumenten',
    url: '/maps/monumenten?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/',
    detailItem: 'monument'
  },
  {
    category: 'Milieu: bodem',
    id: 'mbgm',
    notClickable: true,
    layer: 'grondmonsters',
    legendItems: [
      {
        selectable: false,
        title: 'Niet verontreinigd'
      },
      {
        selectable: false,
        title: 'Licht verontreinigd'
      },
      {
        selectable: false,
        title: 'Matig verontreinigd'
      },
      {
        selectable: false,
        title: 'Sterk verontreinigd'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Grondmonsters',
    url: '/maps/bodem?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: bodem',
    id: 'mbaig',
    notClickable: true,
    layer: 'asbest',
    legendItems: [
      {
        selectable: false,
        title: '-10 - 0 mg/kg'
      },
      {
        selectable: false,
        title: '0,1 - 10 mg/kg'
      },
      {
        selectable: false,
        title: '10,1 - 100 mg/kg'
      },
      {
        selectable: false,
        title: '> 100,1 mg/kg'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Grondmonsters asbest',
    url: '/maps/bodem?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: bodem',
    id: 'mbgwm',
    notClickable: true,
    layer: 'grondwatermonsters',
    legendItems: [
      {
        selectable: false,
        title: 'Niet verontreinigd'
      },
      {
        selectable: false,
        title: 'Licht verontreinigd'
      },
      {
        selectable: false,
        title: 'Matig verontreinigd'
      },
      {
        selectable: false,
        title: 'Sterk verontreinigd'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Grondwatermonsters',
    url: '/maps/bodem?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: bodem',
    id: 'exin',
    layer: 'inslagen',
    legendItems: [
      {
        selectable: false,
        title: 'Blindganger'
      },
      {
        selectable: false,
        title: 'Crashlocatie'
      },
      {
        selectable: false,
        title: 'Gedetoneerde vernielingslading'
      },
      {
        selectable: false,
        title: 'Geruimd explosief'
      },
      {
        selectable: false,
        title: 'Niet gedetoneerde vernielingslading'
      },
      {
        selectable: false,
        title: 'Vermoedelijke bominslag(en)'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Explosieven - Inslagen',
    url: '/maps/bommenkaart?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/',
    detailItem: 'bominslag'
  },
  {
    category: 'Milieu: bodem',
    id: 'exvg',
    layer: 'verdachte_gebieden',
    legendItems: [
      {
        selectable: false,
        title: 'Munities en granaten'
      },
      {
        selectable: false,
        title: 'Landmijnen'
      },
      {
        selectable: false,
        title: 'Vernielingsladingen'
      },
      {
        selectable: false,
        title: 'Afwerpmunitie'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Explosieven - Verdachte gebieden',
    url: '/maps/bommenkaart?version=1.3.0&service=WMS'
  },
  {
    category: 'Milieu: bodem',
    id: 'exgg',
    layer: 'gevrijwaarde_gebieden',
    legendItems: [
      {
        selectable: false,
        title: 'Gevrijwaarde gebieden'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Explosieven - Gevrijwaarde gebieden',
    url: '/maps/bommenkaart?version=1.3.0&service=WMS'
  },
  {
    category: 'Milieu: bodem',
    id: 'exuo',
    layer: 'uitgevoerde_CE_onderzoeken',
    legendItems: [
      {
        selectable: false,
        title: 'Detectieonderzoek'
      },
      {
        selectable: false,
        title: 'Projectgebonden risicoanalyse'
      },
      {
        selectable: false,
        title: 'Vooronderzoek'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Explosieven - Uitgevoerde CE-onderzoeken',
    url: '/maps/bommenkaart?version=1.3.0&service=WMS'
  },
  {
    category: 'Milieu: bodem',
    id: 'bros',
    layer: 'cpt',
    legendItems: [
      {
        selectable: false,
        title: 'Geotechnische sondering',
        iconUrl: '/assets/images/map-legend/icon-bro-sondering.png'
      }
    ],
    notClickable: true,
    maxZoom: 16,
    minZoom: 8,
    title: 'Geotechnische sonderingen (CPT BRO)',
    url: 'https://geodata.nationaalgeoregister.nl/brocpt/wms?',
    external: true,
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvlpgv',
    notClickable: true,
    legendItems: [
      {
        layer: 'lpgvulpuntplaatsgebondenrisico105',
        selectable: false,
        title: 'Plaatsgebonden risico 10-5'
      },
      {
        layer: 'lpgvulpuntplaatsgebondenrisico106',
        selectable: false,
        title: 'Plaatsgebonden risico 10-6'
      },
      {
        layer: 'lpgvulpuntinvloedsgebied',
        selectable: false,
        title: 'Invloedsgebied groepsrisico'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'LPG-vulpunten - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvlpga',
    notClickable: true,
    layer: 'milieu_veiligheid_lpg_afleverzuil',
    legendItems: [
      {
        layer: 'lpgafleverzuillocaties',
        selectable: false,
        title: 'Locatie LPG-afleverzuil'
      },
      {
        layer: 'lpgafleverzuilplaatsgebondenrisico',
        selectable: false,
        title: 'Plaatsgebonden risico (15 m)'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'LPG-afleverzuilen - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvlpgt',
    notClickable: true,
    layer: 'milieu_veiligheid_lpg_tank',
    legendItems: [
      {
        layer: 'lpgtankligging',
        selectable: false,
        title: 'Ligging LPG-tank'
      },
      {
        layer: 'lpgtankplaatsgebondenrisico',
        selectable: false,
        title: 'Plaatsgebondenrisico (25/120 m)'
      },
      {
        layer: 'lpgtankinvloedsgebied',
        selectable: false,
        title: 'Invloedsgebied groepsrisico'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'LPG-tanks - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvlpgs',
    notClickable: true,
    layer: 'milieu_veiligheid_lpg_station',
    legendItems: [
      {
        layer: 'lpgstationslocaties',
        selectable: false,
        title: 'Locatie LPG-station'
      },
      {
        layer: 'lpgstationcontouren',
        selectable: false,
        title: 'Contouren LPG-station'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'LPG-stations - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvbr',
    notClickable: true,
    legendItems: [
      {
        layer: 'overigerisicobedrijfplaatsgebondenrisico106',
        selectable: false,
        title: 'Plaatsgebonden risico 10-6'
      },
      {
        layer: 'overigerisicobedrijfsbronnen',
        selectable: false,
        title: 'Bron'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Bedrijven - Bronnen en risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    authScope: 'HR/R',
    category: 'Milieu: externe veiligheid',
    id: 'mvi',
    notClickable: true,
    layer: 'overigerisicobedrijfinvloedsgebied',
    legendItems: [
      {
        selectable: false,
        title: 'Invloedsgebied'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Bedrijven - Invloedsgebieden',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvbd',
    notClickable: true,
    layer: 'milieu_veiligheid_bedrijf',
    legendItems: [
      {
        layer: 'overigerisicobedrijfslocaties',
        selectable: false,
        title: 'Bedrijf'
      },
      {
        layer: 'overigerisicobedrijfscontouren',
        selectable: false,
        title: 'Terrein'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Bedrijven - Terreingrenzen',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvabl',
    notClickable: true,
    layer: 'milieu_veiligheid_aardgasbuisleidingen',
    legendItems: [
      {
        layer: 'milieu_veiligheid_aardgasbuisleidingen_legenda',
        selectable: false,
        title: 'Aardgasleiding'
      },
      {
        layer: 'risicozonesaardgaspr106',
        selectable: false,
        title: 'Plaatsgebonden risico 10-6'
      },
      {
        layer: 'risicozonesaardgas100let',
        selectable: false,
        title: '100% Letaliteitsafstand'
      },
      {
        layer: 'risicozonesaardgas1let',
        selectable: false,
        title: '1% Letaliteitsafstand'
      },
      {
        layer: 'risicozonesbelemmeringenstrook',
        selectable: false,
        title: 'Belemmeringenstrook'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Aardgasbuisleidingen - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvsw',
    notClickable: true,
    layer: 'risicozonesspoorweg',
    legendItems: [
      {
        selectable: false,
        title: 'Invloedsgebied spoorwegen'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Spoorwegen - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvvw',
    notClickable: true,
    layer: 'risicozonesvaarweg',
    legendItems: [
      {
        selectable: false,
        title: 'Invloedsgebied vaarwegen'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Vaarwegen - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    id: 'mvw',
    notClickable: true,
    layer: 'risicozoneswg',
    legendItems: [
      {
        selectable: false,
        title: 'Invloedsgebied wegen'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Wegen - Risicozones',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: externe veiligheid',
    legendItems: [
      {
        id: 'mvvo',
        notClickable: true,
        layer: 'milieu_veiligheid_vuurwerk',
        selectable: true,
        title: 'Vuurwerkopslag',
        noDetail: true
      },
      {
        id: 'mvmo',
        notClickable: true,
        layer: 'milieu_veiligheid_munitie',
        selectable: true,
        title: 'Munitieopslag',
        noDetail: true
      },
      {
        id: 'mvgms',
        notClickable: true,
        layer: 'milieu_veiligheid_gasdrukregel_meetstation',
        selectable: true,
        title: 'Gasdrukregel- en meetstation',
        noDetail: true
      },
      {
        id: 'mvsls',
        notClickable: true,
        layer: 'milieu_veiligheid_sluis',
        selectable: true,
        title: 'Sluis',
        noDetail: true
      },
      {
        id: 'mvwp',
        notClickable: true,
        layer: 'milieu_veiligheid_wachtplaats',
        selectable: true,
        title: 'Wachtplaats',
        noDetail: true
      },
      {
        id: 'mvbs',
        notClickable: true,
        layer: 'milieu_veiligheid_bunkerschepen',
        selectable: true,
        title: 'Bunkerschip',
        noDetail: true
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Veiligheidsafstanden',
    url: '/maps/externeveiligheid?version=1.3.0&service=WMS'
  },
  {
    category: 'Milieu: zones',
    id: 'mgpind',
    notClickable: true,
    // layers: ['geluidzoneindustrieterrein'],
    legendItems: [
      {
        layer: 'gezoneerdindustrieterrein',
        selectable: false,
        title: 'Gezoneerd industrieterrein'
      },
      {
        layer: 'geluidzoneindustrieterrein',
        selectable: false,
        title: 'Geluidzone industrieterrein'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Industrie - Geluidszones',
    url: '/maps/planologischegeluidszones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: zones',
    id: 'mgsw',
    notClickable: true,
    layer: 'spoorwegen',
    legendItems: [
      {
        selectable: false,
        title: 'Geluidszone spoorwegen'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Spoorwegen - Geluidszones',
    url: '/maps/planologischegeluidszones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: zones',
    id: 'mgpm',
    notClickable: true,
    layer: 'metro',
    legendItems: [
      {
        selectable: false,
        title: 'Geluidszone metro'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Metro - Geluidszones',
    url: '/maps/planologischegeluidszones?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: zones',
    id: 'mgpsh',
    notClickable: true,
    layer: 'geluidszoneschiphol',
    legendItems: [
      {
        selectable: false,
        title: 'Geluidzone Schiphol (nr. 4 \'beperking gebouwen\')'
      },
      {
        selectable: false,
        title: '20 Ke contour'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Schiphol - Ruimtelijke beperkingen',
    url: '/maps/planologischezonesschiphol?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: zones',
    id: 'mgth',
    notClickable: true,
    layer: 'maatgevendetoetshoogteschiphol',
    legendItems: [
      {
        selectable: false,
        title: '-10 - 0m NAP'
      },
      {
        selectable: false,
        title: '0 - 20m NAP'
      },
      {
        selectable: false,
        title: '20 - 40m NAP'
      },
      {
        selectable: false,
        title: '40 - 60m NAP'
      },
      {
        selectable: false,
        title: '60 - 80m NAP'
      },
      {
        selectable: false,
        title: '80 - 100m NAP'
      },
      {
        selectable: false,
        title: '100 - 140m NAP'
      },
      {
        selectable: false,
        title: '140m NAP'
      },
      {
        selectable: false,
        title: 'Hoger dan 140m NAP'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Schiphol - Maatgevende toetshoogte',
    url: '/maps/planologischezonesschiphol?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: zones',
    id: 'mthr',
    notClickable: true,
    layer: 'toetshoogteradarschiphol',
    legendItems: [
      {
        selectable: false,
        title: '-10 - 0m NAP'
      },
      {
        selectable: false,
        title: '0 - 20m NAP'
      },
      {
        selectable: false,
        title: '20 - 40m NAP'
      },
      {
        selectable: false,
        title: '40 - 60m NAP'
      },
      {
        selectable: false,
        title: '60 - 80m NAP'
      },
      {
        selectable: false,
        title: '80 - 100m NAP'
      },
      {
        selectable: false,
        title: '100 - 140m NAP'
      },
      {
        selectable: false,
        title: '140m NAP'
      },
      {
        selectable: false,
        title: 'Hoger dan 140m NAP'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Schiphol - Toetshoogte i.v.m. radar',
    url: '/maps/planologischezonesschiphol?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Milieu: zones',
    id: 'mgvvgsh',
    notClickable: true,
    layer: 'vogelvrijwaringsgebiedschiphol',
    legendItems: [
      {
        selectable: false,
        title: 'Vogelvrijwaringsgebied'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Schiphol - Vogelvrijwaringsgebied',
    url: '/maps/planologischezonesschiphol?version=1.3.0&service=WMS',
    noDetail: true
  },
  {
    category: 'Economie en haven',
    id: 'biz',
    layer: 'biz_polygons',
    legendItems: [
      {
        selectable: false,
        title: 'Bedrijfsinvesteringszone'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Bedrijfsinvesteringszones',
    url: '/maps/biz?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/biz/', // Geosearch URL
    detailItem: 'biz', // Not needed for this API endpoint, but needed to trigger nearest detail on click...
    detailIsShape: true
  },
  {
    category: 'Economie en haven',
    id: 'winkgeb',
    layer: 'winkgeb',
    legendItems: [
      {
        selectable: false,
        title: 'Kernwinkelgebied'
      },
      {
        selectable: false,
        title: 'Stadsdeelcentra'
      },
      {
        selectable: false,
        title: 'Wijkcentrum groot'
      },
      {
        selectable: false,
        title: 'Wijkcentrum klein'
      },
      {
        selectable: false,
        title: 'Buurtcentrum'
      },
      {
        selectable: false,
        title: 'Locatie voor perifere winkels'
      },
      {
        selectable: false,
        title: 'Trafficlocaties'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Winkelgebieden',
    url: '/maps/winkgeb?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/winkgeb/', // Geosearch URL
    detailItem: 'winkgeb', // Not needed for this API endpoint, but needed to trigger nearest detail on click...
    detailIsShape: true
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'bouw',
    layer: 'bouw',
    legendItems: [
      {
        selectable: false,
        title: 'Afwerking van gebouwen'
      },
      {
        selectable: false,
        title: 'Bouwinstallatie'
      },
      {
        selectable: false,
        title: 'Bouw/utiliteitsbouw algemeen / klusbedrijf'
      },
      {
        selectable: false,
        title: 'Dak- en overige gespecialiseerde bouw'
      },
      {
        selectable: false,
        title: 'Grond, water, wegenbouw'
      },
      {
        selectable: false,
        title: 'Overige bouw'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Bouw',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'bouw'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'csr',
    layer: 'cultuur_sport_recreatie',
    legendItems: [
      {
        selectable: false,
        title: 'Kunst'
      },
      {
        selectable: false,
        title: 'Musea, bibliotheken, kunstuitleen'
      },
      {
        selectable: false,
        title: 'Recreatie'
      },
      {
        selectable: false,
        title: 'Sport'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Cultuur, sport, recreatie',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'cultuur_sport_recreatie'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'fdvrog',
    layer: 'financiele_dienstverlening_verhuur',
    legendItems: [
      {
        selectable: false,
        title: 'Financiële dienstverlening en verzekeringen'
      },
      {
        selectable: false,
        title: 'Holdings'
      },
      {
        selectable: false,
        title: 'Verhuur van- en beheer/handel in onroerend goed'
      },
      {
        selectable: false,
        title: 'Verhuur van roerende goederen'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Financiële dienstv., verhuur van (on)roerend goed',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'financiele_dienstverlening_verhuur'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'hvo',
    layer: 'handel_vervoer_opslag',
    legendItems: [
      {
        selectable: false,
        title: 'Detailhandel (verkoop aan consumenten, niet zelf vervaardigd)'
      },
      {
        selectable: false,
        title: 'Dienstverlening vervoer'
      },
      {
        selectable: false,
        title: 'Groothandel (verkoop aan andere ondernemingen, niet zelf vervaardigd)'
      },
      {
        selectable: false,
        title: 'Handel en reparatie van auto\'s'
      },
      {
        selectable: false,
        title: 'Handelsbemiddeling (tussenpersoon, verkoopt niet zelf)'
      },
      {
        selectable: false,
        title: 'Opslag'
      },
      {
        selectable: false,
        title: 'Vervoer'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Handel, vervoer, opslag',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'handel_vervoer_opslag'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'hrc',
    layer: 'horeca',
    legendItems: [
      {
        selectable: false,
        title: 'Café'
      },
      {
        selectable: false,
        title: 'Cafetaria, snackbar, ijssalon'
      },
      {
        selectable: false,
        title: 'Hotel, pension'
      },
      {
        selectable: false,
        title: 'Hotel-restaurant'
      },
      {
        selectable: false,
        title: 'Kantine, catering'
      },
      {
        selectable: false,
        title: 'Restaurant, café-restaurant'
      },
      {
        selectable: false,
        title: 'Overige horeca'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Horeca',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'horeca'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'itc',
    layer: 'telecommunicatie',
    legendItems: [
      {
        selectable: false,
        title: 'Activiteiten op gebied van film, tv, radio, audio'
      },
      {
        selectable: false,
        title: 'Activiteiten op het gebied van ict'
      },
      {
        selectable: false,
        title: 'Telecommunicatie'
      },
      {
        selectable: false,
        title: 'Uitgeverijen'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Informatie, telecommunicatie',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'informatie_telecommunicatie'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'lb',
    layer: 'landbouw',
    legendItems: [
      {
        selectable: false,
        title: 'Dienstverlening voor de land/tuinbouw'
      },
      {
        selectable: false,
        title: 'Fokken, houden dieren'
      },
      {
        selectable: false,
        title: 'Gemengd bedrijf'
      },
      {
        selectable: false,
        title: 'Teelt eenjarige gewassen'
      },
      {
        selectable: false,
        title: 'Teelt meerjarige gewassen'
      },
      {
        selectable: false,
        title: 'Teelt sierplanten'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Landbouw',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'landbouw'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'ooz',
    layer: 'overheid_onderwijs_zorg',
    legendItems: [
      {
        selectable: false,
        title: 'Gezondheids- en welzijnszorg'
      },
      {
        selectable: false,
        title: 'Onderwijs'
      },
      {
        selectable: false,
        title: 'Overheid'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Overheid, onderwijs, zorg',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overheid_onderwijs_zorg'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'pd',
    layer: 'persoonlijke_dienstverlening',
    legendItems: [
      {
        selectable: false,
        title: 'Kappers'
      },
      {
        selectable: false,
        title: 'Sauna, solaria'
      },
      {
        selectable: false,
        title: 'Schoonheidsverzorging'
      },
      {
        selectable: false,
        title: 'Uitvaart, crematoria'
      },
      {
        selectable: false,
        title: 'Overige dienstverlening'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Persoonlijke dienstverlening',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'persoonlijke_dienstverlening'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'pir',
    layer: 'productie_installatie_reparatie',
    legendItems: [
      {
        selectable: false,
        title: 'Installatie (geen bouw)'
      },
      {
        selectable: false,
        title: 'Productie'
      },
      {
        selectable: false,
        title: 'Reparatie (geen bouw)'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Productie, installatie, reparatie',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'productie_installatie_reparatie'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'zd',
    layer: 'zakelijke_dienstverlening',
    legendItems: [
      {
        selectable: false,
        title: 'Accountancy, administratie'
      },
      {
        selectable: false,
        title: 'Advocaten rechtskundige diensten, notarissen'
      },
      {
        selectable: false,
        title: 'Arbeidsbemiddeling, uitzendbureaus, uitleenbureaus'
      },
      {
        selectable: false,
        title: 'Architecten'
      },
      {
        selectable: false,
        title: 'Design'
      },
      {
        selectable: false,
        title: 'Interieurarchitecten'
      },
      {
        selectable: false,
        title: 'Managementadvies, economisch advies'
      },
      {
        selectable: false,
        title: 'Public relationsbureaus'
      },
      {
        selectable: false,
        title: 'Reclame en Marktonderzoek'
      },
      {
        selectable: false,
        title: 'Technisch ontwerp, advies, keuring/research'
      },
      {
        selectable: false,
        title: 'Overige zakelijke dienstverlening'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Zakelijke dienstverlening',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'zakelijke_dienstverlening'
  },
  {
    authScope: 'HR/R',
    category: 'Economie en haven',
    id: 'ovrg',
    layer: 'overige',
    legendItems: [
      {
        selectable: false,
        title: 'Belangenorganisaties'
      },
      {
        selectable: false,
        title: 'Hobbyclubs'
      },
      {
        selectable: false,
        title: 'Ideële organisaties'
      },
      {
        selectable: false,
        title: 'Overige'
      },
      {
        selectable: false,
        title: '(Locatie geschat)'
      }
    ],
    maxZoom: 16,
    minZoom: 11,
    title: 'Vestigingen - Overige',
    url: '/maps/handelsregister?version=1.3.0&service=WMS',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overige'
  },
  {
    authScope: 'GREX/R',
    id: 'grexProjecten',
    category: 'Stedelijke ontwikkeling',
    layer: 'grondexploitatie_polygons',
    legendItems: [
      {
        selectable: false,
        title: 'Actueel'
      },
      {
        selectable: false,
        title: 'Toekomstig'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Grondexploitaties - Projecten',
    url: '/maps/grondexploitatie?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/', // Geosearch URL
    detailItem: 'grondexploitatie', // Geosearch name
    detailIsShape: true
  },
  {
    authScope: 'GREX/R',
    id: 'grexStadsdelen',
    category: 'Stedelijke ontwikkeling',
    layer: 'stadsdeel_polygons',
    legendItems: [
      {
        selectable: false,
        title: 'Totale begroting baten',
        iconUrl: '/assets/images/map-legend/icon-grex-stadsdeel.svg'
      }
    ],
    maxZoom: 16,
    minZoom: 8,
    title: 'Grondexploitaties - Stadsdelen',
    url: '/maps/grondexploitatie?version=1.3.0&service=WMS',
    detailUrl: 'geosearch/search/', // Geosearch URL
    detailItem: 'stadsdeel', // Geosearch name
    detailIsShape: true
  }
];
