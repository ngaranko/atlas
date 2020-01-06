/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import Panel from '../Panel/Panel'
import SearchList from '../SearchList/SearchListContainer'
import NoResultsForSearchType from '../Messages/NoResultsForSearchType'
import { VIEW_MODE } from '../../../shared/ducks/ui/ui'

const DataSearch = ({
  userAuthenticated,
  userScopes,
  searchResults,
  numberOfResults,
  toDetail,
}) => {
  if (numberOfResults === 0) {
    return (
      <NoResultsForSearchType
        message="Tip: maak de zoekcriteria minder specifiek."
        authMessage={!userAuthenticated}
      />
    )
  }
  return (
    <div className="qa-search-results-content">
      <div className="qa-search-result">
        <div>
          {searchResults &&
            searchResults.map(
              (result, i) =>
                (result.count >= 1 || result.warning) &&
                (!result.authScope || userScopes.includes(result.authScope)) && (
                  <div
                    key={i}
                    className={`
                  c-search-results__block
                  qa-search-results-category
                  ${!!result.subResults && 'c-search-results__block--container'}
                `}
                  >
                    <div className="c-search-results__block-content">
                      <div className="o-header">
                        <h2 className="o-header__subtitle qa-search-header">
                          {result.count > 1 && <span>{`${result.plural} (${result.count})`}</span>}
                          {result.count === 1 && <span>{result.singular}</span>}
                          {result.count === 0 && <span>{result.plural}</span>}
                        </h2>
                      </div>
                      {!!result.warning && (
                        <Panel isPanelVisible={!!result.warning} canClose type="warning">
                          {result.warning}
                        </Panel>
                      )}
                      <SearchList categoryResults={result} limit={10} />
                      {result.count > 10 && (
                        <div>
                          {result.more && (
                            <button
                              className="qa-show-more c-show-more o-list__separate-item"
                              type="button"
                              onClick={() => toDetail(result.more.endpoint, VIEW_MODE.SPLIT)}
                            >
                              {result.more.label}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="s-indented-list">
                      {!!result.subResults && (
                        <DataSearch
                          searchResults={result.subResults}
                          numberOfResults={numberOfResults}
                          {...{
                            userAuthenticated,
                            toDetail,
                            userScopes,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  )
}

DataSearch.propTypes = {
  userAuthenticated: PropTypes.bool.isRequired,
  userScopes: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfResults: PropTypes.number.isRequired,
  toDetail: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DataSearch
