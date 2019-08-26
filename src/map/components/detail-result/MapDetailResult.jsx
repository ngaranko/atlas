import React from 'react'
import PropTypes from 'prop-types'

import { endpointTypes } from '../../services/map-detail'

import MapDetailPanel from './MapDetailPanel'

const MapDetailResult = ({ panoUrl, result, onMaximize, onPanoPreviewClick }) => {
  switch (result.endpointType) {
    case endpointTypes.adressenLigplaats:
      // eslint-disable-next-line no-case-declarations
      const adressenLigplaats = {
        title: 'Adres (ligplaats)',
        subTitle: result.label,
        items: [
          {
            label: 'Indicatie geconstateerd',
            value: result.indicatieGeconstateerd ? 'Ja' : 'Nee',
            status: result.indicatieGeconstateerd ? 'alert' : '',
          },
          {
            label: 'Aanduiding in onderzoek',
            value: result.aanduidingInOnderzoek ? 'Ja' : 'Nee',
            status: result.aanduidingInOnderzoek ? 'alert' : '',
          },
        ],
        notifications: [
          {
            value: result.indicatieGeconstateerd ? 'Indicatie geconstateerd' : false,
            level: 'alert',
          },
          {
            value: result.aanduidingInOnderzoek ? 'In onderzoek' : false,
            level: 'alert',
          },
        ],
      }

      return (
        <MapDetailPanel
          result={adressenLigplaats}
          onPanoPreviewClick={onPanoPreviewClick}
          onMaximize={onMaximize}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.adressenNummeraanduiding:
    case endpointTypes.adressenVerblijfsobject:
      // eslint-disable-next-line no-case-declarations
      const adressenNummeraanduiding = {
        title: 'Adres (verblijfsobject)',
        subTitle: result.label,
        items: [
          {
            label: 'Gebruiksdoel',
            value: result.gebruiksdoelenLabel,
            multiLine: true,
          },
          {
            label: 'Feitelijk gebruik',
            value: result.use.description,
          },
          {
            label: 'Status',
            value: result.status.description,
          },
          {
            label: 'Indicatie hoofdadres',
            value: result.isNevenadres ? 'Nee' : 'Ja',
            status: result.isNevenadres ? 'info' : '',
          },
          {
            label: 'Indicatie geconstateerd',
            value: result.indicatieGeconstateerd ? 'Ja' : 'Nee',
            status: result.indicatieGeconstateerd ? 'alert' : '',
          },
          {
            label: 'Aanduiding in onderzoek',
            value: result.aanduidingInOnderzoek ? 'Ja' : 'Nee',
            status: result.aanduidingInOnderzoek ? 'alert' : '',
          },
          {
            label: 'Oppervlakte',
            value: result.sizeLabel,
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
            value: result.indicatieGeconstateerd ? 'Indicatie geconstateerd' : false,
            level: 'alert',
          },
          {
            value: result.aanduidingInOnderzoek ? 'In onderzoek' : false,
            level: 'alert',
          },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={adressenNummeraanduiding}
        />
      )
    case endpointTypes.adressenOpenbareRuimte:
      // eslint-disable-next-line no-case-declarations
      const adressenOpenbareRuimte = {
        title: result.type,
        subTitle: result.label,
        items: [{ label: 'Naam 24-posities (NEN)', value: result.nenName }],
      }
      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          result={adressenOpenbareRuimte}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.adressenPand:
      // eslint-disable-next-line no-case-declarations
      const adressenPand = {
        title: ' Pand',
        subTitle: result.label,
        items: [
          {
            label: 'Oorspronkelijk bouwjaar',
            value: result.year,
          },
          {
            label: 'Naam',
            value: result.name,
          },
          {
            label: 'Status',
            value: result.status.description,
            status: result.status.level,
          },
        ],
        notifications: [
          {
            value: result.status && result.status.level ? result.status.description : false,
            level: result.status ? result.status.level : '',
          },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          result={adressenPand}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.adressenStandplaats:
      // eslint-disable-next-line no-case-declarations
      const adressenStandplaats = {
        title: 'Adres (standplaats)',
        subTitle: result.label,
        items: [
          {
            label: 'Indicatie geconstateerd',
            value: result.indicatieGeconstateerd ? 'Ja' : 'Nee',
            status: result.indicatieGeconstateerd ? 'alert' : '',
          },
          {
            label: 'Aanduiding in onderzoek',
            value: result.aanduidingInOnderzoek ? 'Ja' : 'Nee',
            status: result.aanduidingInOnderzoek ? 'alert' : '',
          },
        ],
        notifications: [
          {
            value: result.indicatieGeconstateerd ? 'Indicatie geconstateerd' : false,
            level: 'alert',
          },
          {
            value: result.aanduidingInOnderzoek ? 'In onderzoek' : false,
            level: 'alert',
          },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={adressenStandplaats}
        />
      )
    case endpointTypes.bedrijfsinvesteringszone:
      // eslint-disable-next-line no-case-declarations
      const bedrijfsinvesteringszone = {
        title: 'bedrijfsinvesteringszone',
        subTitle: result.label,
        items: [
          { label: 'Type', value: result.type },
          { label: 'Heffingsgrondslag', value: result.heffingsgrondslag },
          { label: 'Jaarlijkse heffing', value: result.heffingLabel },
          { label: 'Aantal heffingsplichtigen', value: result.heffingsplichtigen },
        ],
      }

      return (
        <MapDetailPanel
          result={bedrijfsinvesteringszone}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.bekendmakingen:
      // eslint-disable-next-line no-case-declarations
      const bekendmakingen = {
        title: 'Bekendmaking',
        subTitle: result.label,
        items: [
          { label: 'Datum', value: result.date },
          { label: 'Categorie', value: result.categorie },
          { label: 'Onderwerp', value: result.onderwerp },
          { label: 'Beschrijving', value: result.beschrijving, multiLine: true },
          { label: 'Meer informatie', value: result.url, link: result.url },
        ],
      }

      return (
        <MapDetailPanel
          result={bekendmakingen}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.explosievenGevrijwaardGebied:
      // eslint-disable-next-line no-case-declarations
      const explosievenGevrijwaardGebied = {
        title: 'Gevrijwaard gebied',
        subTitle: result.label,
        items: [
          { label: 'Datum rapport', value: result.dateLabel },
          { label: 'Soort handeling', value: result.type },
          { label: 'Bron', value: result.source },
          { label: 'Opmerkingen', value: result.remarks, multiLine: true },
        ],
      }

      return (
        <MapDetailPanel
          result={explosievenGevrijwaardGebied}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.explosievenInslag:
      // eslint-disable-next-line no-case-declarations
      const explosievenInslag = {
        title: 'Inslag',
        subTitle: result.label,
        items: [
          { label: 'Datum van inslag', value: result.dateLabel },
          { label: 'Soort handeling', value: result.type },
          { label: 'Bron', value: result.source, multiLine: true },
          { label: 'Opmerkingen', value: result.remarks },
        ],
      }

      return (
        <MapDetailPanel
          result={explosievenInslag}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.explosievenUitgevoerdOnderzoek:
      // eslint-disable-next-line no-case-declarations
      const explosievenUitgevoerdOnderzoek = {
        title: 'Reeds uitgevoerd CE onderzoek',
        subTitle: result.label,
        items: [
          { label: 'Datum rapport', value: result.dateLabel },
          { label: 'Soort rapportage', value: result.type },
          { label: 'Onderzoeksgebied', value: result.onderzoeksgebied },
          { label: 'Verdacht gebied', value: result.verdachtGebied },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={explosievenUitgevoerdOnderzoek}
        />
      )
    case endpointTypes.explosievenVerdachtGebied:
      // eslint-disable-next-line no-case-declarations
      const explosievenVerdachtGebied = {
        title: 'Verdacht gebied',
        subTitle: result.label,
        items: [
          { label: 'Hoofdgroep', value: result.type },
          { label: 'Subsoort', value: result.subtype },
          { label: 'Opmerkingen', value: result.remarks, multiLine: true },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={explosievenVerdachtGebied}
        />
      )
    case endpointTypes.evenementen:
      // eslint-disable-next-line no-case-declarations
      const evenementen = {
        title: 'Evenement',
        subTitle: result.label,
        items: [
          { label: 'Startdatum', value: result.startdatum },
          { label: 'Einddatum', value: result.einddatum },
          { label: 'Meer informatie', value: result.url, link: result.url },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={evenementen}
        />
      )
    case endpointTypes.gebiedenBouwblok:
      // eslint-disable-next-line no-case-declarations
      const gebiedenBouwblok = {
        title: 'Bouwblok',
        subTitle: result.label,
        items: [],
      }
      return (
        <MapDetailPanel
          result={gebiedenBouwblok}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.gebiedenBuurt:
      // eslint-disable-next-line no-case-declarations
      const gebiedenBuurt = {
        title: 'Buurt',
        subTitle: result.label,
        items: [{ label: 'Code', value: result.volledigeCode }],
      }

      return (
        <MapDetailPanel
          result={gebiedenBuurt}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.gebiedenGebiedsgerichtWerken:
      // eslint-disable-next-line no-case-declarations
      const gebiedenGebiedsgerichtWerken = {
        title: 'Gebiedsgerichtwerken-gebied',
        subTitle: result.label,
        items: [{ label: 'Code', value: result.code }],
      }

      return (
        <MapDetailPanel
          result={gebiedenGebiedsgerichtWerken}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.gebiedenGrootstedelijk:
      // eslint-disable-next-line no-case-declarations
      const gebiedenGrootstedelijk = {
        title: 'Grootstedelijk gebied',
        subTitle: result.label,
        items: [],
      }

      return (
        <MapDetailPanel
          result={gebiedenGrootstedelijk}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.gebiedenStadsdeel:
      // eslint-disable-next-line no-case-declarations
      const gebiedenStadsdeel = {
        title: 'Stadsdeel',
        subTitle: result.label,
        items: [
          { label: 'Code', value: result.code },
          {
            label: 'Grondexploitaties',
            value: result.grex && [
              { label: 'Totale begroting baten', value: result.grex.totalIncomeLabel },
              { label: 'Totale begroting kosten', value: result.grex.totalExpenseLabel },
              { label: 'Verschil', value: result.grex.totalResultLabel },
            ],
          },
        ],
        notifications: [
          {
            value: !result.grex
              ? 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om grondexploitaties te bekijken.'
              : false,
          },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={gebiedenStadsdeel}
        />
      )
    case endpointTypes.gebiedenUnesco:
      // eslint-disable-next-line no-case-declarations
      const gebiedenUnesco = {
        title: 'UNESCO',
        subTitle: result.label,
        items: [],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={gebiedenUnesco}
        />
      )
    case endpointTypes.gebiedenWijk:
      // eslint-disable-next-line no-case-declarations
      const gebiedenWijk = {
        title: 'Wijk',
        subTitle: result.label,
        items: [{ label: 'Code', value: result.code }],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={gebiedenWijk}
        />
      )
    case endpointTypes.grondexploitatie:
      // eslint-disable-next-line no-case-declarations
      const grondexploitatie = {
        title: 'Grondexploitatie',
        subTitle: result.label,
        items: [
          { label: 'Nummer', value: result.plannr },
          { label: 'Startdatum', value: result.startdatumLabel },
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
      }

      return (
        <MapDetailPanel
          panoUrl={panoUrl}
          onPanoPreviewClick={onPanoPreviewClick}
          onMaximize={onMaximize}
          result={grondexploitatie}
        />
      )
    case endpointTypes.kadastraalObject:
      // eslint-disable-next-line no-case-declarations
      const kadastraalObject = {
        title: 'Kadastraa object',
        subTitle: result.label,
        items: [
          {
            label: 'Kadastrale gemeente',
            value: result.kadastraleGemeente ? result.kadastraleGemeente.name : false,
          },
          {
            label: 'Gemeente',
            value: result.kadastraleGemeente ? result.kadastraleGemeente.gemeente : false,
          },
          { label: 'Grootte', value: result.sizeLabel },
        ],
      }

      return (
        <MapDetailPanel
          result={kadastraalObject}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.meetbout:
      // eslint-disable-next-line no-case-declarations
      const meetbout = {
        title: 'Meetbout',
        subTitle: result.label,
        items: [
          { label: 'Adres', value: result.address },
          { label: 'Zaksnelheid (mm/j)', value: result.zakkingssnelheid },
        ],
      }

      return (
        <MapDetailPanel
          result={meetbout}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.monument:
      // eslint-disable-next-line no-case-declarations
      const monument = {
        title: 'Monument',
        subTitle: result.label,
        items: [
          { label: 'Nummer', value: result.number },
          { label: 'Type', value: result.type },
          { label: 'Status', value: result.status },
        ],
      }

      return (
        <MapDetailPanel
          result={monument}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.napPeilmerk:
      // eslint-disable-next-line no-case-declarations
      const napPeilmerk = {
        titel: 'NAP Peilmerk',
        subTitle: result.label,
        items: [
          { label: 'Hoogte NAP', value: result.heightLabel },
          { label: 'Omschrijving', value: result.description, multiLine: true },
          { label: 'Windrichting', value: result.windDirection },
          { label: 'Muurvlakcoördinaten (cm)', value: result.wallCoordinatesLabel },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={napPeilmerk}
        />
      )
    case endpointTypes.oplaadpunten:
      // eslint-disable-next-line no-case-declarations
      const oplaadpunten = {
        title: 'Oplaadpunt',
        subTitle: result.label,
        items: [
          { label: 'Adres', value: result.address },
          { label: 'Aantal', value: result.quantity },
          { label: 'Soort', value: result.type },
          { label: 'Capaciteit', value: result.capacity },
          { label: 'Connectortype', value: result.connectorType },
          { label: 'Status', value: result.currentStatus },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={oplaadpunten}
        />
      )
    case endpointTypes.parkeervak:
      // eslint-disable-next-line no-case-declarations
      const parkeervak = {
        title: 'Parkeervak',
        subTitle: result.label,
        items: [
          { label: 'Straat', value: result.straatnaam },
          { label: 'Type', value: result.e_type_desc },
          { label: 'Bord', value: result.bord },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={parkeervak}
        />
      )
    case endpointTypes.parkeerzones:
      // eslint-disable-next-line no-case-declarations
      const parkeerzones = {
        title: 'Parkeervergunninggebied',
        subTitle: result.label,
        items: [{ label: 'Omschrijving', value: result.description, multiLine: true }],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={parkeerzones}
        />
      )
    case endpointTypes.parkeerzonesUitz:
      // eslint-disable-next-line no-case-declarations
      const parkeerzonesUitz = {
        title: 'Uitzondering parkeervergunninggebied',
        subTitle: result.label,
        items: [{ label: 'Omschrijving', value: result.description, multiLine: true }],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={parkeerzonesUitz}
        />
      )
    case endpointTypes.vastgoed:
      // eslint-disable-next-line no-case-declarations
      const vastgoed = {
        title: 'Gemeentelijk eigendom',
        subTitle: result.label,
        items: [
          { label: 'Bouwjaar', value: result.construction_year },
          { label: 'Status', value: result.status },
        ],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={vastgoed}
        />
      )
    case endpointTypes.vestiging:
      // eslint-disable-next-line no-case-declarations
      const vestiging = {
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
            value: result.visitingAddress,
            multiLine: true,
          },
          {
            label: 'SBI-code en -omschrijving',
            value: result.activitiesLabel,
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
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={vestiging}
        />
      )
    case endpointTypes.winkelgebied:
      // eslint-disable-next-line no-case-declarations
      const winkelgebied = {
        title: 'Winkelgebied',
        subTitle: result.label,
        notifications: [
          {
            value:
              'De grenzen van dit winkelgebied zijn indicatief. Er kunnen geen rechten aan worden ontleend.',
          },
        ],
        items: [{ label: 'Categorie', value: result.category }],
      }

      return (
        <MapDetailPanel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          result={winkelgebied}
        />
      )
    default:
      return ''
  }
}

MapDetailResult.defaultProps = {
  panoUrl: '',
  result: {},
}

MapDetailResult.propTypes = {
  panoUrl: PropTypes.string,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
  result: PropTypes.shape({}),
}

export default MapDetailResult
