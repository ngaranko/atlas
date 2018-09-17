import { stripDomain, restoreDomain } from './uri-stripper';
import * as sharedConfig from '../shared-config/shared-config';

describe('The uri stripper', () => {
  beforeEach(() => {
    sharedConfig.default = {
      ROOT_KEYS: ['API_ROOT', 'CATALOGUS_ROOT'],
      API_ROOT: 'https://api.data.amsterdam.nl/',
      CATALOGUS_ROOT: 'https://catalogus.data.amsterdam.nl/'
    };
  });

  it('strips the API root from the URI', () => {
    expect(stripDomain(
            'https://api.data.amsterdam.nl/foo'
        )).toEqual([
          'foo'
        ]);
    expect(stripDomain(
            'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
        )).toEqual([
          'meetbouten/meetbout/1234/'
        ]);
    expect(stripDomain(
            'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        )).toEqual([
          'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        ]);
  });

  it('does not strip none API roots from the URI', () => {
    expect(stripDomain(
            'https://foo.amsterdam.nl/foo'
        )).toEqual([
          'https://foo.amsterdam.nl/foo'
        ]);

    expect(stripDomain(
            'https://data.amsterdam.nl/foo'
        )).toEqual([
          'https://data.amsterdam.nl/foo'
        ]);

    expect(stripDomain(
            'https://foo.data.amsterdam.nl/foo'
        )).toEqual([
          'https://foo.data.amsterdam.nl/foo'
        ]);
  });

  it('restores the API root to the URI', () => {
    expect(restoreDomain([
      'API_ROOT',
      'foo'
    ])).toEqual(
            'https://api.data.amsterdam.nl/foo'
        );
    expect(restoreDomain([
      'API_ROOT',
      'meetbouten/meetbout/1234/'
    ])).toEqual(
            'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
        );
    expect(restoreDomain([
      'API_ROOT',
      'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
    ])).toEqual(
            'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        );
  });

  it('does not restore faulty API roots to the URI', () => {
    expect(restoreDomain([
      'FAULTY_ROOT',
      'foo'
    ])).toEqual(
            'foo'
        );
  });

  it('restores the API root to the URI by default', () => {
    expect(restoreDomain([
      'foo'
    ])).toEqual(
            'https://api.data.amsterdam.nl/foo'
        );
    expect(restoreDomain([
      'meetbouten/meetbout/1234/'
    ])).toEqual(
            'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
        );
    expect(restoreDomain([
      'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
    ])).toEqual(
            'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
        );
  });
});
