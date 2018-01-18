import { categoryTypeOrder } from '../../../map/services/map-search';

export const sortByCategoryTypeOrder = (items) => items
  .map((item) => item).sort((a, b) => {
    const indexA = categoryTypeOrder.indexOf(a.type);
    const indexB = categoryTypeOrder.indexOf(b.type);
    return indexA < indexB ? -1 :
      (indexA > indexB ? 1 : 0);
  });

export const filterNonPandMonuments = (results) => (results
  .some((feature) => feature.type === 'bag/pand')
    ? results.filter((feature) => feature.type !== 'monumenten/monument')
    : results);

const filterResultsByCategory = (items, label) => items
  .filter((item) => item.categoryLabel === label);

const getSubCategories = (items, type) => items
  .filter((subCategory) => subCategory.parent === type);

export const createMapSearchResultsModel = (allResults, resultsLimit, isSubCategory) =>
  sortByCategoryTypeOrder(filterNonPandMonuments(allResults))
  .reduce((items, currentValue) => {
    const { categoryLabel, categoryLabelPlural, type } = currentValue;
    if (items.some((item) => item.categoryLabel === categoryLabel) &&
      (currentValue.parent || !isSubCategory)) {
      return items;
    }
    const subCategories = getSubCategories(allResults, type);
    const results = sortByCategoryTypeOrder(
      filterResultsByCategory(allResults, categoryLabel));
    return [
      ...items,
      {
        categoryLabel,
        categoryLabelPlural,
        type,
        results: results.slice(0, resultsLimit),
        subCategories: subCategories && subCategories.length ?
          createMapSearchResultsModel(subCategories, resultsLimit, true) : [],
        amountOfResults: results.length,
        showMore: results.length > resultsLimit
      }
    ];
  }, []);
