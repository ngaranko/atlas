import React from 'react'
import PropTypes from 'prop-types'

import { endpointTypes } from '../../services/map-detail'
import MapDetailAdressenLigplaats from './adressen/MapDetailAdressenLigplaats'
import MapDetailAdressenPand from './adressen/MapDetailAdressenPand'
import MapDetailAdressenStandplaats from './adressen/MapDetailAdressenStandplaats'
import MapDetailAdressenVerblijfsobject from './adressen/MapDetailAdressenVerblijfsobject'
import MapDetailVestiging from './MapDetailVestiging'

// Need to check if these are still needed
import MapDetailGebiedenBuurt from './gebieden/MapDetailGebiedenBuurt'
import MapDetailGebiedenGebiedsgerichtWerken from './gebieden/MapDetailGebiedenGebiedsgerichtWerken'
import MapDetailGebiedenGrootstedelijk from './gebieden/MapDetailGebiedenGrootstedelijk'
import MapDetailGebiedenStadsdeel from './gebieden/MapDetailGebiedenStadsdeel'
import MapDetailGebiedenUnesco from './gebieden/MapDetailGebiedenUnesco'
import MapDetailGebiedenWijk from './gebieden/MapDetailGebiedenWijk'
import MapDetailExplosievenGevrijwaardGebied from './explosieven/MapDetailExplosievenGevrijwaardGebied'
import MapDetailExplosievenUitgevoerdOnderzoek from './explosieven/MapDetailExplosievenUitgevoerdOnderzoek'
import MapDetailExplosievenVerdachtGebied from './explosieven/MapDetailExplosievenVerdachtGebied'

import MapDetailPanel from './MapDetailPanel'

const MapDetailResult = ({ panoUrl, result, onMaximize, onPanoPreviewClick }) => {
  switch (result.endpointType) {
    case endpointTypes.adressenLigplaats:
      return (
        <MapDetailAdressenLigplaats
          ligplaats={result}
          onPanoPreviewClick={onPanoPreviewClick}
          onMaximize={onMaximize}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.adressenNummeraanduiding:
    case endpointTypes.adressenVerblijfsobject:
      return (
        <MapDetailAdressenVerblijfsobject
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          verblijfsobject={result}
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
      return (
        <MapDetailAdressenPand
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          pand={result}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.adressenStandplaats:
      return (
        <MapDetailAdressenStandplaats
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          standplaats={result}
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
      return (
        <MapDetailExplosievenGevrijwaardGebied
          gevrijwaardGebied={result}
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
      return (
        <MapDetailExplosievenUitgevoerdOnderzoek
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          uitgevoerdOnderzoek={result}
        />
      )
    case endpointTypes.explosievenVerdachtGebied:
      return (
        <MapDetailExplosievenVerdachtGebied
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          verdachtGebied={result}
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
      return (
        <MapDetailGebiedenBuurt
          buurt={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.gebiedenGebiedsgerichtWerken:
      return (
        <MapDetailGebiedenGebiedsgerichtWerken
          gebiedsgerichtWerken={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.gebiedenGrootstedelijk:
      return (
        <MapDetailGebiedenGrootstedelijk
          grootstedelijk={result}
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
        />
      )
    case endpointTypes.gebiedenStadsdeel:
      return (
        <MapDetailGebiedenStadsdeel
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          stadsdeel={result}
        />
      )
    case endpointTypes.gebiedenUnesco:
      return (
        <MapDetailGebiedenUnesco
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          unesco={result}
        />
      )
    case endpointTypes.gebiedenWijk:
      return (
        <MapDetailGebiedenWijk
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          wijk={result}
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
        notification: !result.plannr
          ? 'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om grondexploitaties te bekijken.'
          : false,
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
      return (
        <MapDetailVestiging
          onMaximize={onMaximize}
          onPanoPreviewClick={onPanoPreviewClick}
          panoUrl={panoUrl}
          vestiging={result}
        />
      )
    case endpointTypes.winkelgebied:
      // eslint-disable-next-line no-case-declarations
      const winkelgebied = {
        title: 'Winkelgebied',
        subTitle: result.label,
        notification:
          'De grenzen van dit winkelgebied zijn indicatief. Er kunnen geen rechten aan worden ontleend.',
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
