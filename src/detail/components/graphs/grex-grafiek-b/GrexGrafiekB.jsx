import React from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

import grexCategoriesInOrder from '../grex-graph-categories';
import getGrexCategoryColor from '../grex-graph-category-colors';

import getAllYearsGroups from './grex-grafiek-b.service';

import CustomLegenda from '../legenda/CustomLegenda';

import './_grex-grafiek-b.scss';

class GrexGrafiekB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getAllYearsGroups(props.data)
    };
  }

  render() {
    const bars = grexCategoriesInOrder.map((category) => (
      <Bar
        dataKey={`${category}.value`}
        fill={getGrexCategoryColor(category)}
        key={category}
        name={category}
        stackId="a"
      />
    ));

    return this.state.data && (
      <div className="grex-grafiek-b">
        <h3 className="grex-grafiek-b__title">
          Gefaseerde begroting per categorie (in miljoenen)
        </h3>
        <div className="grex-grafiek-b__container">
          <ResponsiveContainer>
            <BarChart
              barCategoryGap={20}
              maxBarSize={90}
              minPointSize={10}
              layout="vertical"
              data={this.state.data}
            >
              <XAxis
                tickLine={false}
                axisLine={false}
                type="number"
                tick={{ fill: '#b9b9b9' }}
                domain={['auto', (dataMax) => Math.round(dataMax * 1.1)]}
              />
              <YAxis
                width={180}
                tickLine={false}
                axisLine={false}
                hide={false}
                dataKey="name"
                type="category"
                tick={{ fill: '#b9b9b9' }}
              />
              <CartesianGrid
                horizontal={false}
                fill="#f6f6f6"
              />
              <Legend
                wrapperStyle={{ bottom: '-20px' }}
                content={<CustomLegenda />}
              />
              {
                bars
              }
            </BarChart>
          </ResponsiveContainer>
        </div>
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
