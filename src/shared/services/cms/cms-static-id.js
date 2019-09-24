import { getByUri } from '../api/api'

const getCmsId = async slug => {
  const cmsId = await getByUri(`/cms_local/cms-id.json`)
  return cmsId[slug]
}

export default getCmsId
