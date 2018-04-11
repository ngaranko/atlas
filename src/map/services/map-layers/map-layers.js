export default [
  {
    id: 'biz',
    url: 'maps/biz',
    title: 'Bedrijfsinvesteringszones',
    layers: ['biz_polygons'],
    minZoom: 8,
    maxZoom: 16,
    detailUrl: 'geosearch/biz/', // Geosearch URL
    detailItem: 'biz', // Not needed for this API endpoint, but needed to trigger nearest detail on click...
    detailIsShape: true
  },
  {
    id: 'hvo',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Handel, vervoer, opslag',
    layers: ['handel_vervoer_opslag', 'handel_vervoer_opslag_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'handel_vervoer_opslag'
  },
  {
    id: 'pir',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Productie, installatie, reparatie',
    layers: ['productie_installatie_reparatie', 'productie_installatie_reparatie_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'productie_installatie_reparatie'
  },
  {
    id: 'bouw',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Bouw',
    layers: ['bouw', 'bouw_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'bouw'
  },
  {
    id: 'lb',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Landbouw',
    layers: ['landbouw', 'landbouw_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'landbouw'
  },
  {
    id: 'hrc',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Horeca',
    layers: ['horeca', 'horeca_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'horeca'
  },
  {
    id: 'itc',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Informatie, telecommunicatie',
    layers: ['telecommunicatie', 'telecommunicatie_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'informatie_telecommunicatie'
  },
  {
    id: 'fdvrog',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Financiële dienstverlening, verhuur van roerend en onroerend goed',
    layers: ['financiele_dienstverlening_verhuur', 'financiele_dienstverlening_verhuur_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'financiele_dienstverlening_verhuur'
  },
  {
    id: 'zd',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Zakelijke dienstverlening',
    layers: ['zakelijke_dienstverlening', 'zakelijke_dienstverlening_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'zakelijke_dienstverlening'
  },
  {
    id: 'ooz',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Overheid, onderwijs, zorg',
    layers: ['overheid_onderwijs_zorg', 'overheid_onderwijs_zorg_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overheid_onderwijs_zorg'
  },
  {
    id: 'csr',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Cultuur, sport, recreatie',
    layers: ['cultuur_sport_recreatie', 'cultuur_sport_recreatie_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=cultuur_sport_recreatie&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'cultuur_sport_recreatie'
  },
  {
    id: 'csr',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Cultuur, sport, recreatie',
    layers: ['cultuur_sport_recreatie', 'cultuur_sport_recreatie_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'cultuur_sport_recreatie'
  },
  {
    id: 'pd',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Persoonlijke dienstverlening',
    layers: ['persoonlijke_dienstverlening', 'persoonlijke_dienstverlening_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'persoonlijke_dienstverlening'
  },
  {
    id: 'ovrg',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    title: 'Overige',
    layers: ['overige', 'overige_label'],
    minZoom: 11,
    maxZoom: 16,
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overige'
  },
  {
    id: 'kadaster',
    url: 'maps/brk?service=wms',
    title: 'Kadastrale perceelgrenzen',
    layers: ['kadaster'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'bgem',
    url: 'maps/brk?service=wms',
    title: 'Burgerlijke gemeenten',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['burgerlijke_gemeente', 'burgerlijke_gemeente_label'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'kgem',
    url: 'maps/brk?service=wms',
    title: 'Kadastrale gemeenten',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['kadastrale_gemeente', 'kadastrale_gemeente_label'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'ksec',
    url: 'maps/brk?service=wms',
    title: 'Kadastrale secties',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['kadastrale_sectie', 'kadastrale_sectie_label'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'kot',
    url: 'maps/brk?service=wms',
    title: 'Kadastrale objecten',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['kadastraal_object', 'kadastraal_object_label'],
    minZoom: 8,
    maxZoom: 16,
    detailUrl: 'geosearch/search/',
    detailItem: 'kadastraal_object',
    detailIsShape: true
  },
  {
    id: 'gbep',
    url: 'maps/wkpb',
    title: 'Gemeentelijke beperkingen (WKPB)',
    layers: ['wkpb'],
    minZoom: 13,
    maxZoom: 16
  },
  // geografie: gebieden
  {
    id: 'gsg',
    url: 'maps/gebieden?service=wms',
    title: 'Grootstedelijke gebieden',
    layers: ['grootstedelijkgebied', 'grootstedelijkgebied_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'unesco',
    url: 'maps/gebieden?service=wms',
    title: 'Unesco werelderfgoedzones',
    layers: ['unesco', 'unesco_label'],
    minZoom: 10,
    maxZoom: 16
  },
  {
    id: 'sd',
    url: 'maps/gebieden?service=wms',
    title: 'Stadsdelen',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['stadsdeel', 'stadsdeel_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'ggw',
    url: 'maps/gebieden?service=wms',
    title: 'Gebiedsgerichtwerken-gebieden',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['gebiedsgerichtwerken', 'gebiedsgerichtwerken_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'bc',
    url: 'maps/gebieden?service=wms',
    title: 'Wijken',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['buurtcombinatie', 'buurtcombinatie_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'buurt',
    url: 'maps/gebieden?service=wms',
    title: 'Buurten',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['buurt', 'buurt_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'grex',
    authScope: 'GREX/R',
    url: 'maps/grondexploitatie?service=wms',
    title: 'Grondexploitatie',
    layers: ['grondexploitatie_polygons'],
    minZoom: 8,
    maxZoom: 16,
    detailUrl: 'geosearch/search/', // Geosearch URL
    detailItem: 'grondexploitatie', // Geosearch name
    detailIsShape: true
  },
  {
    id: 'bbn',
    url: 'maps/gebieden?service=wms',
    title: 'Bouwblokken',
    layers: ['bouwblok', 'bouwblok_label'],
    minZoom: 12,
    maxZoom: 16,
    detailUrl: 'geosearch/search/',
    detailItem: 'bouwblok',
    detailIsShape: true
  },

  // geografie: hoogte
  {
    id: 'dsm',
    title: 'Oppervlaktemodel (DSM AHN)',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    layers: ['ahn3_05m_dsm'],
    minZoom: 10,
    maxZoom: 16,
    external: true,
    noDetail: true
  },
  {
    id: 'dtm',
    title: 'Terreinmodel (DTM AHN)',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    layers: ['ahn3_05m_dtm'],
    minZoom: 10,
    maxZoom: 16,
    external: true,
    noDetail: true
  },
  {
    id: 'nap',
    url: 'maps/nap',
    title: 'Normaal Amsterdams Peil (NAP)',
    layers: ['peilmerk_hoogte', 'peilmerk_label'],
    minZoom: 10,
    maxZoom: 16,
    detailUrl: 'geosearch/search/',
    detailItem: 'peilmerk'
  },
  {
    id: 'mbs',
    url: 'maps/meetbouten?service=wms',
    title: 'Meetbouten - Status',
    layers: ['meetbouten_status', 'meetbouten_labels'],
    minZoom: 12,
    maxZoom: 16,
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    id: 'mbz',
    url: 'maps/meetbouten?service=wms',
    title: 'Meetbouten - Zaksnelheid',
    layers: ['meetbouten_zaksnelheid', 'meetbouten_labels'],
    minZoom: 12,
    maxZoom: 16,
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    id: 'mbr',
    url: 'maps/meetbouten',
    title: 'Meetbouten - Referentiepunten',
    layers: ['referentiepunten'],
    minZoom: 12,
    maxZoom: 16,
    noDetail: true
  },

  // milieu bodem
  {
    id: 'mbgm',
    url: 'maps/bodem',
    title: 'Grondmonsters',
    layers: ['grondmonsters'],
    minZoom: 11,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mbgwm',
    url: 'maps/bodem',
    title: 'Grondwatermonsters',
    layers: ['grondwatermonsters'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mbaig',
    url: 'maps/bodem',
    title: 'Grondmonsters asbest',
    layers: ['asbest'],
    minZoom: 11,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'exin',
    url: 'maps/bommenkaart',
    title: 'Explosieven - Inslagen',
    layers: ['inslagen'],
    minZoom: 8,
    maxZoom: 16,
    detailUrl: 'geosearch/search/',
    detailItem: 'bominslag'
  },
  {
    id: 'exvg',
    url: 'maps/bommenkaart',
    title: 'Explosieven - Verdachte gebieden',
    layers: ['verdachte_gebieden'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'exgg',
    url: 'maps/bommenkaart',
    title: 'Explosieven - Gevrijwaarde gebieden',
    layers: ['gevrijwaarde_gebieden'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'exuo',
    url: 'maps/bommenkaart',
    title: 'Explosieven - Uitgevoerde CE-onderzoeken',
    layers: ['uitgevoerde_CE_onderzoeken'],
    minZoom: 8,
    maxZoom: 16
  },
  // milieu: veiligheid
  {
    id: 'mvlpgv',
    url: 'maps/externeveiligheid',
    title: 'LPG-vulpunten - Risicozones',
    layers: [
      'lpgvulpuntinvloedsgebied',
      'lpgvulpuntplaatsgebondenrisico106',
      'lpgvulpuntplaatsgebondenrisico105',
      'lpgvulpuntlocaties'
    ],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvlpga',
    url: 'maps/externeveiligheid',
    title: 'LPG-afleverzuilen - Risicozones',
    layers: ['milieu_veiligheid_lpg_afleverzuil'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvlpgt',
    url: 'maps/externeveiligheid',
    title: 'LPG-tanks - Risicozones',
    layers: ['lpgtankinvloedsgebied', 'lpgtankplaatsgebondenrisico', 'lpgtankligging'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvlpgs',
    url: 'maps/externeveiligheid',
    title: 'LPG-stations - Risicozones',
    layers: ['lpgstationcontouren', 'lpgstationslocaties'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvbr',
    url: 'maps/externeveiligheid',
    title: 'Bedrijven - Bronnen en risicozones',
    layers: ['overigerisicobedrijfsbronnen', 'overigerisicobedrijfplaatsgebondenrisico106'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvi',
    authScope: 'HR/R',
    url: 'maps/externeveiligheid',
    title: 'Bedrijven - invloedsgebieden',
    layers: ['overigerisicobedrijfinvloedsgebied'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvbd',
    url: 'maps/externeveiligheid',
    title: 'Bedrijven - Terreingrenzen',
    layers: ['milieu_veiligheid_bedrijf'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvabl',
    url: 'maps/externeveiligheid',
    title: 'Aardgasbuisleidingen - Risicozones',
    layers: ['milieu_veiligheid_aardgasbuisleidingen'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvsw',
    url: 'maps/externeveiligheid',
    title: 'Spoorwegen - Risicozones',
    layers: ['risicozonesspoorweg'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvvw',
    url: 'maps/externeveiligheid',
    title: 'Vaarwegen - Risicozones',
    layers: ['risicozonesvaarweg'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvw',
    url: 'maps/externeveiligheid',
    title: 'Wegen - Risicozones',
    layers: ['risicozonesweg'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvvo',
    url: 'maps/externeveiligheid',
    title: 'Vuurwerkopslag - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_vuurwerk'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvmo',
    url: 'maps/externeveiligheid',
    title: 'Munitieopslag - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_munitie'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvgms',
    url: 'maps/externeveiligheid',
    title: 'Gasdrukregel- en meetstation - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_gasdrukregel_meetstation'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvsls',
    url: 'maps/externeveiligheid',
    title: 'Sluizen - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_sluis'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvwp',
    url: 'maps/externeveiligheid',
    title: 'Wachtplaatsen - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_wachtplaats'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mvbs',
    url: 'maps/externeveiligheid',
    title: 'Bunkerschepen - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_bunkerschepen'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  // milieu zones
  {
    id: 'mgpind',
    url: 'maps/planologischegeluidszones',
    title: 'Industrie - Geluidszones',
    layers: [
      'geluidzoneindustrieterrein',
      'gezoneerdindustrieterrein'
    ],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mgsw',
    url: 'maps/planologischegeluidszones',
    title: 'Spoorwegen - Geluidszones',
    layers: ['spoorwegen'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mgpm',
    url: 'maps/planologischegeluidszones',
    title: 'Metro - Geluidszones',
    layers: ['metro'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mgpsh',
    url: 'maps/planologischezonesschiphol',
    title: 'Schiphol - Ruimtelijke beperkingen',
    layers: ['geluidszoneschiphol'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mgth',
    url: 'maps/planologischezonesschiphol',
    title: 'Schiphol - Maatgevende toetshoogte',
    layers: ['maatgevendetoetshoogteschiphol'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mthr',
    url: 'maps/planologischezonesschiphol',
    title: 'Schiphol - Toetshoogte i.v.m. radar',
    layers: ['toetshoogteradarschiphol'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mgvvgsh',
    url: 'maps/planologischezonesschiphol',
    title: 'Schiphol - Vogelvrijwaringsgebied',
    layers: ['vogelvrijwaringsgebiedschiphol'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  // Openbare orde en veiligheid
  {
    id: 'oovoalg',
    url: 'maps/overlastgebieden',
    title: 'Overlastgebieden - Algemeen',
    parent_label: 'Overlastgebieden',
    layers: ['algemeen_overlastgebied', 'algemeen_overlastgebied_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'oovodlrs',
    url: 'maps/overlastgebieden',
    title: 'Overlastgebieden - Dealers',
    parent_label: 'Overlastgebieden',
    layers: ['dealeroverlastgebied', 'dealeroverlastgebied_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'oovouitg',
    url: 'maps/overlastgebieden',
    title: 'Overlastgebieden - Uitgaan',
    parent_label: 'Overlastgebieden',
    layers: ['uitgaansoverlastgebied', 'uitgaansoverlastgebied_label'],
    minZoom: 8,
    maxZoom: 16
  },
  {
    id: 'oovctg',
    url: 'maps/overlastgebieden',
    title: 'Cameratoezichtgebieden',
    layers: ['cameratoezichtgebied', 'cameratoezichtgebied_label'],
    minZoom: 8,
    maxZoom: 16
  },
  // Toerisme en cultuur
  {
    id: 'tcmnmt',
    url: 'maps/monumenten',
    title: 'Monumenten',
    layers: ['monumenten'],
    minZoom: 12,
    maxZoom: 16,
    detailUrl: 'geosearch/search/',
    detailItem: 'monument'
  },
  // Verkeer
  {
    id: 'trm',
    url: 'maps/trm',
    title: 'Tram - lijnen',
    parent_label: 'Metro en tram - lijnen',
    layers: ['tramlijnen'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'mtr',
    url: 'maps/trm',
    title: 'Metro - lijnen',
    parent_label: 'Metro en tram - lijnen',
    layers: ['metrolijnen'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'pv',
    url: 'maps/parkeervakken',
    title: 'Parkeervakken - Fiscale indeling',
    layers: ['alle_parkeervakken', 'parkeervakken_label'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'pvb',
    url: 'maps/parkeervakken',
    title: 'Parkeervakken - Speciale bestemmingen',
    layers: ['alle_parkeervakken', 'parkeervakken_bord'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'pvr',
    url: 'maps/parkeervakken',
    title: 'Parkeervakken - Gereserveerd',
    layers: ['parkeervakken_reservering', 'parkeervakken_reservering_label'],
    minZoom: 11,
    maxZoom: 16,
    noDetail: true
  },
  {
    id: 'pr',
    url: 'maps/reistijdenauto',
    title: 'Verkeersstromen - Snelheden',
    layers: ['reistijdenauto'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  // Panoramabeelden
  {
    id: 'pano',
    url: 'maps/panorama',
    title: 'Panoramabeelden',
    layers: ['panorama_recent'],
    minZoom: 11,
    maxZoom: 16
  },
  {
    id: 'pano2016',
    url: 'maps/panorama',
    title: 'Panoramabeelden',
    layers: ['panorama_recent_2016'],
    minZoom: 11,
    maxZoom: 16
  },
  {
    id: 'pano2017',
    url: 'maps/panorama',
    title: 'Panoramabeelden',
    layers: ['panorama_recent_2017'],
    minZoom: 11,
    maxZoom: 16
  },
  {
    id: 'pano2018',
    url: 'maps/panorama',
    title: 'Panoramabeelden',
    layers: ['panorama_recent_2018'],
    minZoom: 11,
    maxZoom: 16
  },
  {
    id: 'pano2019',
    url: 'maps/panorama',
    title: 'Panoramabeelden',
    layers: ['panorama_recent_2019'],
    minZoom: 11,
    maxZoom: 16
  },
  {
    id: 'pano2020',
    url: 'maps/panorama',
    title: 'Panoramabeelden',
    layers: ['panorama_recent_2020'],
    minZoom: 11,
    maxZoom: 16
  }
];
