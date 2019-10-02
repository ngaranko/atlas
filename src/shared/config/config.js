import cmsConfig from './cms.config'

const CONTENT_LIST = require('./content-links.json')

export const FOOTER_LINKS = CONTENT_LIST && CONTENT_LIST.FOOTER
export const HEADER_LINKS = CONTENT_LIST && CONTENT_LIST.HEADER
export const NAVIGATION_LINKS = CONTENT_LIST && CONTENT_LIST.NAVIGATION

export { cmsConfig }
