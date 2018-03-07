import React from 'react';
import PropTypes from 'prop-types';

import './_custom-legenda.scss';

const CustomLegenda = ({ payload }) => (
  <ul className="custom-legenda">
    {
      payload.length && payload.map((item) => (
        <li
          className="custom-legenda__item"
          key={item.value}
        >
          <span
            className="custom-legenda__color"
            style={{ backgroundColor: item.color }}
          />
          <span className="custom-legenda__value">
            { item.value }
          </span>
        </li>
      ))
    }
  </ul>
);

CustomLegenda.defaultProps = {
  payload: []
};

CustomLegenda.propTypes = {
  payload: PropTypes.array, // eslint-disable-line
};

export default CustomLegenda;
