import angular from 'angular'
// All third party dependencies
import './vendor'
// All our modules' javascript
import '../modules/atlas/atlas.module'
import '../modules/atlas/atlas.run'
import '../modules/atlas/services/redux/store.run'
import '../modules/data-selection/data-selection.module'
import '../modules/data-selection/components/available-filters/available-filters.component'
import '../modules/data-selection/components/sbi-filter/sbi-filter.component'
import '../modules/data-selection/components/header/download-button/download-button.component'
import '../modules/data-selection/components/header/header.component'
import '../modules/data-selection/components/header/toggle-view-button/toggle-view-button.component'
import '../modules/data-selection/components/pagination/pagination-link.component'
import '../modules/data-selection/components/pagination/pagination.component'
import '../modules/data-selection/services/document-title/document-title.factory'
import '../modules/detail/detail.module'
import '../modules/detail/components/api-call/api-call.component'
import '../modules/detail/components/bbga-graphs/bbga-config.constant'
import '../modules/detail/components/bbga-graphs/bbga-data.factory'
import '../modules/detail/components/bbga-graphs/bbga-graphs.directive'
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid-config.constant'
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid.component'
import '../modules/detail/components/current-date/current-date.directive'
import '../modules/detail/components/data-selection-links/data-selection-links.component'
import '../modules/detail/components/date/date.filter'
import '../modules/detail/components/detail/detail.component'
import '../modules/detail/components/filename/filename.filter'
import '../modules/detail/components/option-label/option-label.filter'
import '../modules/detail/components/glossary/glossary.constant'
import '../modules/detail/components/glossary/header/glossary-header.directive'
import '../modules/detail/components/glossary/meta/glossary-meta.directive'
import '../modules/detail/components/meetbouten-graph/meetbouten-graph.directive'
import '../modules/detail/components/parent-relations/parent-relations.constant'
import '../modules/detail/components/parent-relations/parent-relations.directive'
import '../modules/detail/components/partial-select/partial-compiler.factory'
import '../modules/detail/components/partial-select/partial-select.directive'
import '../modules/detail/components/time-period/time-period.filter'
import '../modules/detail/components/wkpb-link/wkpb-link.component'
import '../modules/detail/components/wkpb-download-link/wkpb-download-link.component'
import '../modules/detail/components/yes-no/yes-no.filter'
import '../modules/detail/detail.vendor'
import '../modules/detail/services/date-converter/date-converter.factory'
import '../modules/detail/services/date-formatter/date-formatter.factory'
import '../modules/detail/services/geometry/geometry.factory'
import '../modules/shared/shared.module'
import '../modules/shared/components/coordinates/coordinates.filter'
import '../modules/shared/components/dcatd-button/dcatd-button.component'
import '../modules/shared/components/expand-collapse/expand-collapse.directive'
// import '../modules/shared/components/link/link.component';
import '../modules/shared/components/loading-indicator/loading-indicator.component'
import '../modules/shared/components/message/message.component'
import '../modules/shared/components/panel/panel.component'
import '../modules/shared/components/panorama-thumbnail/panorama-thumbnail.component'
import '../modules/shared/components/uppercase-first-letter/uppercase-first-letter.filter'
import '../modules/shared/filters/filesize.filter'
import '../modules/shared/filters/kebabcase.filter'
import '../modules/shared/services/api/api.factory'
import '../modules/shared/services/crs/crs-config.constant'
import '../modules/shared/services/crs/crs-converter.factory'
import '../modules/shared/services/window-error-handler/window-error-handler.factory'
import '../modules/shared/services/window-error-handler/window-error-handler.run'
import '../modules/shared/services/http-error-registrar/http-error-registrar.factory'
import '../modules/shared/services/http-error-registrar/http-status.factory'
import '../modules/shared/services/localization/localization.factory'
import '../modules/shared/services/redux/store.factory'
import '../modules/shared/services/storage/instance-storage.factory'
import '../modules/shared/services/storage/storage.factory'
import '../modules/shared/shared.vendor'
// The mocks
import 'angular-mocks'
import '../modules/shared/components/link/link.component.mock'
// All our modules' javascript tests
import '../modules/data-selection/components/available-filters/available-filters.component.test'
import '../modules/data-selection/components/sbi-filter/sbi-filter.component.test'
import '../modules/data-selection/components/header/download-button/download-button.component.test'
import '../modules/data-selection/components/header/toggle-view-button/toggle-view-button.component.test'
import '../modules/data-selection/components/header/header.component.test'
import '../modules/data-selection/services/document-title/document-title.factory.test'
import '../modules/detail/components/meetbouten-graph/meetbouten-graph.directive.test'
import '../modules/detail/components/glossary/meta/glossary-meta.directive.test'
import '../modules/detail/components/glossary/header/glossary-header.directive.test'
import '../modules/detail/components/filename/filename.filter.test'
import '../modules/detail/components/option-label/option-label.filter.test'
import '../modules/detail/components/date/date.filter.test'
import '../modules/detail/components/partial-select/partial-select.directive.test'
import '../modules/detail/components/partial-select/partial-compiler.factory.test'
import '../modules/detail/components/current-date/current-date.directive.test'
import '../modules/detail/components/api-call/api-call.component.test'
import '../modules/detail/components/time-period/time-period.filter.test'
import '../modules/detail/components/wkpb-link/wkpb-link.component.test'
import '../modules/detail/components/wkpb-download-link/wkpb-download-link.component.test'
import '../modules/detail/components/parent-relations/parent-relations.directive.test'
import '../modules/detail/components/data-selection-links/data-selection-links.component.test'
import '../modules/detail/components/detail/detail.component.test'
import '../modules/detail/components/yes-no/yes-no.filter.test'
import '../modules/detail/components/bbga-graphs/bbga-data.factory.test'
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid.component.test'
import '../modules/detail/components/bbga-graphs/bbga-graphs.directive.test'
import '../modules/detail/services/geometry/geometry.factory.test'
import '../modules/detail/services/date-converter/date-converter.factory.test'
import '../modules/shared/components/expand-collapse/expand-collapse.directive.test'
import '../modules/shared/components/link/link.component.test'
import '../modules/shared/components/panorama-thumbnail/panorama-thumbnail.component.test'
import '../modules/shared/components/panel/panel.component.test'
import '../modules/shared/components/message/message.component.test'
import '../modules/shared/components/loading-indicator/loading-indicator.component.test'
import '../modules/shared/components/uppercase-first-letter/uppercase-first-letter.filter.test'
import '../modules/shared/components/coordinates/coordinates.filter.test'
import '../modules/shared/components/dcatd-button/dcatd-button.component.test'
import '../modules/shared/services/storage/storage.factory.test'
import '../modules/shared/services/redux/store.factory.test'
import '../modules/shared/services/window-error-handler/window-error-handler.factory.test'
import '../modules/shared/services/http-error-registrar/http-error-registrar.factory.test'
import '../modules/shared/services/http-error-registrar/http-status.factory.test'
import '../modules/shared/services/api/api.factory.test'
import '../modules/shared/services/localization/localization.factory.test'
import '../modules/shared/services/crs/crs-converter.factory.test'
import '../modules/shared/filters/filesize.filter.test'
import '../modules/shared/filters/kebabcase.filter.test'

// Import the templates and inject them into angular
const templates = require.context('../modules', true, /\.html$/)
const origInject = angular.mock.inject
angular.mock.inject = callback => {
  origInject($templateCache => {
    templates.keys().forEach(key => {
      // Remove the dot from './dir/template.html' and prepend with
      // 'modules' to get 'modules/dir/template.html'.
      const templateId = `modules${key.substr(1)}`
      $templateCache.put(templateId, templates(key))
    })
  })
  origInject(callback)
}
/* eslint-enable */
