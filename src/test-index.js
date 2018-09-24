 /* eslint-disable */
// For now simply import everything we need, from here

 // Import the templates and inject them into angular
const templates = require.context('../modules', true, /\.html$/);
const origInject = angular.mock.inject;
angular.mock.inject = (callback) => {
    origInject(($templateCache) => {
        templates.keys().forEach((key) => {
            // Remove the dot from './dir/template.html' and prepend with
            // 'modules' to get 'modules/dir/template.html'.
            const templateId = 'modules' + key.substr(1);
            $templateCache.put(templateId, templates(key));
        });
    });
    origInject(callback);
};

// All third party dependencies
import './vendor';

// All our modules' javascript
import '../modules/atlas/atlas.module';
import '../modules/atlas/atlas.run';
import '../modules/atlas/atlas.version';
import '../modules/atlas/components/dashboard/dashboard-columns.factory';
import '../modules/atlas/components/dashboard/dashboard.component';
import '../modules/atlas/components/dashboard/synchronisation/data-selection.controller';
import '../modules/atlas/components/dashboard/synchronisation/detail.controller';
import '../modules/atlas/components/dashboard/synchronisation/header.controller';
import '../modules/atlas/components/dashboard/synchronisation/map.controller';
import '../modules/atlas/components/dashboard/synchronisation/page.controller';
import '../modules/atlas/components/dashboard/synchronisation/search-results.controller';
import '../modules/atlas/components/dashboard/synchronisation/straatbeeld.controller';
import '../modules/atlas/components/document-title/document-title.directive';
import '../modules/atlas/components/max-width-class/max-width-class.directive';
import '../modules/atlas/components/preview-state/preview-state.directive';
import '../modules/atlas/components/scrollable-content/scrollable-content.directive';
import '../modules/atlas/services/piwik/piwik-config.constant';
import '../modules/atlas/services/piwik/piwik.factory';
import '../modules/atlas/services/piwik/piwik.run';
import '../modules/atlas/services/redux/store.run';
import '../modules/data-selection/data-selection.module';
import '../modules/data-selection/components/active-filters/active-filters.component';
import '../modules/data-selection/components/available-filters/available-filters.component';
import '../modules/data-selection/components/sbi-filter/sbi-filter.component';
import '../modules/data-selection/components/data-selection/data-selection.component';
import '../modules/data-selection/components/formatter/aggregate/aggregate.filter';
import '../modules/data-selection/components/formatter/align-right/align-right.filter';
import '../modules/data-selection/components/formatter/bag-address/bag-address.filter';
import '../modules/data-selection/components/formatter/date/date.filter';
import '../modules/data-selection/components/formatter/formatter.component';
import '../modules/data-selection/components/formatter/hr-bezoekadres/hr-bezoekadres.filter';
import '../modules/data-selection/components/formatter/modification-date/modification-date.filter';
import '../modules/data-selection/components/formatter/nevenadres/nevenadres.filter';
import '../modules/data-selection/components/formatter/nummeraanduiding-type/nummeraanduiding-type.filter';
import '../modules/data-selection/components/formatter/truncate-html-as-text/truncate-html-as-text.filter';
import '../modules/data-selection/components/formatter/verblijfsobject-gevormd/verblijfsobject-gevormd.filter';
import '../modules/data-selection/components/formatter/zip-code/zip-code.filter';
import '../modules/data-selection/components/header/download-button/download-button.component';
import '../modules/data-selection/components/header/header.component';
import '../modules/data-selection/components/header/toggle-view-button/toggle-view-button.component';
import '../modules/data-selection/components/pagination/pagination-link.component';
import '../modules/data-selection/components/pagination/pagination.component';
import '../modules/data-selection/components/views/catalog/catalog.component';
import '../modules/data-selection/components/views/list/list.component';
import '../modules/data-selection/components/views/table/table.component';
import '../modules/data-selection/data-selection-config.constant';
import '../modules/data-selection/services/api/data-selection-api-dcatd.factory';
import '../modules/data-selection/services/api/data-selection-api-data-selection.factory';
import '../modules/data-selection/services/api/data-selection-api.factory';
import '../modules/data-selection/services/api/data-selection-api.run';
import '../modules/data-selection/services/document-title/document-title.factory';
import '../modules/detail/detail.module';
import '../modules/detail/components/api-call/api-call.component';
import '../modules/detail/components/bbga-graphs/bbga-config.constant';
import '../modules/detail/components/bbga-graphs/bbga-data.factory';
import '../modules/detail/components/bbga-graphs/bbga-graphs.directive';
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid-config.constant';
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid.component';
import '../modules/detail/components/current-date/current-date.directive';
import '../modules/detail/components/data-selection-links/data-selection-links.component';
import '../modules/detail/components/date/date.filter';
import '../modules/detail/components/detail/detail.component';
import '../modules/detail/components/detail/follow-link/follow-link.directive';
import '../modules/detail/components/filename/filename.filter';
import '../modules/detail/components/option-label/option-label.filter';
import '../modules/detail/components/glossary/glossary.constant';
import '../modules/detail/components/glossary/header/glossary-header.directive';
import '../modules/detail/components/glossary/meta/glossary-meta.directive';
import '../modules/detail/components/meetbouten-graph/meetbouten-graph.directive';
import '../modules/detail/components/parent-relations/parent-relations.constant';
import '../modules/detail/components/parent-relations/parent-relations.directive';
import '../modules/detail/components/partial-select/partial-compiler.factory';
import '../modules/detail/components/partial-select/partial-select.directive';
import '../modules/detail/components/time-period/time-period.filter';
import '../modules/detail/components/wkpb-link/wkpb-link.component';
import '../modules/detail/components/yes-no/yes-no.filter';
import '../modules/detail/detail.vendor';
import '../modules/detail/services/data-formatter/data-formatter.factory';
import '../modules/detail/services/date-converter/date-converter.factory';
import '../modules/detail/services/date-formatter/date-formatter.factory';
import '../modules/detail/services/document-title/document-title.factory';
import '../modules/detail/services/endpoint-parser/endpoint-parser.factory';
import '../modules/detail/services/geometry/geometry.factory';
import '../modules/header/header.module';
import '../modules/header/components/embed-header/embed-header.component';
import '../modules/header/components/logo/logo.component';
import '../modules/header/components/logout-button/logout-button.component';
import '../modules/header/components/menu/dropdown/menu-dropdown.directive';
import '../modules/header/components/menu/menu.component';
import '../modules/header/components/print-button/print-button.component';
import '../modules/header/components/print-header/print-header.component';
import '../modules/header/components/site-header/site-header.component';
import '../modules/header/components/terugmelden-button/terugmelden-button.component';
import '../modules/header/header-config.constant';
import '../modules/header/header.constant';
import '../modules/page/page.module';
import '../modules/page/components/homepage/catalogus-themes/catalogus-themes-config.constant';
import '../modules/page/components/homepage/catalogus-themes/catalogus-themes.component';
import '../modules/page/components/homepage/homepage-config.constant';
import '../modules/page/components/homepage/homepage.component';
import '../modules/page/components/metadata/metadata.component';
import '../modules/page/components/page-name/page-name.filter';
import '../modules/page/components/page/page.component';
import '../modules/page/components/user-content-widget/user-content-widget.component';
import '../modules/page/page-config.constant';
import '../modules/page/services/document-title/document-title.factory';
import '../modules/page/services/page-name/page-name.factory';
import '../modules/search-results/search-results.module';
import '../modules/search-results/components/search-results/categories/search-results-categories.component';
import '../modules/search-results/components/search-results/header/search-results-header.component';
import '../modules/search-results/components/search-results/list/search-results-list.component';
import '../modules/search-results/components/search-results/search-results.component';
import '../modules/search-results/search-config.constant';
import '../modules/search-results/services/document-title/document-title.factory';
import '../modules/search-results/services/geosearch/geosearch-formatter.factory';
import '../modules/search-results/services/geosearch/geosearch.factory';
import '../modules/search-results/services/search-title/search-title.factory';
import '../modules/search-results/services/search/search-formatter.factory';
import '../modules/search-results/services/search/search.factory';
import '../modules/search-results/services/search/search.run';
import '../modules/shared/shared.module';
import '../modules/shared/components/anchor-link/anchor-link.component';
import '../modules/shared/components/anchor-link/anchor-link.constant';
import '../modules/shared/components/anchor-link/anchor-link.run';
import '../modules/shared/components/api-error/api-error.component';
import '../modules/shared/components/coordinates/coordinates.filter';
import '../modules/shared/components/dcatd-button/dcatd-button.component';
import '../modules/shared/components/expand-collapse/expand-collapse.directive';
import '../modules/shared/components/link-to-page/link-to-page.component';
// import '../modules/shared/components/link/link.component';
import '../modules/shared/components/loading-indicator/loading-indicator.component';
import '../modules/shared/components/long-name-shortener/long-name-config.constant';
import '../modules/shared/components/long-name-shortener/long-name-shortener.filter';
import '../modules/shared/components/message/message.component';
import '../modules/shared/components/panel/panel.component';
import '../modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.component';
import '../modules/shared/components/tab-header/tab-header.component';
import '../modules/shared/components/tab-header/tab-header.constant';
import '../modules/shared/components/tab-header/tab-header.factory';
import '../modules/shared/components/uppercase-first-letter/uppercase-first-letter.filter';
import '../modules/shared/components/video/video.component';
import '../modules/shared/filters/filesize.filter';
import '../modules/shared/services/combined-document-title/combined-document-title.factory';
import '../modules/shared/services/active-overlays/active-overlays.factory';
import '../modules/shared/services/api/api.factory';
import '../modules/shared/services/bounding-box/boundig-box.constant';
import '../modules/shared/services/crs/crs-config.constant';
import '../modules/shared/services/crs/crs-converter.factory';
import '../modules/shared/services/embed/embed.factory';
import '../modules/shared/services/environment/environment.factory';
import '../modules/shared/services/geojson/geojson.factory';
import '../modules/shared/services/google-sheet/google-sheet.constants';
import '../modules/shared/services/google-sheet/google-sheet.factory';
import '../modules/shared/services/window-error-handler/window-error-handler.factory';
import '../modules/shared/services/window-error-handler/window-error-handler.run';
import '../modules/shared/services/http-error-registrar/http-error-registrar.factory';
import '../modules/shared/services/http-error-registrar/http-status.factory';
import '../modules/shared/services/localization/localization.factory';
import '../modules/shared/services/markdown-parser/markdown-parser.factory';
import '../modules/shared/services/redux/actions.constant';
import '../modules/shared/services/redux/store.factory';
import '../modules/shared/services/storage/instance-storage.factory';
import '../modules/shared/services/storage/storage.factory';
import '../modules/shared/services/user-settings/setting.factory';
import '../modules/shared/services/user-settings/user-settings.constant';
import '../modules/shared/services/user-settings/user-settings.factory';
import '../modules/shared/shared-config.factory';
import '../modules/shared/shared.vendor';
import '../modules/straatbeeld/straatbeeld.module';
import '../modules/straatbeeld/components/history/history.directive';
import '../modules/straatbeeld/components/hotspot/hotspot.component';
import '../modules/straatbeeld/components/hotspot/hotspot.factory';
import '../modules/straatbeeld/components/hotspot/touch/hotspot-touch.directive';
import '../modules/straatbeeld/components/status-bar/status-bar.component';
import '../modules/straatbeeld/components/straatbeeld/straatbeeld.directive';
import '../modules/straatbeeld/components/toggle-straatbeeld-fullscreen/toggle-straatbeeld-fullscreen.component';
import '../modules/straatbeeld/services/document-title/document-title.factory';
import '../modules/straatbeeld/services/marzipano/marzipano.factory';
import '../modules/straatbeeld/services/orientation/orientation.factory';
import '../modules/straatbeeld/services/straatbeeld-api/straatbeeld-api.factory';
import '../modules/straatbeeld/straatbeeld-config.constant';
import '../modules/straatbeeld/straatbeeld.vendor';

