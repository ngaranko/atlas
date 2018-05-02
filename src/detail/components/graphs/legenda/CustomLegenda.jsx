import React from 'react';
import PropTypes from 'prop-types';

import './_custom-legenda.scss';

import { CATEGORY_LABELS } from '../../../services/grondexploitatie/grafieken/grondexploitatie-categories';

const CustomLegenda = ({ payload }) => (
  <ul className="custom-legenda">
    {
      payload.length && payload.map((item) => (
        CATEGORY_LABELS[item.value] && (
          <li
            className="custom-legenda__item"
            key={item.value}
          >
            <span
              className="custom-legenda__color"
              style={{ backgroundColor: item.color }}
            />
            <span className="custom-legenda__value">
              { CATEGORY_LABELS[item.value] }
            </span>
          </li>
        )
      ))
    }
  </ul>
);

CustomLegenda.defaultProps = {
  payload: []
};

CustomLegenda.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({}))
};

export default CustomLegenda;
