import React from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList, ResponsiveContainer, Label } from 'recharts';

let data = [
    { name: 'Totaal', uv: 4000, pv: 2400, amt: 2400 }
];

const generateNormalArray = (data) => {
  return Object.keys(data).map((key) => {
    return { categorie: key, jaren: data[key], totaal: data[key][0] };
  });
};
class GrexGrafiekA extends React.Component {
  constructor(props) {
    super(props);
    const test = props.data;

    let tesxt = {
      name: 'Totaal'
    };

    test.forEach((item) => {
      tesxt[item.categorie] = Number(item.totaal.begroot);
    });
    this.state = {
      data: [tesxt],
      test: test
    }
    debugger;
  }

  render() {
    const bars = this.state.test.map((item) => (
      <Bar dataKey={item.categorie} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} key={item.categorie}>
        <LabelList value={`€${item.categorie}`} position="center" />
        <LabelList dataKey="name" position="top" />
      </Bar>
    ));


    return this.state.data && (
      <div style={{ width: '100%', height: '340px', maxWidth: '700px', marginLeft: '-21px', marginTop: '30px' }}>
        <ResponsiveContainer>
          <BarChart data={this.state.data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            {
              bars
            }
          </BarChart>
        </ResponsiveContainer>
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
