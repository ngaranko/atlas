describe('The uri stripper factory', () => {
  // let uriStripper;

  // beforeEach(function () {
  //     angular.mock.module('dpShared',
  //         function ($provide) {
  //             $provide.factory('sharedConfig', () => {
  //                 return {
  //                     ROOT_KEYS: ['API_ROOT', 'CATALOGUS_ROOT'],
  //                     API_ROOT: 'https://api.data.amsterdam.nl/',
  //                     CATALOGUS_ROOT: 'https://catalogus.data.amsterdam.nl/'
  //                 };
  //             });
  //         }
  //     );

  //     angular.mock.inject(function (_uriStripper_) {
  //         uriStripper = _uriStripper_;
  //     });
  // });

  // it('strips the API root from the URI', () => {
  //     expect(uriStripper.stripDomain(
  //         'https://api.data.amsterdam.nl/foo'
  //     )).toEqual([
  //         'foo'
  //     ]);
  //     expect(uriStripper.stripDomain(
  //         'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
  //     )).toEqual([
  //         'meetbouten/meetbout/1234/'
  //     ]);
  //     expect(uriStripper.stripDomain(
  //         'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
  //     )).toEqual([
  //         'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
  //     ]);
  // });

  // it('does not strip none API roots from the URI', () => {
  //     expect(uriStripper.stripDomain(
  //         'https://foo.amsterdam.nl/foo'
  //     )).toEqual([
  //         'https://foo.amsterdam.nl/foo'
  //     ]);

  //     expect(uriStripper.stripDomain(
  //         'https://data.amsterdam.nl/foo'
  //     )).toEqual([
  //         'https://data.amsterdam.nl/foo'
  //     ]);

  //     expect(uriStripper.stripDomain(
  //         'https://foo.data.amsterdam.nl/foo'
  //     )).toEqual([
  //         'https://foo.data.amsterdam.nl/foo'
  //     ]);
  // });

  // it('restores the API root to the URI', () => {
  //     expect(uriStripper.restoreDomain([
  //         'API_ROOT',
  //         'foo'
  //     ])).toEqual(
  //         'https://api.data.amsterdam.nl/foo'
  //     );
  //     expect(uriStripper.restoreDomain([
  //         'API_ROOT',
  //         'meetbouten/meetbout/1234/'
  //     ])).toEqual(
  //         'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
  //     );
  //     expect(uriStripper.restoreDomain([
  //         'API_ROOT',
  //         'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
  //     ])).toEqual(
  //         'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
  //     );
  // });

  // it('does not restore faulty API roots to the URI', () => {
  //     expect(uriStripper.restoreDomain([
  //         'FAULTY_ROOT',
  //         'foo'
  //     ])).toEqual(
  //         'foo'
  //     );
  // });

  // it('restores the API root to the URI by default', () => {
  //     expect(uriStripper.restoreDomain([
  //         'foo'
  //     ])).toEqual(
  //         'https://api.data.amsterdam.nl/foo'
  //     );
  //     expect(uriStripper.restoreDomain([
  //         'meetbouten/meetbout/1234/'
  //     ])).toEqual(
  //         'https://api.data.amsterdam.nl/meetbouten/meetbout/1234/'
  //     );
  //     expect(uriStripper.restoreDomain([
  //         'panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
  //     ])).toEqual(
  //         'https://api.data.amsterdam.nl/panorama/thumbnail/TMX1234-000030_pano_0001_000010/?width=140&heading=26'
  //     );
  // });
});