// The mocks
import 'angular-mocks';
import '../modules/shared/components/button/button.component.mock';
import '../modules/shared/components/link/link.component.mock';

// All our modules' javascript tests
import '../modules/shared/shared.module.test';
import '../modules/search-results/search-results.module.test';
import '../modules/data-selection/data-selection.module.test';
import '../modules/straatbeeld/straatbeeld.module.test';
import '../modules/header/header.module.test';
import '../modules/page/page.module.test';
import '../modules/detail/detail.module.test';
import '../modules/atlas/atlas.module.test';

import '../modules/search-results/components/search-results/search-results.component.test';
import '../modules/search-results/components/search-results/header/search-results-header.component.test';
import '../modules/search-results/components/search-results/categories/search-results-categories.component.test';
import '../modules/search-results/components/search-results/list/search-results-list.component.test';
import '../modules/search-results/services/document-title/document-title.factory.test';
import '../modules/search-results/services/search-title/search-title.factory.test';
import '../modules/search-results/services/search/search-formatter.factory.test';
import '../modules/search-results/services/search/search.factory.test';
import '../modules/search-results/services/geosearch/geosearch-formatter.factory.test';
import '../modules/search-results/services/geosearch/geosearch.factory.test';
import '../modules/data-selection/components/available-filters/available-filters.component.test';
import '../modules/data-selection/components/sbi-filter/sbi-filter.component.test';
import '../modules/data-selection/components/pagination/pagination.component.test';
import '../modules/data-selection/components/pagination/pagination-link.component.test';
import '../modules/data-selection/components/views/table/table.component.test';
import '../modules/data-selection/components/views/list/list.component.test';
import '../modules/data-selection/components/views/catalog/catalog.component.test';
import '../modules/data-selection/components/data-selection/data-selection.component.test';
import '../modules/data-selection/components/active-filters/active-filters.component.test';
import '../modules/data-selection/components/header/download-button/download-button.component.test';
import '../modules/data-selection/components/header/toggle-view-button/toggle-view-button.component.test';
import '../modules/data-selection/components/header/header.component.test';
import '../modules/data-selection/components/formatter/verblijfsobject-gevormd/verblijfsobject-gevormd.filter.test';
import '../modules/data-selection/components/formatter/zip-code/zip-code.filter.test';
import '../modules/data-selection/components/formatter/align-right/align-right.filter.test';
import '../modules/data-selection/components/formatter/truncate-html-as-text/truncate-html-as-text.filter.test';
import '../modules/data-selection/components/formatter/nevenadres/nevenadres.filter.test';
import '../modules/data-selection/components/formatter/nummeraanduiding-type/nummeraanduiding-type.filter.test';
import '../modules/data-selection/components/formatter/bag-address/bag-address.filter.test';
import '../modules/data-selection/components/formatter/date/date.filter.test';
import '../modules/data-selection/components/formatter/modification-date/modification-date.filter.test';
import '../modules/data-selection/components/formatter/formatter.component.test';
import '../modules/data-selection/components/formatter/aggregate/aggregate.filter.test';
import '../modules/data-selection/components/formatter/hr-bezoekadres/hr-bezoekadres.filter.test';
import '../modules/data-selection/services/api/data-selection-api.factory.test';
import '../modules/data-selection/services/api/data-selection-api-dcatd.factory.test';
import '../modules/data-selection/services/api/data-selection-api-data-selection.factory.test';
import '../modules/data-selection/services/document-title/document-title.factory.test';
import '../modules/straatbeeld/components/toggle-straatbeeld-fullscreen/toggle-straatbeeld-fullscreen.component.test';
import '../modules/straatbeeld/components/history/history.directive.test';
import '../modules/straatbeeld/components/straatbeeld/straatbeeld.directive.test';
import '../modules/straatbeeld/components/hotspot/touch/hotspot-touch.directive.test';
import '../modules/straatbeeld/components/hotspot/hotspot.component.test';
import '../modules/straatbeeld/components/hotspot/hotspot.factory.test';
import '../modules/straatbeeld/components/status-bar/status-bar.component.test';
import '../modules/straatbeeld/services/straatbeeld-api/straatbeeld-api.factory.test';
import '../modules/straatbeeld/services/document-title/document-title.factory.test';
import '../modules/straatbeeld/services/marzipano/marzipano.factory.test';
import '../modules/straatbeeld/services/orientation/orientation.factory.test';
import '../modules/header/components/logout-button/logout-button.component.test';
import '../modules/header/components/terugmelden-button/terugmelden-button.component.test';
import '../modules/header/components/menu/dropdown/menu-dropdown.directive.test';
import '../modules/header/components/menu/menu.component.test';
import '../modules/header/components/embed-header/embed-header.component.test';
import '../modules/header/components/site-header/site-header.component.test';
import '../modules/header/components/print-button/print-button.component.test';
import '../modules/header/components/logo/logo.component.test';
import '../modules/page/components/metadata/metadata.component.test';
import '../modules/page/components/homepage/catalogus-themes/catalogus-themes.component.test';
import '../modules/page/components/homepage/homepage.component.test';
import '../modules/page/components/user-content-widget/user-content-widget.component.test';
import '../modules/page/components/page/page.component.test';
import '../modules/page/components/page-name/page-name.filter.test';
import '../modules/page/services/document-title/document-title.factory.test';
import '../modules/page/services/page-name/page-name.factory.test';
import '../modules/detail/components/meetbouten-graph/meetbouten-graph.directive.test';
import '../modules/detail/components/glossary/meta/glossary-meta.directive.test';
import '../modules/detail/components/glossary/header/glossary-header.directive.test';
import '../modules/detail/components/filename/filename.filter.test';
import '../modules/detail/components/option-label/option-label.filter.test';
import '../modules/detail/components/date/date.filter.test';
import '../modules/detail/components/partial-select/partial-select.directive.test';
import '../modules/detail/components/partial-select/partial-compiler.factory.test';
import '../modules/detail/components/current-date/current-date.directive.test';
import '../modules/detail/components/api-call/api-call.component.test';
import '../modules/detail/components/time-period/time-period.filter.test';
import '../modules/detail/components/wkpb-link/wkpb-link.component.test';
import '../modules/detail/components/parent-relations/parent-relations.directive.test';
import '../modules/detail/components/data-selection-links/data-selection-links.component.test';
import '../modules/detail/components/detail/detail.component.test';
import '../modules/detail/components/detail/follow-link/follow-link.directive.test';
import '../modules/detail/components/yes-no/yes-no.filter.test';
import '../modules/detail/components/bbga-graphs/bbga-data.factory.test';
import '../modules/detail/components/bbga-graphs/tevredenheid/bbga-tevredenheid.component.test';
import '../modules/detail/components/bbga-graphs/bbga-graphs.directive.test';
import '../modules/detail/services/data-formatter/data-formatter.factory.test';
import '../modules/detail/services/geometry/geometry.factory.test';
import '../modules/detail/services/endpoint-parser/endpoint-parser.factory.test';
import '../modules/detail/services/document-title/document-title.factory.test';
import '../modules/detail/services/date-converter/date-converter.factory.test';
import '../modules/shared/shared-config.factory.test';
import '../modules/shared/components/api-error/api-error.component.test';
import '../modules/shared/components/link-to-page/link-to-page.component.test';
import '../modules/shared/components/expand-collapse/expand-collapse.directive.test';
import '../modules/shared/components/anchor-link/anchor-link.component.test';
// import '../modules/shared/components/link/link.component.test';
import '../modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.component.test';
import '../modules/shared/components/panel/panel.component.test';
import '../modules/shared/components/video/video.component.test';
import '../modules/shared/components/message/message.component.test';
import '../modules/shared/components/loading-indicator/loading-indicator.component.test';
import '../modules/shared/components/uppercase-first-letter/uppercase-first-letter.filter.test';
import '../modules/shared/components/tab-header/tab-header.constant.test';
import '../modules/shared/components/tab-header/tab-header.factory.test';
import '../modules/shared/components/tab-header/tab-header.component.test';
import '../modules/shared/components/long-name-shortener/long-name-shortener.filter.test';
import '../modules/shared/components/coordinates/coordinates.filter.test';
import '../modules/shared/components/dcatd-button/dcatd-button.component.test';
import '../modules/shared/services/storage/storage.factory.test';
import '../modules/shared/services/markdown-parser/markdown-parser.factory.test';
import '../modules/shared/services/redux/store.factory.test';
import '../modules/shared/services/google-sheet/google-sheet.factory.test';
import '../modules/shared/services/window-error-handler/window-error-handler.factory.test';
import '../modules/shared/services/http-error-registrar/http-error-registrar.factory.test';
import '../modules/shared/services/http-error-registrar/http-status.factory.test';
import '../modules/shared/services/user-settings/user-settings.factory.test';
import '../modules/shared/services/api/api.factory.test';
import '../modules/shared/services/localization/localization.factory.test';
import '../modules/shared/services/embed/embed.factory.test';
import '../modules/shared/services/crs/crs-converter.factory.test';
import '../modules/shared/services/geojson/geojson.factory.test';
import '../modules/shared/services/environment/environment.factory.test';
import '../modules/shared/filters/filesize.filter.test';
import '../modules/shared/services/combined-document-title/combined-document-title.factory.test';
import '../modules/atlas/components/preview-state/preview-state.directive.test';
import '../modules/atlas/components/dashboard/dashboard-columns.factory.test';
import '../modules/atlas/components/dashboard/dashboard.component.test';
import '../modules/atlas/components/dashboard/synchronisation/map.controller.test';
import '../modules/atlas/components/dashboard/synchronisation/search-results.controller.test';
import '../modules/atlas/components/dashboard/synchronisation/page.controller.test';
import '../modules/atlas/components/dashboard/synchronisation/straatbeeld.controller.test';
import '../modules/atlas/components/dashboard/synchronisation/header.controller.test';
import '../modules/atlas/components/dashboard/synchronisation/detail.controller.test';
import '../modules/atlas/components/dashboard/synchronisation/data-selection.controller.test';
import '../modules/atlas/components/document-title/document-title.directive.test';
import '../modules/atlas/components/max-width-class/max-width-class.directive.test';
import '../modules/atlas/components/scrollable-content/scrollable-content.directive.test';
import '../modules/atlas/services/piwik/piwik.factory.test';
