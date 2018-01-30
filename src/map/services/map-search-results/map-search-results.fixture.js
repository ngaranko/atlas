export const basicDataModel = [
  {
    uri: 'https://acc.api.data.amsterdam.nl/',
    label: 'Warmoesstraat 178',
    categoryLabel: 'Adress',
    type: 'pand/address',
    parent: 'bag/pand'
  },
  {
    uri: 'https://acc.api.data.amsterdam.nl/',
    label: 'ASD04 F 06417 G 0000',
    categoryLabel: 'Kadastraal object',
    type: 'kadaster/kadastraal_object'
  },
  {
    uri: 'https://acc.api.data.amsterdam.nl/',
    label: '0363100012168052',
    categoryLabel: 'Pand',
    type: 'bag/pand'
  }
];

export const expectedDataModel = [
  {
    amountOfResults: 1,
    categoryLabel: 'Pand',
    results: [
      {
        categoryLabel: 'Pand',
        label: '0363100012168052',
        type: 'bag/pand',
        uri: 'https://acc.api.data.amsterdam.nl/'
      }
    ],
    subCategories: [
      {
        amountOfResults: 1,
        categoryLabel: 'Adress',
        results: [
          {
            categoryLabel: 'Adress',
            label: 'Warmoesstraat 178',
            parent: 'bag/pand',
            type: 'pand/address',
            uri: 'https://acc.api.data.amsterdam.nl/'
          }
        ],
        subCategories: [],
        type: 'pand/address'
      }
    ],
    type: 'bag/pand'
  },
  {
    amountOfResults: 1,
    categoryLabel: 'Kadastraal object',
    results: [
      {
        categoryLabel: 'Kadastraal object',
        label: 'ASD04 F 06417 G 0000',
        type: 'kadaster/kadastraal_object',
        uri: 'https://acc.api.data.amsterdam.nl/'
      }
    ],
    subCategories: [],
    type: 'kadaster/kadastraal_object'
  }
];
