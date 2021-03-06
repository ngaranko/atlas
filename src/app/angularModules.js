import '../../modules/atlas/atlas.module'
import '../../modules/atlas/atlas.run'
import '../../modules/atlas/services/redux/store.run'
import '../../modules/data-selection/data-selection.module'
import '../../modules/data-selection/components/available-filters/available-filters.component'
import '../../modules/data-selection/components/sbi-filter/sbi-filter.component'
import '../../modules/data-selection/components/header/download-button/download-button.component'
import '../../modules/data-selection/components/header/header.component'
import '../../modules/data-selection/components/header/toggle-view-button/toggle-view-button.component'
import '../../modules/data-selection/components/pagination/pagination-link.component'
import '../../modules/data-selection/components/pagination/pagination.component'
import '../../modules/data-selection/services/document-title/document-title.factory'
import '../../modules/detail/detail.module'
import '../../modules/detail/components/api-call/api-call.component'
import '../../modules/detail/components/bbga-graphs/bbga-config.constant'
import '../../modules/detail/components/bbga-graphs/bbga-data.factory'
import '../../modules/detail/components/bbga-graphs/bbga-graphs.directive'
import '../../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid-config.constant'
import '../../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid.component'
import '../../modules/detail/components/current-date/current-date.directive'
import '../../modules/detail/components/data-selection-links/data-selection-links.component'
import '../../modules/detail/components/date/date.filter'
import '../../modules/detail/components/detail/detail.component'
import '../../modules/detail/components/filename/filename.filter'
import '../../modules/detail/components/option-label/option-label.filter'
import '../../modules/detail/components/glossary/glossary.constant'
import '../../modules/detail/components/glossary/header/glossary-header.directive'
import '../../modules/detail/components/glossary/meta/glossary-meta.directive'
import '../../modules/detail/components/meetbouten-graph/meetbouten-graph.directive'
import '../../modules/detail/components/parent-relations/parent-relations.constant'
import '../../modules/detail/components/parent-relations/parent-relations.directive'
import '../../modules/detail/components/partial-select/partial-compiler.factory'
import '../../modules/detail/components/partial-select/partial-select.directive'
import '../../modules/detail/components/time-period/time-period.filter'
import '../../modules/detail/components/wkpb-link/wkpb-link.component'
import '../../modules/detail/components/wkpb-download-link/wkpb-download-link.component'
import '../../modules/detail/components/yes-no/yes-no.filter'

import '../../modules/detail/detail.vendor'
import '../../modules/detail/services/date-converter/date-converter.factory'
import '../../modules/detail/services/date-formatter/date-formatter.factory'
import '../../modules/detail/services/geometry/geometry.factory'
import '../../modules/shared/shared.module'
import '../../modules/shared/components/coordinates/coordinates.filter'
import '../../modules/shared/components/dcatd-button/dcatd-button.component'
import '../../modules/shared/components/expand-collapse/expand-collapse.directive'
import '../../modules/shared/components/link/link.component'
import '../../modules/shared/components/login-link/login-link.component'
import '../../modules/shared/components/redux-link/redux-link.component'
import '../../modules/shared/components/loading-indicator/loading-indicator.component'
import '../../modules/shared/components/message/message.component'
import '../../modules/shared/components/panel/panel.component'
import '../../modules/shared/components/panorama-thumbnail/panorama-thumbnail.component'
import '../../modules/shared/components/uppercase-first-letter/uppercase-first-letter.filter'
import '../../modules/shared/filters/detail-endpoint-action.filter'
import '../../modules/shared/filters/construction-files-endpoint-action.filter'
import '../../modules/shared/filters/filesize.filter'
import '../../modules/shared/filters/kebabcase.filter'
import '../../modules/shared/services/api/api.factory'
import '../../modules/shared/services/crs/crs-config.constant'
import '../../modules/shared/services/crs/crs-converter.factory'
import '../../modules/shared/services/window-error-handler/window-error-handler.factory'
import '../../modules/shared/services/window-error-handler/window-error-handler.run'
import '../../modules/shared/services/http-error-registrar/http-error-registrar.factory'
import '../../modules/shared/services/http-error-registrar/http-status.factory'
import '../../modules/shared/services/localization/localization.factory'
import '../../modules/shared/services/redux/store.factory'
import '../../modules/shared/services/storage/instance-storage.factory'
import '../../modules/shared/services/storage/storage.factory'
import '../../modules/shared/shared.vendor'
