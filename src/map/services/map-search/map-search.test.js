import search from './map-search';

describe('mapSearch service', () => {
  it('should ', async () => {

    fetch.mockResponse(JSON.stringify({
      features: [
        {
          properties: {
            type: 'bommenkaart/verdachtgebied' // not in map-search
          }
        }
      ]
    }));
    const data = await search({ latitude: 1, longitude: 0 }, {
      authenticated: false,
      accessToken: '',
      scopes: [],
      name: '',
      error: false
    });
    expect(data).toEqual([{
      categoryLabel: 'Explosief',
      results: Array(7).fill({
        categoryLabel: 'Explosief',
        label: undefined,
        parent: undefined,
        statusLabel: 'verdacht gebied',
        type: 'bommenkaart/verdachtgebied',
        uri: undefined
      }),
      subCategories: [],
      type: 'bommenkaart/verdachtgebied'
    }]);
  });
});
