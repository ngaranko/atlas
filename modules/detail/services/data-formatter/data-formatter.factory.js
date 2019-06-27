;(function() {
  angular.module('dpDetail').factory('dataFormatter', dataFormatterFactory)

  function dataFormatterFactory() {
    return {
      formatData,
    }

    function formatData(data, subject, catalogFilters) {
      switch (subject) {
        case 'datasets': // dcat data
          return formatCatalogData(data, catalogFilters)
        default:
          return data
      }
    }

    function formatCatalogData(data, catalogFilters) {
      const { resourceTypes } = catalogFilters
      if (!resourceTypes || !data) {
        return {}
      }
      const resources = data['dcat:distribution']

      const formattedData = {
        _display: data['dct:title'],
        resources: resourceTypes
          .map(item => {
            return {
              type: item.id,
              rows: resources.filter(
                row => row['ams:resourceType'] === item.id,
              ),
            }
          })
          .filter(resource => resource.rows.length),
        editDatasetId: data['dct:identifier'],
      }

      return Object.keys(data)
        .filter(key => key !== 'dcat:distribution')
        .reduce(
          (result, key) => ({
            ...result,
            [key]: data[key],
          }),
          formattedData,
        )
    }
  }
})()
