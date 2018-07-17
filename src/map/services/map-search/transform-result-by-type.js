import categoryLabelsByType from './category-labels-by-type';
import { getStatusLabel, getStatusLabelAddress } from './status-labels';

const getDefault = (feature) => ({
  categoryLabel: categoryLabelsByType[feature.properties.type].singular,
  label: feature.properties.display,
  parent: feature.properties.parent,
  type: feature.properties.type,
  uri: feature.properties.uri,
  statusLabel: ''
});

const getAddress = (item) => ({
  ...getDefault(item),
  isNevenadres: !item.hoofdadres,
  status: {
    code: item.vbo_status.code,
    description: item.vbo_status.omschrijving
  },
  statusLabel: getStatusLabelAddress(item)
});

const getOpenbareRuimte = (item) => ({
  ...getDefault(item),
  statusLabel: item.properties.opr_type !== 'Weg' ? item.properties.opr_type : ''
});

const getPlaats = (item, type) => ({
  ...getDefault(item),
  statusLabel: type
});

const getGebied = (item) => ({
  ...getDefault(item),
  statusLabel: getStatusLabel(item.properties.type)
});

const getBom = (item) => ({
  ...getDefault(item),
  statusLabel: getStatusLabel(item.properties.type)
});

const transformResultByType = (result) => {
  switch (result.properties.type) {
    case 'pand/address':
      return getAddress(result);

    case 'bag/ligplaats':
      return getPlaats(result, 'ligplaats');

    case 'bag/standplaats':
      return getPlaats(result, 'standplaats');

    case 'bag/openbareruimte':
      return getOpenbareRuimte(result);

    case 'gebieden/grootstedelijkgebied':
    case 'gebieden/unesco':
    case 'gebieden/stadsdeel':
    case 'gebieden/gebiedsgerichtwerken':
    case 'gebieden/buurtcombinatie':
    case 'gebieden/buurt':
    case 'gebieden/bouwblok':
      return getGebied(result);

    case 'bommenkaart/bominslag':
    case 'bommenkaart/verdachtgebied':
    case 'bommenkaart/gevrijwaardgebied':
    case 'bommenkaart/uitgevoerdonderzoek':
      return getBom(result);

    default:
      return getDefault(result);
  }
};

export default transformResultByType;
