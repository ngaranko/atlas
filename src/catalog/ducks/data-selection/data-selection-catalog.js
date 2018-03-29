export const FETCH_CATALOG_FILTERS_SUCCESS = 'FETCH_CATALOG_FILTERS_SUCCESS';
export const FETCH_CATALOG_FILTERS_REQUEST = 'FETCH_CATALOG_FILTERS_REQUEST';

const initialState = {};

function getOptions(propertyType) {
  const options = [];
  for (let i = 0; i < propertyType.enum.length; ++i) {
    const index = propertyType.enum[i].indexOf(':');
    options.push({
      id: index === -1 ? propertyType.enum[i] : propertyType.enum[i].substring(index + 1),
      label: propertyType.enumNames[i]
    });
  }
  return options;
}

function getCatalogFilters(data) {
  const dcatDocProperties = data.components.schemas['dcat-doc'].properties,
    themaProperties = dcatDocProperties['dcat:theme'].items,
    distributionProperties = dcatDocProperties['dcat:distribution'].items.properties,
    ownerProperties = dcatDocProperties['ams:owner'].examples;

  const catalogFilters = {
    groupTypes: getOptions(themaProperties),
    formatTypes: getOptions(distributionProperties['dct:format']),
    serviceTypes: getOptions(distributionProperties['ams:serviceType']),
    resourceTypes: getOptions(distributionProperties['ams:resourceType']),
    ownerTypes: ownerProperties.map((item) => {
      return {
        id: item,
        label: item
      };
    }),
    licenseTypes: getOptions(dcatDocProperties['ams:license'])
  };

  return catalogFilters;
}

export default function DataSelectionCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATALOG_FILTERS_SUCCESS:
      return {
        ...getCatalogFilters(action.payload)
      };

    default:
      return state;
  }
}

export const fetchCatalogFilters = (payload) =>
  ({
    type: FETCH_CATALOG_FILTERS_REQUEST,
    payload
  });


window.reducers = window.reducers || {};
window.reducers.DataSelectionCatalogReducer = DataSelectionCatalogReducer;
