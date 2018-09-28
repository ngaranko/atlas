import React from 'react';
import ContentPage, { PAGE_NAMES, PAGE_TYPES } from './ContentPage';

const Help = () => (
  <ContentPage
    name={PAGE_NAMES.contentOverview}
    type={PAGE_TYPES.help}
    columnSizes={{
      right: 12,
      middle: 12
    }}
  />
);

export default Help;
