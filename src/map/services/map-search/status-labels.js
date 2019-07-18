const subTypesLabels = {
  bominslag: 'inslag',
  buurtcombinatie: 'wijk',
  gebiedsgerichtwerken: 'gebiedsgericht werken',
  gevrijwaardgebied: 'gevrijwaard gebied',
  grootstedelijkgebied: 'grootstedelijk gebied',
  ligplaats: 'ligplaats',
  stadsdeel: 'stadsdeel',
  standplaats: 'standplaats',
  uitgevoerdonderzoek: 'reeds uitgevoerd CE onderzoek',
  verdachtgebied: 'verdacht gebied',
}

export const getStatusLabel = type => {
  const semgents = type.split('/')
  const segment = semgents[1] ? semgents[1] : semgents[0]
  return subTypesLabels[segment] ? subTypesLabels[segment] : ''
}

const statusCodes = ['18']

const shouldShowStatus = result =>
  result.vbo_status && statusCodes.indexOf(result.vbo_status.code) > -1

export const getStatusLabelAddress = result =>
  `${shouldShowStatus(result) ? `${result.vbo_status.omschrijving}` : ''}` +
  `${shouldShowStatus(result) && !result.hoofdadres ? ' ' : ''}` +
  `${!result.hoofdadres ? 'Nevenadres' : ''}`
