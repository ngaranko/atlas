import categoryTypeOrder from '../map-search/category-type-order';

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

const filterResultsByCategory = (items, label) => filterNonPandMonuments(items)
  .filter((item) => item.categoryLabel === label);

const getSubCategories = (items, type) => items
  .filter((subCategory) => subCategory.parent === type);

export const createMapSearchResultsModel = (allResults, isSubCategory) =>
  sortByCategoryTypeOrder(allResults)
  .reduce((newList, currentValue) => {
    const { categoryLabel, type, parent } = currentValue;

    if (newList.some((item) => item.categoryLabel === categoryLabel) ||
      (parent && !isSubCategory)) {
      return newList;
    }

    const subCategories = getSubCategories(allResults, type);

    let results = [];
    if (categoryLabel === 'Adres') {
      results = filterResultsByCategory(allResults, categoryLabel);
    } else {
      results = sortByCategoryTypeOrder(filterResultsByCategory(allResults, categoryLabel));
    }

    return [
      ...newList,
      {
        categoryLabel,
        type,
        results,
        amountOfResults: results.length,
        subCategories: subCategories && subCategories.length ?
          createMapSearchResultsModel(subCategories, true) : []
      }
    ];
  }, []);
