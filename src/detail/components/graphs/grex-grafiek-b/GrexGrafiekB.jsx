import React from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, LabelList } from 'recharts';

import grexCategoriesInOrder from '../grex-graph-categories';
import getGrexCategoryColor from '../grex-graph-category-colors';

import getAllYearsGroups from './grex-grafiek-b.service';

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
      >
        <LabelList dataKey={`${category}.value`} position="right" />
      </Bar>
    ));

    return this.state.data && (
      <div className="grex-grafiek-b">
        <h3 className="grex-grafiek-b__title">
          Gefaseerde begroting per categorie (in miljoenen)
        </h3>
        <div className="grex-grafiek-b__container">
          <ResponsiveContainer>
            <BarChart
              barCategoryGap={50}
              maxBarSize={90}
              minPointSize={10}
              data={this.state.data}
            >
              <XAxis tickLine={false} axisLine={false} dataKey="name" tick={{ fill: '#b9b9b9' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#b9b9b9' }} />
              <Tooltip cursor={{ fill: '#e1e1e1', opacity: 0.5 }} onClick={null} />
              <CartesianGrid vertical={false} fill="#f6f6f6" />
              <Legend iconType="square" />
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
