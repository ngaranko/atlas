(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('googleSheet', googleSheetFactory);

    googleSheetFactory.$inject = ['$q', '$window', '$sce', 'environment', 'api', 'markdownParser', 'GOOGLE_SHEET_CMS'];

    function googleSheetFactory ($q, $window, $sce, environment, api, markdownParser, GOOGLE_SHEET_CMS) {
        const sheets = {};    // local cache of parsed sheets

        return {
            getContents
        };

        function getContents (key, index) {
            const defer = $q.defer(),
                getSheet = GOOGLE_SHEET_CMS.getLocally[environment.NAME] ? getSheetLocally : getSheetOnline;

            if (sheets[key] && sheets[key][index]) {
                defer.resolve(sheets[key][index]);  // resolves to the value or the promise
            } else {
                sheets[key] = sheets[key] || {};
                let result = {
                    feed: {
                        title: ''
                    },
                    entries: []
                };
                getSheet(key, index)
                    .then(contents => result = parseContents(contents))
                    .finally(
                        () => {
                            sheets[key][index] = result;
                            defer.resolve(sheets[key][index]);
                        });
            }

            return defer.promise;
        }

        function getSheetLocally (key, index) {
            return api.getByUrl(`${GOOGLE_SHEET_CMS.localAddress}/${key}.${index}.json`);
        }

        function getSheetOnline (key, index) {
            const defer = $q.defer(),
                callbackName = 'googleScriptCallback_' + key + '_' + index;

            $window[callbackName] = contents => defer.resolve(contents);

            // Create the script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src =
                'https://spreadsheets.google.com/feeds/list/' +
                key +
                '/' +
                index +
                '/public/basic?alt=json-in-script&callback=' +
                callbackName;
            document.head.appendChild(script);

            return defer.promise;
        }

        function parseContents (contents) {
            const isDateValue = /(\d{1,2})-(\d{1,2})-(\d{4})/,
                isDateKey = /datum/i,
                isHref = /^(\[link |<a href=)/;

            // Set feed properties
            const feed = {
                title: contents.feed.title.$t,
                lastUpdated: contents.feed.updated.$t
            };

            // Extract entries
            const entries = contents.feed.entry.map((entry, id) => {
                // Extract the contents
                return entry.content.$t         // attrx: value, attry: value, ....
                    .replace(/^attr/, '')       // x: value, attry: value, ...
                    .split(/, attr/)            // [x:value, y:value, ...]
                    .map(keyValue => keyValue.split(/: ([^]*)/))    // [[x, value], [y, value], ...
                    .reduce((item, [key, value]) => {
                        // item.x = value, item.y = value, ...
                        if (angular.isDefined(value)) {
                            item[key] = {
                                value,
                                html: $sce.trustAsHtml(markdownParser.parse(value)),
                                isHref: Boolean(value.match(isHref)),
                                isDate: Boolean(value.match(isDateValue) && key.match(isDateKey))
                            };
                            if (item[key].isDate) {
                                const match = isDateValue.exec(value);
                                item[key].date = new Date(match[3], match[2] - 1, match[1]);
                            }
                        }
                        return item;
                    }, {
                        id: `item${id}`,
                        extId: entry.title.$t      // start with setting the item.id
                    });
            });

            return {
                feed,
                entries
            };
        }
    }
})();
