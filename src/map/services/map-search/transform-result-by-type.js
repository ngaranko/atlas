import categoryLabelsByType from './category-labels-by-type';
import { getStatusLabel, getStatusLabelAdress } from './status-labels';

const getDefault = (feature) => ({
  categoryLabel: categoryLabelsByType[feature.properties.type].singular,
  label: feature.properties.display,
  parent: feature.properties.parent,
  type: feature.properties.type,
  uri: feature.properties.uri,
  statusLabel: ''
});

const getAddres = (item) => ({
  ...getDefault(item),
  isNevenadres: !item.hoofdadres,
  status: {
    code: item.vbo_status.code,
    description: item.vbo_status.omschrijving
  },
  statusLabel: getStatusLabelAdress(item)
});

const getVesting = (item) => ({
  ...getDefault(item),
  isNevenadres: !item.hoofdadres,
  statusLabel: getStatusLabelAdress(item)
});

const getOpenbareRuimte = (item) => ({
  ...getDefault(item),
  statusLabel: item.properties.opr_type !== 'Weg' ? item.properties.opr_type : ''
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
      return getAddres(result);

    case 'vestiging':
      return getVesting(result);

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
