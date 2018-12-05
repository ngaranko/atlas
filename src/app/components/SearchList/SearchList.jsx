import React from 'react';
import { AngularWrapper } from 'react-angular';
import PropTypes from 'prop-types';
import Panel from '../Panel/Panel';

const SearchList = ({ user, searchResults, setSearchCategory, fetchDetailPage, category }) => (
  <div>
    {searchResults && searchResults.map((result) => (
      (result.count >= 1 || result.warning) &&
      (!result.authScope || user.scopes.includes(result.authScope)) && (
        <div
          className={`c-search-results__block qa-search-results-category ${!!(result.subResults) && 'c-search-results__block--container'}`}
        >
          <div className="c-search-results__block-content">
            <h2 className="o-header__subtitle qa-search-header">
              {(result.count > 1) && (
                <span>{result.label_plural} (
                  <span className="qa-search-header-count">{result.count}</span>
                  )
                </span>
              )}

              {(result.count === 1) && (
                <span>{result.label_singular}</span>
              )}
              {(result.count === 0) && (
                <span>{result.label_plural}</span>
              )}
            </h2>

            {(!!result.warning) &&
            <Panel
              isPanelVisible={result.warning}
              canClose
              type="warning"
            >
              {result.warning}
              {/* TODO: */}
              Zie LINK
            </Panel>
            }
            <div className="qa-search-results-list">
              <AngularWrapper
                moduleName={'dpSearchResultsListWrapper'}
                component="dpSearchResultsList"
                dependencies={['atlas']}
                bindings={{
                  limitResults: true,
                  category: result
                }}
              />
            </div>

            {(result.count > 10) &&
            <div>
              {(result.more) ?
                <button
                  className="qa-show-more c-show-more o-list__separate-item"
                  type="button"
                  onClick={() => fetchDetailPage(result.more.endpoint)}
                >
                  {result.more.label}
                </button>
                :
                <button
                  type="button"
                  className="qa-show-more c-show-more o-list__separate-item"
                  onClick={() => setSearchCategory(result.slug)}
                >
                  Toon alle {result.count}
                </button>
              }
            </div>
            }
          </div>

          <div className="s-indented-list">
            {!!result.subResults &&
            <SearchList
              searchResults={result.subResults}
              {...{
                fetchDetailPage,
                setSearchCategory,
                user
              }}
            />
            }
          </div>
        </div>
      )
    ))}

  </div>

);

SearchList.defaultProps = {
  numberOfResults: 0
};

SearchList.propTypes = {
  user: PropTypes.object.isRequired,
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  setSearchCategory: PropTypes.func.isRequired,
  fetchDetailPage: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchList;
