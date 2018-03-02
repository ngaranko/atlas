const GREX_GRAPH_CATEGORY_COLORS = {
  'Sociale huur': '#c3cf40',
  'Middeldure huur': '#f2c740',
  Kantoorruimte: '#3489c0',
  'Sociaal maatschappelijk': '#3bd1ba',
  'Markt Woningen': '#f19e3c',
  Bedrijfsruimte: '#62cbf1',
  Lumpsum: '#B427FF',
  Hotel: '#335c86',
  Commercieel: '#808080'
};

const getGrexCategoryColor = (key) => GREX_GRAPH_CATEGORY_COLORS[key];

export default getGrexCategoryColor;
