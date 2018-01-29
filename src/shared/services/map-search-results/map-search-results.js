import { categoryTypeOrder } from '../../../map/services/map-search';

export const sortByCategoryTypeOrder = (items) => [...items]
  .sort((a, b) => {
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
  .reduce((newList, currentValue) => {
    const {
      categoryLabel, categoryLabelPlural, type, parent, status, count, isNevenadres
    } = currentValue;

    if (newList.some((item) => item.categoryLabel === categoryLabel) ||
      (parent && !isSubCategory)) {
      return newList;
    }

    const subCategories = getSubCategories(allResults, type);
    const results = filterResultsByCategory(allResults, categoryLabel);

    return [
      ...newList,
      {
        categoryLabel,
        categoryLabelPlural,
        type,
        status,
        isNevenadres,
        results: results.slice(0, resultsLimit),
        subCategories: subCategories && subCategories.length ?
          createMapSearchResultsModel(subCategories, resultsLimit, true) : [],
        amountOfResults: count || results.length,
        showMore: (count || results.length) > resultsLimit
      }
    ];
  }, []);
