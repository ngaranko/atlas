import categoryLabelsByType from './category-labels-by-type';

const defaultModel = (feature) => ({
  categoryLabel: categoryLabelsByType[feature.properties.type].singular,
  label: feature.properties.display,
  parent: feature.properties.parent,
  type: feature.properties.type,
  uri: feature.properties.uri
});

const addresModel = (adress) => ({
  ...defaultModel(adress),
  isNevenadres: !adress.hoofdadres,
  status: {
    code: adress.vbo_status.code,
    description: adress.vbo_status.omschrijving
  }
});

const transformResultByType = (result) => {
  switch (result.properties.type) {
    case 'pand/address':
      return addresModel(result);

    default:
      return defaultModel(result);
  }
};

export default transformResultByType;
