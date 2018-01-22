export const basicDataModel = [
  {
    uri: 'https://acc.api.data.amsterdam.nl/',
    label: 'Warmoesstraat 178',
    categoryLabel: 'Adress',
    categoryLabelPlural: 'Adressen',
    type: 'pand/address',
    parent: 'bag/pand'
  },
  {
    uri: 'https://acc.api.data.amsterdam.nl/',
    label: 'ASD04 F 06417 G 0000',
    categoryLabel: 'Kadastraal object',
    categoryLabelPlural: 'Kadastrale objecten',
    type: 'kadaster/kadastraal_object'
  },
  {
    uri: 'https://acc.api.data.amsterdam.nl/',
    label: '0363100012168052',
    categoryLabel: 'Pand',
    categoryLabelPlural: 'Panden',
    type: 'bag/pand'
  }
];

export const expectedDataModel = [
  {
    amountOfResults: 1,
    categoryLabel: 'Pand',
    categoryLabelPlural: 'Panden',
    results: [
      {
        categoryLabel: 'Pand',
        categoryLabelPlural: 'Panden',
        label: '0363100012168052',
        type: 'bag/pand',
        uri: 'https://acc.api.data.amsterdam.nl/'
      }
    ],
    showMore: false,
    subCategories: [
      {
        amountOfResults: 1,
        categoryLabel: 'Adress',
        categoryLabelPlural: 'Adressen',
        results: [
          {
            categoryLabel: 'Adress',
            categoryLabelPlural: 'Adressen',
            label: 'Warmoesstraat 178',
            parent: 'bag/pand',
            type: 'pand/address',
            uri: 'https://acc.api.data.amsterdam.nl/'
          }
        ],
        showMore: false,
        subCategories: [],
        type: 'pand/address'
      }
    ],
    type: 'bag/pand'
  },
  {
    amountOfResults: 1,
    categoryLabel: 'Kadastraal object',
    categoryLabelPlural: 'Kadastrale objecten',
    results: [
      {
        categoryLabel: 'Kadastraal object',
        categoryLabelPlural: 'Kadastrale objecten',
        label: 'ASD04 F 06417 G 0000',
        type: 'kadaster/kadastraal_object',
        uri: 'https://acc.api.data.amsterdam.nl/'
      }
    ],
    showMore: false,
    subCategories: [],
    type: 'kadaster/kadastraal_object'
  }
];
