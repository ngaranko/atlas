import { endpointTypes } from './map-detail'

const fieldsByEndPointType = {
  [endpointTypes.adressenLigplaats]: result => ({
    title: 'Adres (ligplaats)',
    subTitle: result.label,
    items: [
      {
        label: 'Indicatie geconstateerd',
        value: result.indicatie_geconstateerd ? 'Ja' : 'Nee',
        status: result.indicatie_geconstateerd ? 'alert' : '',
      },
      {
        label: 'Aanduiding in onderzoek',
        value: result.aanduiding_in_onderzoek ? 'Ja' : 'Nee',
        status: result.aanduiding_in_onderzoek ? 'alert' : '',
      },
    ],
    notifications: [
      {
        value: result.indicatie_geconstateerd ? 'Indicatie geconstateerd' : false,
        level: 'alert',
      },
      {
        value: result.aanduiding_in_onderzoek ? 'In onderzoek' : false,
        level: 'alert',
      },
    ],
  }),
  [endpointTypes.adressenNummeraanduiding]: result => ({
    title: 'Adres (verblijfsobject)',
    subTitle: result.label,
    items: [
      {
        label: 'Gebruiksdoel',
        value: result.gebruiksdoelen,
        multiLine: true,
      },
      {
        label: 'Feitelijk gebruik',
        value: result.gebruik.omschrijving,
      },
      {
        label: 'Status',
        value: result.status.omschrijving,
      },
      {
        label: 'Indicatie hoofdadres',
        value: result.isNevenadres ? 'Nee' : 'Ja',
        status: result.isNevenadres ? 'info' : '',
      },
      {
        label: 'Indicatie geconstateerd',
        value: result.indicatie_geconstateerd ? 'Ja' : 'Nee',
        status: result.indicatie_geconstateerd ? 'alert' : '',
      },
      {
        label: 'Aanduiding in onderzoek',
        value: result.aanduiding_in_onderzoek ? 'Ja' : 'Nee',
        status: result.aanduiding_in_onderzoek ? 'alert' : '',
      },
      {
        label: 'Oppervlakte',
        value: result.size,
      },
    ],
    notifications: [
      {
        value: result.status.level ? `Status: ${result.status.description}` : false,
        level: result.status.level,
      },
      {
        value: result.isNevenadres ? 'Dit is een nevenadres' : false,
        level: 'info',
      },
      {
        value: result.indicatie_geconstateerd ? 'Indicatie geconstateerd' : false,
        level: 'alert',
      },
      {
        value: result.aanduiding_in_onderzoek ? 'In onderzoek' : false,
        level: 'alert',
      },
    ],
  }),
  [endpointTypes.adressenOpenbareRuimte]: result => ({
    title: result.type,
    subTitle: result.label,
    items: [{ label: 'Naam 24-posities (NEN)', value: result.naam_24_posities }],
  }),
  [endpointTypes.adressenPand]: result => ({
    title: ' Pand',
    subTitle: result.label,
    items: [
      {
        label: 'Oorspronkelijk bouwjaar',
        value: result.year,
      },
      {
        label: 'Naam',
        value: result.pandnaam,
      },
      {
        label: 'Status',
        value: result.status.omschrijving,
        status: result.statusLevel,
      },
    ],
    notifications: [
      {
        value: result.statusLevel ? result.status.omschrijving : false,
        level: result.statusLevel ? result.statusLevel : '',
      },
    ],
  }),
  [endpointTypes.adressenStandplaats]: result => ({
    title: 'Adres (standplaats)',
    subTitle: result.label,
    items: [
      {
        label: 'Indicatie geconstateerd',
        value: result.indicatie_geconstateerd ? 'Ja' : 'Nee',
        status: result.indicatie_geconstateerd ? 'alert' : '',
      },
      {
        label: 'Aanduiding in onderzoek',
        value: result.aanduiding_in_onderzoek ? 'Ja' : 'Nee',
        status: result.aanduiding_in_onderzoek ? 'alert' : '',
      },
    ],
    notifications: [
      {
        value: result.indicatie_geconstateerd ? 'Indicatie geconstateerd' : false,
        level: 'alert',
      },
      {
        value: result.aanduiding_in_onderzoek ? 'In onderzoek' : false,
        level: 'alert',
      },
    ],
  }),
  [endpointTypes.bedrijfsinvesteringszone]: result => ({
    title: 'bedrijfsinvesteringszone',
    subTitle: result.label,
    items: [
      { label: 'Type', value: result.biz_type },
      { label: 'Heffingsgrondslag', value: result.heffingsgrondslag },
      { label: 'Jaarlijkse heffing', value: result.heffing_display },
      { label: 'Aantal heffingsplichtigen', value: result.bijdrageplichtigen },
    ],
  }),
  [endpointTypes.bekendmakingen]: result => ({
    title: 'Bekendmaking',
    subTitle: result.label,
    items: [
      { label: 'Datum', value: result.date },
      { label: 'Categorie', value: result.categorie },
      { label: 'Onderwerp', value: result.onderwerp },
      { label: 'Beschrijving', value: result.beschrijving, multiLine: true },
      { label: 'Meer informatie', value: result.url, link: result.url },
    ],
  }),
  [endpointTypes.explosievenGevrijwaardGebied]: result => ({
    title: 'Gevrijwaard gebied',
    subTitle: result.label,
    items: [
      { label: 'Datum rapport', value: result.date },
      { label: 'Soort handeling', value: result.type },
      { label: 'Bron', value: result.bron },
      { label: 'Opmerkingen', value: result.opmerkingen, multiLine: true },
    ],
  }),
  [endpointTypes.explosievenInslag]: result => ({
    title: 'Inslag',
    subTitle: result.label,
    items: [
      { label: 'Datum van inslag', value: result.date },
      { label: 'Soort handeling', value: result.type },
      { label: 'Bron', value: result.bron, multiLine: true },
      { label: 'Opmerkingen', value: result.opmerkingen },
    ],
  }),
  [endpointTypes.explosievenUitgevoerdOnderzoek]: result => ({
    title: 'Reeds uitgevoerd CE onderzoek',
    subTitle: result.label,
    items: [
      { label: 'Datum rapport', value: result.date },
      { label: 'Soort rapportage', value: result.type },
      { label: 'Onderzoeksgebied', value: result.onderzoeksgebied },
      { label: 'Verdacht gebied', value: result.verdacht_gebied },
    ],
  }),
  [endpointTypes.explosievenVerdachtGebied]: result => ({
    title: 'Verdacht gebied',
    subTitle: result.label,
    items: [
      { label: 'Hoofdgroep', value: result.type },
      { label: 'Subsoort', value: result.subtype },
      { label: 'Opmerkingen', value: result.opmerkingen, multiLine: true },
    ],
  }),
  [endpointTypes.evenementen]: result => ({
    title: 'Evenement',
    subTitle: result.titel,
    items: [
      { label: 'Startdatum', value: result.startDate },
      { label: 'Einddatum', value: result.endDate },
      { label: 'Meer informatie', value: result.url, link: result.url },
    ],
  }),
  [endpointTypes.gebiedenBouwblok]: result => ({
    title: 'Bouwblok',
    subTitle: result.label,
    items: [],
  }),
  [endpointTypes.gebiedenBuurt]: result => ({
    title: 'Buurt',
    subTitle: result.label,
    items: [{ label: 'Code', value: result.volledige_code }],
  }),
  [endpointTypes.gebiedenGebiedsgerichtWerken]: result => ({
    title: 'Gebiedsgerichtwerken-gebied',
    subTitle: result.label,
    items: [{ label: 'Code', value: result.code }],
  }),
  [endpointTypes.gebiedenGrootstedelijk]: result => ({
    title: 'Grootstedelijk gebied',
    subTitle: result.label,
    items: [],
  }),
  [endpointTypes.gebiedenStadsdeel]: result => ({
    title: 'Stadsdeel',
    subTitle: result.label,
    items: [
      { label: 'Code', value: result.code },
      {
        label: 'Grondexploitaties',
        value: result.totaal_baten && [
          { label: 'Totale begroting baten', value: result.totaal_baten_display },
          { label: 'Totale begroting kosten', value: result.totaal_lasten_display },
          { label: 'Verschil', value: result.totaal_resultaat_display },
        ],
      },
    ],
    notifications: [
      {
        value: !result.totaal_baten
          ? 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om grondexploitaties te bekijken.'
          : false,
      },
    ],
  }),
  [endpointTypes.gebiedenUnesco]: result => ({
    title: 'UNESCO',
    subTitle: result.label,
    items: [],
  }),
  [endpointTypes.gebiedenWijk]: result => ({
    title: 'Wijk',
    subTitle: result.label,
    items: [{ label: 'Code', value: result.code }],
  }),
  [endpointTypes.grondexploitatie]: result => ({
    title: 'Grondexploitatie',
    subTitle: result.label,
    items: [
      { label: 'Nummer', value: result.plannr },
      { label: 'Startdatum', value: result.startDate },
      { label: 'Fase', value: result.fase },
      { label: 'Totale begroting baten', value: result.totaal_baten_display },
      { label: 'Totale begroting kosten', value: result.totaal_kosten_display },
      { label: 'Verschil', value: result.totaal_resultaat_display },
    ],
    notifications: [
      {
        value: !result.plannr
          ? 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om grondexploitaties te bekijken.'
          : false,
      },
    ],
  }),
  [endpointTypes.kadastraalObject]: result => ({
    title: 'Kadastraal object',
    subTitle: result.label,
    items: [
      {
        label: 'Kadastrale gemeente',
        value: result.cadastralName,
      },
      {
        label: 'Gemeente',
        value: result.name,
      },
      { label: 'Grootte', value: result.size },
    ],
  }),
  [endpointTypes.meetbout]: result => ({
    title: 'Meetbout',
    subTitle: result.label,
    items: [
      { label: 'Adres', value: result.adres },
      { label: 'Zaksnelheid (mm/j)', value: result.zakkingssnelheid },
    ],
  }),
  [endpointTypes.monument]: result => ({
    title: 'Monument',
    subTitle: result.label,
    items: [
      { label: 'Nummer', value: result.monumentnummer },
      { label: 'Type', value: result.monumenttype },
      { label: 'Status', value: result.monumentstatus },
    ],
  }),
  [endpointTypes.napPeilmerk]: result => ({
    titel: 'NAP Peilmerk',
    subTitle: result.label,
    items: [
      { label: 'Hoogte NAP', value: result.height },
      { label: 'Omschrijving', value: result.omschrijving, multiLine: true },
      { label: 'Windrichting', value: result.windrichting },
      { label: 'Muurvlakcoördinaten (cm)', value: result.wallCoordinates },
    ],
  }),
  [endpointTypes.oplaadpunten]: result => ({
    title: 'Oplaadpunt',
    subTitle: result.label,
    items: [
      { label: 'Adres', value: result.address },
      { label: 'Aantal', value: result.quantity },
      { label: 'Soort', value: result.type },
      { label: 'Capaciteit', value: result.charging_capability },
      { label: 'Connectortype', value: result.connector_type },
      { label: 'Status', value: result.currentStatus },
    ],
  }),
  [endpointTypes.parkeervak]: result => ({
    title: 'Parkeervak',
    subTitle: result.label,
    items: [
      { label: 'Straat', value: result.straatnaam },
      { label: 'Type', value: result.e_type_desc },
      { label: 'Bord', value: result.bord },
    ],
  }),
  [endpointTypes.parkeerzones]: result => ({
    title: 'Parkeervergunninggebied',
    subTitle: result.label,
    items: [{ label: 'Omschrijving', value: result.gebied_omschrijving, multiLine: true }],
  }),
  [endpointTypes.parkeerzonesUitz]: result => ({
    title: 'Uitzondering parkeervergunninggebied',
    subTitle: result.label,
    items: [{ label: 'Omschrijving', value: result.omschrijving, multiLine: true }],
  }),
  [endpointTypes.vastgoed]: result => ({
    title: 'Gemeentelijk eigendom',
    subTitle: result.label,
    items: [
      { label: 'Bouwjaar', value: result.construction_year },
      { label: 'Status', value: result.status },
    ],
  }),
  [endpointTypes.vestiging]: result => ({
    title: 'Vestiging',
    subTitle: result.label,
    items: [
      {
        label: 'KvK-nummer',
        value: result.kvkNumber,
      },
      {
        label: 'Vestigingsnummer',
        value: result.vestigingsnummer,
      },
      {
        label: 'Bezoekadres',
        value: result.bezoekadres.volledig_adres,
        multiLine: true,
      },
      {
        label: 'SBI-code en -omschrijving',
        value: result.activities,
        multiLine: true,
      },
      {
        label: 'Type',
        value: result.type,
      },
      {
        label: 'Soort bijzondere rechtstoestand',
        value:
          result.bijzondereRechtstoestand && result.bijzondereRechtstoestand.label
            ? result.bijzondereRechtstoestand.label
            : false,
      },
    ],
    notifications: [
      {
        value:
          result.bijzondereRechtstoestand && result.bijzondereRechtstoestand.label
            ? result.bijzondereRechtstoestand.label
            : false,
        level: 'alert',
      },
      {
        value: !result.label
          ? 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om maatschappelijke activiteiten en vestigingen te bekijken.'
          : false,
        level: 'info',
      },
    ],
  }),
  [endpointTypes.winkelgebied]: result => ({
    title: 'Winkelgebied',
    subTitle: result.label,
    notifications: [
      {
        value:
          'De grenzen van dit winkelgebied zijn indicatief. Er kunnen geen rechten aan worden ontleend.',
      },
    ],
    items: [
      {
        label: 'Categorie',
        value: result.categorie_naam ? `${result.categorie_naam} (${result.categorie})` : false, // check where to normalize
      },
    ],
  }),
}

export default fieldsByEndPointType
