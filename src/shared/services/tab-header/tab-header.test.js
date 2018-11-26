// WIP!
// import TabHeader, { tabHeaderConfig } from './tab-header';
import * as TabHeaderRoot from './tab-header';

const TabHeader = TabHeaderRoot.default;

describe('The tabHeaderConfig', () => {
  const tabHeaderConfig = TabHeaderRoot.getHeaderConfig();
  it('contains a configuration for the data-datasets tab header', () => {
    expect(Object.keys(tabHeaderConfig['data-datasets'])).toEqual(['data', 'datasets']);
  });

  it('the data-datasets tab header configuration provides for a getPayload method for each tab', () => {
    expect(tabHeaderConfig['data-datasets'].data.getPayload('payload')).toBe('payload');
    expect(tabHeaderConfig['data-datasets'].datasets.getPayload('payload')).toEqual({
      query: 'payload',
      page: 1
    });
  });

  it('allows for searching on an empty string', () => {
    expect(tabHeaderConfig['data-datasets'].data.getPayload('')).toBe('');
  });
});

describe('The TabHeader service', () => {
  const tabHeaderConfigTest = {
    tabs: {
      tab1: {
        title: 'Tab1',
        action: 'ACTION1',
        getPayload: jest.fn(),
        tip: 'tip1'
      },
      tab2: {
        title: 'Tab2',
        action: 'ACTION2',
        getPayload: jest.fn(),
        tip: 'tip2'
      }
    },
    othertabs: {
      tab1: {
        title: 'OtherTab1',
        action: 'OTHERACTION1',
        getPayload: jest.fn()
      },
      tab2: {
        title: 'OtherTab2',
        action: 'OTHERACTION2',
        getPayload: jest.fn()
      }
    }
  };

  beforeEach(() => {
    jest.spyOn(TabHeaderRoot, 'getHeaderConfig').mockReturnValue(tabHeaderConfigTest);
    // TabHeaderRoot.getHeaderConfig = jest.fn(() => tabHeaderConfigTest);
    Object.keys(tabHeaderConfigTest.tabs)
      .forEach((key) => jest.spyOn(tabHeaderConfigTest.tabs[key], 'getPayload'));
  });

  it.only('has a constructor that accepts an tabHeaderConfig key', () => {
    const tabHeader = new TabHeader('tabs');
    expect(tabHeader.tabs.length).toBe(2);
    tabHeader.tabs.forEach((tab) => {
      const configTab = tabHeaderConfigTest.tabs[tab.id];
      expect(tab.title).toBe(configTab.title);
      expect(tab.action).toBe(configTab.action);
      expect(tab.count).toBe(null);
      expect(tab.tip).toBe(configTab.tip);
      expect(tabHeader.getTab(tab.id)).toEqual(tab);
    });
  });

  it('reuses any already created tabheader with the same key', () => {
    let tabHeader = new TabHeader('tabs');
    tabHeader.getTab('tab1').isActive = true;
    tabHeader.getTab('tab1').count = 1;

    tabHeader = new TabHeader('othertabs');
    expect(tabHeader.getTab('tab1').isActive).toBe(false);
    expect(tabHeader.getTab('tab1').count).toBe(null);

    tabHeader = new TabHeader('tabs');
    expect(tabHeader.getTab('tab1').isActive).toBe(true);
    expect(tabHeader.getTab('tab1').count).toBe(1);
  });

  it('can set the active tab to any given tab of the tabheader', () => {
    const tabHeader = new TabHeader('tabs');
    tabHeader.tabs.forEach((tab) => {
      expect(tab.isActive).toBe(false);
    });
    tabHeader.activeTab = tabHeader.getTab('tab1');
    tabHeader.tabs.forEach((tab) => {
      expect(tab.isActive).toBe(tab === tabHeader.getTab('tab1'));
    });
  });

//   it('can set the query that unites the tab header pages', () => {
//     const tabHeader = new TabHeader('tabs'),
//       query = 'a query';

//     tabHeader.query = query;

//     Object.keys(tabHeaderConfigTest.tabs)
//       .forEach((key) => expect(tabHeaderConfigTest.tabs[key].getPayload)
        // .toHaveBeenCalledWith(query));
//   });

//   it('does not update the payload if called with the same query', () => {
//     const tabHeader = new TabHeader('tabs'),
//       query = 'a query';

//     tabHeader.query = query;

//     Object.keys(tabHeaderConfigTest.tabs)
//       .forEach((key) => expect(tabHeaderConfigTest.tabs[key].getPayload.calls.reset()));

//     tabHeader.query = query;

//     Object.keys(tabHeaderConfigTest.tabs)
//       .forEach((key) => expect(tabHeaderConfigTest.tabs[key].getPayload).not.toHaveBeenCalled());
//   });

//   it('accepts a count provider that can return counts for non-active pages', () => {
//     const tabHeader = new TabHeader('tabs'),
//       count = 100,
//       getCount = () => $q.resolve(count),
//       query = 'a query';

//     TabHeader.provideCounter(tabHeaderConfigTest.tabs.tab1.action, getCount);
//     tabHeader.query = query;

//     $rootScope.$apply();

//     expect(tabHeader.getTab('tab1').count).toBe(count);
//     expect(tabHeader.getTab('tab2').count).toBe(null);
//   });

//   it('can set the userScopes that define the access to users', () => {
//     const tabHeader = new TabHeader('tabs'),
//       userScopes = ['CAT/W'];

//     tabHeader.userScopes = userScopes;

//     expect(tabHeader.userScopes).toEqual(userScopes);
//   });
});
