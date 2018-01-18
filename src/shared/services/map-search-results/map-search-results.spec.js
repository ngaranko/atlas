import { sortByCategoryTypeOrder, createMapSearchResultsModel } from './map-search-results';

const basicDataModel = [
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

const expectedDataModel = [
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

describe('Map search results', () => {
  describe('sortByCategoryTypeOrder', () => {
    const rightOrder = [2, 0, 1];
    rightOrder.forEach((initialPosition, newPosition) => {
      it(`the ${initialPosition}'st should be ${newPosition}'st after sorting`, () => {
        expect(sortByCategoryTypeOrder(basicDataModel)[newPosition])
          .toEqual(basicDataModel[initialPosition]);
      });
    });
  });

  describe('createMapSearchResultsModel', () => {
    it('should return a empty array', () => {
      expect(createMapSearchResultsModel([])).toEqual([]);
    });

    it('should generate the desired datamodel', () => {
      expect(createMapSearchResultsModel(basicDataModel)).toEqual(expectedDataModel);
    });

    const adjustedDataModel = [...basicDataModel];

    adjustedDataModel.push({
      uri: 'https://acc.api.data.amsterdam.nl/',
      label: 'Warmoesstraat 2',
      categoryLabel: 'Adress',
      categoryLabelPlural: 'Adressen',
      type: 'pand/address',
      parent: 'bag/pand'
    });

    it('subcategory should have corrent amount of results and not limit the results', () => {
      const limit = 10;
      const result = createMapSearchResultsModel(adjustedDataModel, limit);
      const subCategoryAdress = result[0].subCategories[0];
      expect(subCategoryAdress.results.length).toBe(2);
      expect(subCategoryAdress.amountOfResults).toBe(2);
      expect(subCategoryAdress.showMore).toBe(false);
    });

    it('subcategory should have corrent amount of results and limit the results', () => {
      const limit = 1;
      const result = createMapSearchResultsModel(adjustedDataModel, limit);
      const subCategoryAdress = result[0].subCategories[0];
      expect(subCategoryAdress.results.length).toBe(1);
      expect(subCategoryAdress.amountOfResults).toBe(2);
      expect(subCategoryAdress.showMore).toBe(true);
    });
  });
});
