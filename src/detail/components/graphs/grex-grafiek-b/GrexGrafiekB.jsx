import React from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';

import grexCategoriesInOrder from '../grex-graph-categories';
import getGrexCategoryColor from '../grex-graph-category-colors';

const generateValue = (begroot) => ({
  value: begroot / 1000000,
  label: `€${begroot}`
});

const defaultCategories = {
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
  name: `${year.start} - ${year.end}`,
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

const getAllYearsGroups = (data) => {
  const years = getAllYears(data);
  return mergeYears(years);
};

class GrexGrafiekB extends React.Component {
  constructor(props) {
    super(props);
    const data = getAllYearsGroups(props.data);
    this.state = {
      data
    };
  }

  render() {
    const bars = grexCategoriesInOrder.map((category) => (
      <Bar stackId="a" name={category} dataKey={`${category}.value`} fill={getGrexCategoryColor(category)} key={category} />
    ));

    return this.state.data && (
      <div style={{ width: '100%', height: '500px', maxWidth: '700px', marginLeft: '-21px', marginTop: '30px' }}>
        <ResponsiveContainer>
          <BarChart
            barCategoryGap={50}
            maxBarSize={90}
            data={this.state.data}
          >
            <XAxis tickLine={false} axisLine={false} dataKey="name" tick={{ fill: '#b9b9b9' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#b9b9b9' }} />
            <Tooltip cursor={{ fill: '#e1e1e1', opacity: 0.5 }} />
            <CartesianGrid vertical={false} fill="#f6f6f6" />
            <Legend iconType="square" wrapperStyle={{ position: 'relative' }} />
            {
              bars
            }
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

GrexGrafiekB.defaultProps = {
  data: []
};

GrexGrafiekB.propTypes = {
  data: PropTypes.array // eslint-disable-line
};

export default GrexGrafiekB;
