export const generateValue = (begroot) => ({
  value: begroot / 1000000,
  label: `€${begroot}`
});

export const defaultCategories = {
  'Sociale huur': generateValue(0),
  'Middeldure huur': generateValue(0),
  'Markt Woningen': generateValue(0),
  Kantoorruimte: generateValue(0),
  Bedrijfsruimte: generateValue(0),
  Hotel: generateValue(0),
  Commercieel: generateValue(0),
  'Sociaal maatschappelijk': generateValue(0),
  Lumpsum: generateValue(0)
};

const getAllYears = (data) => [].concat(...data.map((item) => item.jaren.map((year) => ({
  name: year.start !== year.end ? `${year.start} - ${year.end}` : year.start,
  [item.categorie]: generateValue(year.begroot)
}))));

const mergeYears = (data) => data.reduce((acc, current) => {
  const index = acc.findIndex((item) => item.name === current.name);
  if (index > -1) {
    return [
      ...acc.slice(0, index),
      { ...acc[index], ...current },
      ...acc.slice(index + 1, acc.length)
    ];
  }
  return [
    ...acc,
    { ...defaultCategories, ...current }
  ];
}, []);

const sortYears = (data) => (data.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}));

const getAllYearsGroups = (data) => {
  const years = getAllYears(data);
  const merged = mergeYears(years);
  return sortYears(merged);
};

export default getAllYearsGroups;
