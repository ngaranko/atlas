/* eslint-disable no-param-reassign,no-underscore-dangle */

import { FETCH_DATASETS_REQUEST } from '../../../../src/shared/ducks/datasets/data/data';
import { FETCH_SEARCH_RESULTS_BY_QUERY } from '../../../../src/shared/ducks/data-search/data-search';

export const datasetsKey = 'datasets';

export const tabHeaderConfig = {
  'data-datasets': {
    data: {
      title: 'Data',
      action: FETCH_SEARCH_RESULTS_BY_QUERY,
      getPayload: (query) => query,
      tip: 'maak de zoekcriteria minder specifiek (bijv. een straat i.p.v. specifiek adres)'
    },
    [datasetsKey]: {
      title: 'Datasets',
      action: FETCH_DATASETS_REQUEST,
      getPayload: (query) => ({ query, page: 1 }),
      tip: `maak de zoekcriteria minder specifiek. Of probeer in plaats van zoeken eens de
                  optie 'Alle datasets tonen' en filter vervolgens op thema.`
    }
  }
};

const countProvider = {};
const tabHeader = {};

export class TabPage {
  constructor(id, { title, action, getPayload, tip }) {
    this._id = id;
    this._title = title;
    this._action = action;
    this._getPayload = getPayload;
    this._tip = tip;
    this._count = null;
    this._isActive = false;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get action() {
    return this._action;
  }

  get payload() {
    return this._payload;
  }

  get tip() {
    return this._tip;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(isActive) {
    this._isActive = Boolean(isActive);
  }

  set query(query) {
    this._query = query;
    this._payload = this._getPayload(query);
  }

  get query() {
    return this._query;
  }

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
  }
}

export default class TabHeader {
  constructor(id) {
    if (tabHeader[id]) {
      this._tabs = tabHeader[id]._tabs;
    } else {
      this._tabs = Object.keys(tabHeaderConfig[id])
        .map((key) => new TabPage(key, tabHeaderConfig[id][key]));
      tabHeader[id] = this;
    }
    this._tabPages = this._tabs.reduce((all, tab) => {
      all[tab.id] = tab;
      return all;
    }, {});

    this._userScopes = [];
  }

  get tabs() {
    return this._tabs;
  }

  getTab(page) {
    return this._tabPages[page];
  }

  set activeTab(theActiveTab) {
    // eslint-disable-next-line no-return-assign
    this._tabs.forEach((tab) => tab.isActive = tab.id === theActiveTab.id);
  }

  get userScopes() {
    return this._userScopes;
  }

  set userScopes(userScopes) {
    this._userScopes = userScopes;
  }

  set query(query) {
    this._tabs.forEach((tab) => {
      if (tab.query !== query) {
        tab.query = query;
        if (!tab.isActive && countProvider[tab.action]) {
          // active tabs update their count directly
          // non-active tabs rely on a provider that is able to return the count
          countProvider[tab.action](tab.payload).then((count) => {
            tab.count = count;
          });
        }
      }
    });
  }

  static provideCounter(action, getCount) {
    countProvider[action] = getCount;
  }
}

/* eslint-enable no-param-reassign,no-underscore-dangle */
