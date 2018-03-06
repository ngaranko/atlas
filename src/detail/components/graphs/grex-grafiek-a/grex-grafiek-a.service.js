import grexCategoriesInOrder from '../grex-graph-categories';

const AMOUNT = 1000000;

const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision); //eslint-disable-line
  return Math.round(number * factor) / factor;
};

const generateGrexAData = (data) => (
  grexCategoriesInOrder.map((category) => {
    const exists = data.find((_item) => _item.categorie === category);
    return {
      name: category,
      value: {
        value: exists ? exists.totaal.begroot / AMOUNT : 0,
        label: exists ?
          `${precisionRound(exists.totaal.begroot / AMOUNT, 1)}`.replace('.', ',') : '0'
      }
    };
  }));

export default generateGrexAData;
