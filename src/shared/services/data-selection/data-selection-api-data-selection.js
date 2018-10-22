import sharedConfig from '../shared-config/shared-config';
import { getByUrl } from '../api/api';

const isDefined = (value) => typeof value !== 'undefined';

const formatFilters = (rawData) => (
  Object.keys(rawData).reduce((filters, key) => {
    filters[key] = {
      numberOfOptions: rawData[key].doc_count,
      options: rawData[key].buckets.map((option) => ({
        id: option.key,
        label: option.key,
        count: option.doc_count
      }))
    };
    return filters;
  }, {})
);

const getDetailEndpoint = (config, rawDataRow) => (
  (rawDataRow.dataset === 'mac') ?
    `${sharedConfig.API_ROOT}handelsregister/maatschappelijkeactiviteit/${rawDataRow.kvk_nummer}/` :
    `${sharedConfig.API_ROOT}${config.ENDPOINT_DETAIL}${rawDataRow[config.PRIMARY_KEY]}/`
);

const formatData = (config, rawData) => (
  rawData.map((rawDataRow) => {
    rawDataRow._links = {
      self: {
        href: getDetailEndpoint(config, rawDataRow)
      }
    };
    return rawDataRow;
  })
);

export function getMarkers(config, activeFilters) {
  return getByUrl(sharedConfig.API_ROOT + config.ENDPOINT_MARKERS, activeFilters)
    .then((data) => ({
      clusterMarkers: data.object_list
                          .map((object) => object._source.centroid)
                          .filter((x) => x)
                          .map(([lon, lat]) => [lat, lon])
    }));
}

export function query(config, view, activeFilters, page, search, geometryFilter) {
  let searchPage = page;

  const shape = (isDefined(geometryFilter)) ? geometryFilter : [];

  // Making sure to not request pages higher then max allowed.
  // If that is the case requesting for page 1, to obtain filters.
  // In the response the data will be dumped.
  if (page > config.MAX_AVAILABLE_PAGES) {
    searchPage = 1;
  }

  const searchParams = {
    page: searchPage,
    dataset: 'ves',
    shape: JSON.stringify(shape.map(([lat, lng]) => [lng, lat])),
    ...activeFilters
  };

  const uri = config.ENDPOINT_PREVIEW[view] || config.ENDPOINT_PREVIEW;

  return getByUrl(sharedConfig.API_ROOT + uri, searchParams)
    .then((data) => {
      if (searchPage !== page) {
        // Requested page was out of api reach, dumping data
        // and saving only the filters
        data.object_list = [];
      }

      return {
        numberOfPages: data.page_count,
        numberOfRecords: data.object_count,
        filters: formatFilters(data.aggs_list),
        data: formatData(config, data.object_list)
      };
    });
}

export default {
  query,
  getMarkers
};
