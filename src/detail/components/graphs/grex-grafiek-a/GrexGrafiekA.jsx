import React from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';

import getGrexCategoryColor from '../grex-graph-category-colors';

import generateGrexAData from './grex-grafiek-a.service';

import './_grex-grafiek-a.scss';

class GrexGrafiekA extends React.Component {
  constructor(props) {
    super(props);
    const data = generateGrexAData(props.data);
    this.state = {
      data
    };
  }

  render() {
    return this.state.data && (
      <div className="grex-grafiek-a">
        <h3 className="grex-grafiek-a__title">
          Totale begroting per categorie (in miljoenen)
        </h3>
        <div className="grex-grafiek-a__container">
          <ResponsiveContainer>
            <BarChart
              maxBarSize={100}
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
                width={170}
                tickLine={false}
                axisLine={false}
                hide={false}
                dataKey="name"
                type="category"
                tick={{ fill: '#b9b9b9' }}
              />
              <Tooltip cursor={{ fill: '#e1e1e1', opacity: 0.5 }} />
              <CartesianGrid
                horizontal={false}
                fill="#f6f6f6"
              />
              <Bar
                name="category"
                dataKey="value.value"
              >
                {
                  this.state.data.map((entry) => (
                    <Cell fill={getGrexCategoryColor(entry.name)} key={entry.name} />
                  ))
                }
                <LabelList
                  dataKey="value.label"
                  position="right"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

GrexGrafiekA.defaultProps = {
  data: []
};

GrexGrafiekA.propTypes = {
  data: PropTypes.array // eslint-disable-line
};

export default GrexGrafiekA;
