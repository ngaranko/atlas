import L from 'leaflet'
import 'proj4'
import 'proj4leaflet'
import CRS_CONFIG from './crs-config.constant'

function getCrs() {
  const rdSettings = CRS_CONFIG.RD
  rdSettings.transformation.bounds = L.bounds.apply(null, CRS_CONFIG.RD.transformation.bounds)
  const crs = new L.Proj.CRS(rdSettings.code, rdSettings.projection, rdSettings.transformation)

  crs.distance = L.CRS.Earth.distance
  crs.R = CRS_CONFIG.EARTH_RADIUS

  return crs
}

export const getRdObject = () => ({
  type: 'name',
  properties: {
    name: CRS_CONFIG.RD.code,
  },
})

export default getCrs
