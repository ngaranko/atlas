import { sortByCategoryTypeOrder, createMapSearchResultsModel } from './map-search-results';
import { basicDataModel, expectedDataModel } from './map-search-results.fixture';

describe('Map search results', () => {
  describe('sortByCategoryTypeOrder', () => {
    it('should order the items correctly', () => {
      const items = sortByCategoryTypeOrder(basicDataModel);
      const calculatedOrder = items.reduce((accumulator, newValue) => { // eslint-disable-line
        return [
          ...accumulator,
          basicDataModel.findIndex((item) => item.categoryLabel === newValue.categoryLabel)
        ];
      }, []);
      expect(calculatedOrder).toEqual([2, 0, 1]);
    });
  });

  describe('createMapSearchResultsModel', () => {
    it('should return a empty array', () => {
      expect(createMapSearchResultsModel([])).toEqual([]);
    });

    it('should generate the desired datamodel', () => {
      expect(createMapSearchResultsModel(basicDataModel)).toEqual(expectedDataModel);
    });

    describe('generated subcategory', () => {
      const adjustedDataModel = [...basicDataModel];

      adjustedDataModel.push({
        uri: 'https://acc.api.data.amsterdam.nl/',
        label: 'Warmoesstraat 2',
        categoryLabel: 'Adress',
        categoryLabelPlural: 'Adressen',
        type: 'pand/address',
        status: {},
        count: 2,
        parent: 'bag/pand'
      });

      it('should have current amount of results and not limit the results', () => {
        const limit = 10;
        const result = createMapSearchResultsModel(adjustedDataModel, limit);
        const subCategoryAdress = result[0].subCategories[0];
        expect(subCategoryAdress.results.length).toBe(2);
        expect(subCategoryAdress.amountOfResults).toBe(2);
        expect(subCategoryAdress.showMore).toBe(false);
      });

      it('should have current amount of results and limit the results', () => {
        const limit = 1;
        const result = createMapSearchResultsModel(adjustedDataModel, limit);
        const subCategoryAdress = result[0].subCategories[0];
        expect(subCategoryAdress.results.length).toBe(1);
        expect(subCategoryAdress.amountOfResults).toBe(2);
        expect(subCategoryAdress.showMore).toBe(true);
      });
    });
  });
});
