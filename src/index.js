// For now simply import everything we need, from here

// All third party dependencies
import './vendor';

// All our sass
import '../modules/shared/shared.scss';
import '../modules/atlas/atlas.scss';
import '../modules/data-selection/data-selection.scss';
import '../modules/detail/detail.scss';
import '../modules/header/header.scss';
import '../modules/layer-selection/layer-selection.scss';
import '../modules/map/map.scss';
import '../modules/page/page.scss';
import '../modules/search-results/search-results.scss';
import '../modules/straatbeeld/straatbeeld.scss';

// All our modules' javascript
import '../modules/atlas/atlas.module.js';
import '../modules/atlas/atlas.version.js';
import '../modules/atlas/components/dashboard/dashboard-columns.factory.js';
import '../modules/atlas/components/dashboard/dashboard.component.js';
import '../modules/atlas/components/dashboard/synchronisation/data-selection.controller.js';
import '../modules/atlas/components/dashboard/synchronisation/detail.controller.js';
import '../modules/atlas/components/dashboard/synchronisation/header.controller.js';
import '../modules/atlas/components/dashboard/synchronisation/layer-selection.controller.js';
import '../modules/atlas/components/dashboard/synchronisation/map.controller.js';
import '../modules/atlas/components/dashboard/synchronisation/page.controller.js';
import '../modules/atlas/components/dashboard/synchronisation/search-results.controller.js';
import '../modules/atlas/components/dashboard/synchronisation/straatbeeld.controller.js';
import '../modules/atlas/components/document-title/document-title.directive.js';
import '../modules/atlas/components/max-width-class/max-width-class.directive.js';
import '../modules/atlas/components/preview-state/preview-state.directive.js';
import '../modules/atlas/components/scrollable-content/scrollable-content.directive.js';
import '../modules/atlas/services/freeze/freeze.factory.js';
import '../modules/atlas/services/piwik/piwik-config.constant.js';
import '../modules/atlas/services/piwik/piwik.factory.js';
import '../modules/atlas/services/piwik/piwik.run.js';
import '../modules/atlas/services/redux/middleware/context-middleware.factory.js';
import '../modules/atlas/services/redux/middleware/state-to-url-middleware.factory.js';
import '../modules/atlas/services/redux/reducer.factory.js';
import '../modules/atlas/services/redux/reducers/data-selection-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/embed-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/home-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/layer-selection-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/map-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/page-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/print-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/search-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/straatbeeld-reducers.factory.js';
import '../modules/atlas/services/redux/reducers/url-reducers.factory.js';
import '../modules/atlas/services/redux/store.run.js';
import '../modules/atlas/services/routing/state-to-url.factory.js';
import '../modules/atlas/services/routing/state-url-conversion.factory.js';
import '../modules/atlas/services/routing/state-url-converter.factory.js';
import '../modules/atlas/services/routing/url-to-state.factory.js';
import '../modules/atlas/services/routing/url-to-state.run.js';
import '../modules/data-selection/data-selection.module.js';
import '../modules/data-selection/components/active-filters/active-filters.component.js';
import '../modules/data-selection/components/available-filters/available-filters.component.js';
import '../modules/data-selection/components/data-selection/data-selection.component.js';
import '../modules/data-selection/components/formatter/aggregate/aggregate.filter.js';
import '../modules/data-selection/components/formatter/align-right/align-right.filter.js';
import '../modules/data-selection/components/formatter/bag-address/bag-address.filter.js';
import '../modules/data-selection/components/formatter/formatter.component.js';
import '../modules/data-selection/components/formatter/hr-bezoekadres/hr-bezoekadres.filter.js';
import '../modules/data-selection/components/formatter/modification-date/modification-date.filter.js';
import '../modules/data-selection/components/formatter/nevenadres/nevenadres.filter.js';
import '../modules/data-selection/components/formatter/nummeraanduiding-type/nummeraanduiding-type.filter.js';
import '../modules/data-selection/components/formatter/truncate-html-as-text/truncate-html-as-text.filter.js';
import '../modules/data-selection/components/formatter/verblijfsobject-gevormd/verblijfsobject-gevormd.filter.js';
import '../modules/data-selection/components/formatter/zip-code/zip-code.filter.js';
import '../modules/data-selection/components/header/download-button/download-button.component.js';
import '../modules/data-selection/components/header/header.component.js';
import '../modules/data-selection/components/header/toggle-view-button/toggle-view-button.component.js';
import '../modules/data-selection/components/pagination/pagination-link.component.js';
import '../modules/data-selection/components/pagination/pagination.component.js';
import '../modules/data-selection/components/views/cards/cards.component.js';
import '../modules/data-selection/components/views/list/list.component.js';
import '../modules/data-selection/components/views/table/table.component.js';
import '../modules/data-selection/data-selection-config.constant.js';
import '../modules/data-selection/services/api/data-selection-api-ckan.factory.js';
import '../modules/data-selection/services/api/data-selection-api-data-selection.factory.js';
import '../modules/data-selection/services/api/data-selection-api.factory.js';
import '../modules/data-selection/services/api/data-selection-api.run.js';
import '../modules/data-selection/services/document-title/document-title.factory.js';
import '../modules/detail/detail.module.js';
import '../modules/detail/components/api-call/api-call.component.js';
import '../modules/detail/components/bbga-graphs/bbga-config.constant.js';
import '../modules/detail/components/bbga-graphs/bbga-data.factory.js';
import '../modules/detail/components/bbga-graphs/bbga-graphs.directive.js';
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid-config.constant.js';
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid.component.js';
import '../modules/detail/components/current-date/current-date.directive.js';
import '../modules/detail/components/data-selection-links/data-selection-links.component.js';
import '../modules/detail/components/date/date.filter.js';
import '../modules/detail/components/detail/detail.component.js';
import '../modules/detail/components/detail/follow-link/follow-link.directive.js';
import '../modules/detail/components/filename/filename.filter.js';
import '../modules/detail/components/glossary/glossary.constant.js';
import '../modules/detail/components/glossary/header/glossary-header.directive.js';
import '../modules/detail/components/glossary/meta/glossary-meta.directive.js';
import '../modules/detail/components/meetbouten-graph/meetbouten-graph.directive.js';
import '../modules/detail/components/nummeraanduiding-header/nummeraanduiding-header.component.js';
import '../modules/detail/components/parent-relations/parent-relations.constant.js';
import '../modules/detail/components/parent-relations/parent-relations.directive.js';
import '../modules/detail/components/partial-select/partial-compiler.factory.js';
import '../modules/detail/components/partial-select/partial-select.directive.js';
import '../modules/detail/components/wkpb-link/wkpb-link.component.js';
import '../modules/detail/components/yes-no/yes-no.filter.js';
import '../modules/detail/detail.vendor.js';
import '../modules/detail/services/data-formatter/data-formatter.factory.js';
import '../modules/detail/services/date-converter/date-converter.factory.js';
import '../modules/detail/services/document-title/document-title.factory.js';
import '../modules/detail/services/endpoint-parser/endpoint-parser.factory.js';
import '../modules/detail/services/geometry/geometry.factory.js';
import '../modules/header/header.module.js';
import '../modules/header/components/embed-header/embed-header.component.js';
import '../modules/header/components/logo/logo.component.js';
import '../modules/header/components/logout-button/logout-button.component.js';
import '../modules/header/components/menu/dropdown/menu-dropdown.directive.js';
import '../modules/header/components/menu/menu.component.js';
import '../modules/header/components/print-button/print-button.component.js';
import '../modules/header/components/print-header/print-header.component.js';
import '../modules/header/components/search/autocomplete/autocomplete-data.factory.js';
import '../modules/header/components/search/search.directive.js';
import '../modules/header/components/search/suggestion-highlight/suggestion-highlight.filter.js';
import '../modules/header/components/site-header/site-header.component.js';
import '../modules/header/components/terugmelden-button/terugmelden-button.component.js';
import '../modules/header/header-config.constant.js';
import '../modules/header/header.constant.js';
import '../modules/layer-selection/layer-selection.module.js';
import '../modules/layer-selection/components/layer-selection/layer-selection.component.js';
import '../modules/layer-selection/services/document-title/document-title.factory.js';
import '../modules/map/map.module.js';
import '../modules/map/components/active-overlays/active-overlays-item.component.js';
import '../modules/map/components/active-overlays/active-overlays.component.js';
import '../modules/map/components/draw-tool/draw-tool.component.js';
import '../modules/map/components/draw-tool/points-available/points-available.component.js';
import '../modules/map/components/draw-tool/shape-summary/shape-summary.component.js';
import '../modules/map/components/draw-tool/toggle-drawing-tool/toggle-drawing-tool.component.js';
import '../modules/map/components/embed-button/embed-button.component.js';
import '../modules/map/components/map/map.directive.js';
import '../modules/map/components/toggle-active-overlays/toggle-active-overlays.component.js';
import '../modules/map/components/toggle-fullscreen/toggle-fullscreen.component.js';
import '../modules/map/components/toggle-layer-selection/toggle-layer-selection.component.js';
import '../modules/map/map-config.factory.js';
import '../modules/map/map.vendor.js';
import '../modules/map/services/document-title/document-title.factory.js';
import '../modules/map/services/draw-tool/draw-tool-config.constant.js';
import '../modules/map/services/draw-tool/draw-tool.factory.js';
import '../modules/map/services/highlight/clustered-markers-config.factory.js';
import '../modules/map/services/highlight/highlight.factory.js';
import '../modules/map/services/highlight/icon-config.constant.js';
import '../modules/map/services/layers.factory.js';
import '../modules/map/services/leaflet-draw/leaflet-draw-translations.factory.js';
import '../modules/map/services/leaflet-draw/leaflet-draw-translations.run.js';
import '../modules/map/services/on-map-click.factory.js';
import '../modules/map/services/panning.factory.js';
import '../modules/map/services/suppress/suppress.factory.js';
import '../modules/map/services/zoom.factory.js';
import '../modules/page/page.module.js';
import '../modules/page/components/homepage/catalogus-themes/catalogus-themes-config.constant.js';
import '../modules/page/components/homepage/catalogus-themes/catalogus-themes.component.js';
import '../modules/page/components/homepage/homepage-config.constant.js';
import '../modules/page/components/homepage/homepage.component.js';
import '../modules/page/components/metadata/metadata.component.js';
import '../modules/page/components/page-name/page-name.filter.js';
import '../modules/page/components/page/page.component.js';
import '../modules/page/components/user-content-widget/user-content-widget.component.js';
import '../modules/page/page-config.constant.js';
import '../modules/page/services/document-title/document-title.factory.js';
import '../modules/page/services/page-name/page-name.factory.js';
import '../modules/search-results/search-results.module.js';
import '../modules/search-results/components/search-results/categories/search-results-categories.component.js';
import '../modules/search-results/components/search-results/header/search-results-header.component.js';
import '../modules/search-results/components/search-results/list/search-results-list.component.js';
import '../modules/search-results/components/search-results/search-results.component.js';
import '../modules/search-results/search-config.constant.js';
import '../modules/search-results/services/document-title/document-title.factory.js';
import '../modules/search-results/services/geosearch/geosearch-formatter.factory.js';
import '../modules/search-results/services/geosearch/geosearch.factory.js';
import '../modules/search-results/services/search-title/search-title.factory.js';
import '../modules/search-results/services/search/search-formatter.factory.js';
import '../modules/search-results/services/search/search.factory.js';
import '../modules/search-results/services/search/search.run.js';
import '../modules/shared/shared.module.js';
import '../modules/shared/components/anchor-link/anchor-link.component.js';
import '../modules/shared/components/anchor-link/anchor-link.constant.js';
import '../modules/shared/components/anchor-link/anchor-link.run.js';
import '../modules/shared/components/api-error/api-error.component.js';
import '../modules/shared/components/coordinates/coordinates.filter.js';
import '../modules/shared/components/expand-collapse/expand-collapse.directive.js';
import '../modules/shared/components/link-to-page/link-to-page.component.js';
import '../modules/shared/components/link/link.component.js';
import '../modules/shared/components/loading-indicator/loading-indicator.component.js';
import '../modules/shared/components/long-name-shortener/long-name-config.constant.js';
import '../modules/shared/components/long-name-shortener/long-name-shortener.filter.js';
import '../modules/shared/components/message/message.component.js';
import '../modules/shared/components/panel/panel.component.js';
import '../modules/shared/components/straatbeeld-thumbnail/dp-alt.component.js';
import '../modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.component.js';
import '../modules/shared/components/tab-header/tab-header.component.js';
import '../modules/shared/components/tab-header/tab-header.constant.js';
import '../modules/shared/components/tab-header/tab-header.factory.js';
import '../modules/shared/components/uppercase-first-letter/uppercase-first-letter.filter.js';
import '../modules/shared/components/video/video.component.js';
import '../modules/shared/filters/filesize.filter.js';
import '../modules/shared/services/active-overlays/active-overlays.factory.js';
import '../modules/shared/services/angle-conversion/angle-conversion.factory.js';
import '../modules/shared/services/api/api.factory.js';
import '../modules/shared/services/authenticator/authenticator.factory.js';
import '../modules/shared/services/base-coder/base-coder.factory.js';
import '../modules/shared/services/bounding-box/boundig-box.constant.js';
import '../modules/shared/services/crs/crs-config.constant.js';
import '../modules/shared/services/crs/crs-converter.factory.js';
import '../modules/shared/services/crs/crs.factory.js';
import '../modules/shared/services/embed/embed.factory.js';
import '../modules/shared/services/environment/environment.factory.js';
import '../modules/shared/services/geojson/geojson.factory.js';
import '../modules/shared/services/google-sheet/google-sheet.constants.js';
import '../modules/shared/services/google-sheet/google-sheet.factory.js';
import '../modules/shared/services/http-error-registrar/http-error-registrar.factory.js';
import '../modules/shared/services/http-error-registrar/http-status.factory.js';
import '../modules/shared/services/layers/base-layers.constant.js';
import '../modules/shared/services/layers/overlays.constant.js';
import '../modules/shared/services/layers/overlays.factory.js';
import '../modules/shared/services/localization/localization.factory.js';
import '../modules/shared/services/markdown-parser/markdown-parser.factory.js';
import '../modules/shared/services/nearest-detail/nearest-detail.factory.js';
import '../modules/shared/services/redux/actions.constant.js';
import '../modules/shared/services/redux/application-state.factory.js';
import '../modules/shared/services/redux/store.factory.js';
import '../modules/shared/services/storage/instance-storage.factory.js';
import '../modules/shared/services/storage/storage.factory.js';
import '../modules/shared/services/uri-stripper/uri-stripper.factory.js';
import '../modules/shared/services/user-settings/setting.factory.js';
import '../modules/shared/services/user-settings/user-settings.constant.js';
import '../modules/shared/services/user-settings/user-settings.factory.js';
import '../modules/shared/services/user/user.factory.js';
import '../modules/shared/shared-config.factory.js';
import '../modules/shared/shared.vendor.js';
import '../modules/straatbeeld/straatbeeld.module.js';
import '../modules/straatbeeld/components/history/history.directive.js';
import '../modules/straatbeeld/components/hotspot/hotspot.component.js';
import '../modules/straatbeeld/components/hotspot/hotspot.factory.js';
import '../modules/straatbeeld/components/hotspot/touch/hotspot-touch.directive.js';
import '../modules/straatbeeld/components/status-bar/status-bar.component.js';
import '../modules/straatbeeld/components/straatbeeld/straatbeeld.directive.js';
import '../modules/straatbeeld/components/toggle-straatbeeld-fullscreen/toggle-straatbeeld-fullscreen.component.js';
import '../modules/straatbeeld/services/document-title/document-title.factory.js';
import '../modules/straatbeeld/services/marzipano/marzipano.factory.js';
import '../modules/straatbeeld/services/orientation/orientation.factory.js';
import '../modules/straatbeeld/services/straatbeeld-api/straatbeeld-api.factory.js';
import '../modules/straatbeeld/straatbeeld-config.constant.js';
import '../modules/straatbeeld/straatbeeld.vendor.js';
